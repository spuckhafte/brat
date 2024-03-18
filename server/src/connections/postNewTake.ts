import { ASocket } from "plugboard.io";
import { ATake, FrontendUser, NewTakeToPost } from "../../types";
import users from "../schema/users.js";
import takes from "../schema/takes.js";

export default class extends ASocket<[NewTakeToPost, string]> {
    async run() {
        if (!this.io || !this.args || !this.socket) return;

        const [newTake, sessionId] = this.args;

        const user = await users.findOne({ "session.id": sessionId });

        if (!user || !user._id || user.socketId != this.socket.id) return;
        
        const newTakeFromDb = await takes.create(newTake);
        user.totalTakes += 1;
        await user.save();

        const updatedAuthor: Partial<FrontendUser> = {
            name: user.username as string,
            posts: user.totalTakes,
        }

        this.io.to(newTake.clgId).emit(
            "postNewTakeDone", { 
                ...newTake, 
                _id: newTakeFromDb._id.toString() 
            } as ATake,
            updatedAuthor,
        );
    }
}
