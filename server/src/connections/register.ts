import { ASocket } from "plugboard.io";
import { UserForSignup } from "../../types";
import clgs from "../schema/clgs.js";
import users from "../schema/users.js";
import { generateOTP, sha } from "../helpers/utils.js";
import { sendMail } from "../helpers/mailManager.js";

export default class extends ASocket<[user: UserForSignup]> {
    async run() {
        if (!this.args || !this.io || !this.socket) return;

        let { username, mail, password} = this.args[0];

        const clgDiscriminator = mail.split('@')[mail.split('@').length - 1];
        const college = await clgs.findOne({ id: clgDiscriminator });

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
            if (otpFromClient.trim() != otp) {
                this.socket?.emit("registerErr", "Wrong OTP");
                return;
            }

            password = sha(password)
            const sessionId = sha(Date.now().toString()); 
 
            await users.create({
                username, mail, password,
                session: {
                    id: sessionId,
                    lastUpdate: Date.now(),
                }
            });

            this.socket?.emit("registerDone", sessionId);
            this.socket?.join(clgDiscriminator);

            college.members = (college.members ?? 0) + 1;
            college.save();
        })
    }
}