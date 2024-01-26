import { ASocket } from "plugboard.io";
import users from "../schema/users.js";
import { DataOnEntry } from "../../types";
import clgs from "../schema/clgs.js";
import { clgIdFromMail, membersInRoom, sessionInvalid, sha } from "../helpers/utils.js";
import getTakes from "../helpers/getTakes.js";

export default class extends ASocket<[sessionId: string, forced: boolean | undefined]> {
    async run() {
        if (!this.io || !this.socket || !this.args) return;
        
        // forced true: sessionId acts as clg-mail
        
        let [sessionId, forced] = this.args;

        const user = await users.findOne({ [!forced ? "session.id" : "mail"]: sessionId });

        if (
            !user || !user._id || 
            (sessionInvalid(user.session?.lastUpdate ?? 0) && !forced)
        ) {
            this.socket.emit("autoLoginErr");
            return;
        }

        if (forced) {
            sessionId = sha(user.mail + Date.now().toString());
            
            user.session = {
                id: sessionId,
                lastUpdate: Date.now()
            };
        }

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
                onlineMembers: sizeofRoom + (forced ? 0 : 1),
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
