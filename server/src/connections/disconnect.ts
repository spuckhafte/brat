import { ASocket } from "plugboard.io";
import users from "../schema/users.js";
import { clgIdFromMail } from "../helpers/utils.js";

export default class extends ASocket<[]> {
    async run() {
        if (!this.io || !this.socket) return;

        const user = await users.findOne({ socketId: this.socket.id });
        if (!user || !user._id) return;

        const clgId = clgIdFromMail(user.mail as string);
        this.socket.leave(clgId);

        user.socketId = "";
        user.save();
    }
}