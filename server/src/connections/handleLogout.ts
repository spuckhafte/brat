import { ASocket } from "plugboard.io";
import users from "../schema/users.js";

export default class extends ASocket<[clgId: string]> {
    async run() {
        if (!this.io || !this.socket || !this.args) return;

        const [clgId] = this.args;
        const user = await users.findOne({ socketId: this.socket.id });

        if (!user || !user._id) return;

        this.socket.leave(clgId)
        user.socketId = "";
        await user.save();
    }
}