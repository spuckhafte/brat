import { ASocket } from "plugboard.io";
import users from "../schema/users.js";
import { DataOnEntry } from "../../types";
import clgs from "../schema/clgs.js";
import { clgIdFromMail, membersInRoom } from "../helpers/utils.js";
import getTakes from "../helpers/getTakes.js";

const SESSION_VALID_FOR = 2 * 24 * 60 * 60 * 1000; // 2 days

export default class extends ASocket<[sessionId: string]> {
    async run() {
        if (!this.io || !this.socket || !this.args) return;

        const [sessionId] = this.args;

        const user = await users.findOne({ "session.id": sessionId });

        if (
            !user || !user._id ||
            Date.now() > (user.session?.lastUpdate ?? 0) + SESSION_VALID_FOR
        ) {
            this.socket.emit("autoLoginErr");
            return;
        }

        if (user.socketId) return;

        user.socketId = this.socket.id;

        const clgId = clgIdFromMail(user.mail as string);
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
            sessionId,
            takes: await getTakes(clgId),
        };

        this.socket.join(clgId);
        this.socket.emit("autoLoginDone", data);
        user.save();
    }
}