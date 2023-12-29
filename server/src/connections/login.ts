import { ASocket } from "plugboard.io";
import { DataOnEntry, UserForLogin } from "../../types";
import users from "../schema/users.js";
import { clgIdFromMail, membersInRoom, sha } from "../helpers/utils.js";
import clgs from "../schema/clgs.js";
import getTakes from "../helpers/getTakes.js";

export default class extends ASocket<[userLogin: UserForLogin]> {
    async run() {
        if (!this.io || !this.socket || !this.args) return;

        const [{ mail, password }] = this.args;

        const user = await users.findOne({ 
            mail, 
            password: sha(`${password}`),
        });

        if (!user || !user._id) {
            this.socket.emit("loginErr", "No such user exists");
            return;
        }

        if (user.socketId) return;

        user.socketId = this.socket.id;
        user.session = {
            id: sha(mail + Date.now()),
            lastUpdate: Date.now(),
        };

        const clgId = clgIdFromMail(mail);
        const college = await clgs.findOne({ clgId });
        if (!college) return;

        const sizeofRoom = await membersInRoom(clgId, this.io);

        const data: DataOnEntry = {
            user: {
                name: user.username as string,
                posts: user.totalTakes as number,
                likes: user.totalLikes as number,
            },
            clg: {
                name: college.name as string,
                id: clgId,
                totalMembers: college.members as number,
                onlineMembers: sizeofRoom + 1,
                pfp: college.img as string,
            },
            sessionId: user.session.id as string,
            takes: await getTakes(clgId),
        };

        this.socket.join(clgId);
        this.socket.emit("loginDone", data);
        user.save();
    }
}