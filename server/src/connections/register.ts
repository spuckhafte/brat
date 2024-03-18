import { ASocket } from "plugboard.io";
import { ATake, DataOnEntry, UserForSignup } from "../../types";
import clgs from "../schema/clgs.js";
import users from "../schema/users.js";
import { clgIdFromMail, generateOTP, membersInRoom, sha } from "../helpers/utils.js";
import { sendMail } from "../helpers/mailManager.js";
import getTakes from "../helpers/getTakes.js";

export default class extends ASocket<[user: UserForSignup]> {
    async run() {
        if (!this.args || !this.io || !this.socket) return;

        let { username, mail, password} = this.args[0];

        const clgDiscriminator = clgIdFromMail(mail);
        const college = await clgs.findOne({ clgId: clgDiscriminator });

        if (!college || !college?._id) {
            this.socket.emit("registerErr", "Mail provided is not a valid college mail");
            return;
        }

        if (await users.exists({ mail })) {
            this.socket.emit("registerErr", "User with this mail has already been registered");
            return;
        }

        if (await users.exists({ username })) {
            this.socket.emit("registerErr", "Username already exists");
            return;
        }

        const otp = generateOTP();
        try {
            await sendMail(mail, otp.toString());
            this.socket.emit('registerOtp');
        } catch (e) {
            this.socket.emit('registerErr', 'Invalid mail');
            return;
        }
        
        this.socket.on("verifyOtp", async (otpFromClient: string) => {
            if (!this.args || !this.io || !this.socket) return;

            if (otpFromClient.trim() != otp) {
                this.socket?.emit("registerErr", "Wrong OTP");
                return;
            }

            password = sha(password)
            const sessionId = sha(username + Date.now().toString()); 
 
            await users.create({
                username, mail, password,
                socketId: this.socket.id,
                session: {
                    id: sessionId,
                    lastUpdate: Date.now(),
                },
            });
            
            college.members = (college.members ?? 0) + 1;
            const sizeofRoom = await membersInRoom(clgDiscriminator, this.io);
            
            const omitBack: DataOnEntry = {
                user: {
                    name: username,
                    posts: 0,
                    likes: 0,
                },
                clg: {
                    name: college.name as string,
                    id: clgDiscriminator,
                    totalMembers: college.members as number,
                    pfp: college.img as string,
                    onlineMembers: sizeofRoom + 1,
                },
                takes: await getTakes(clgDiscriminator),
                sessionId,
            }

            this.socket.emit("registerDone", omitBack);
            this.socket.join(clgDiscriminator);

            college.save();
        });
    }
}
