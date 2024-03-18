import { ASocket } from "plugboard.io";
import users from "../schema/users.js";
import { forceLogout, sessionInvalid } from "../helpers/utils.js";
import takes from "../schema/takes.js";
import { ATake, DataOnEntry, FrontendUser } from "../../types.js";

type Args = {
    takeId: string,
    likes: number,
    dislikes: number,
}

export default class extends ASocket<[data: Args, sessionId: string]> {
    async run() {
        if (!this.io || !this.args || !this.socket) return;

        const [data, sessionId] = this.args;

        const user = await users.findOne({ "session.id": sessionId });
        
        if (!user || !user._id) return;

        if (sessionInvalid(user.session?.lastUpdate as number)) {
            forceLogout(this.socket);
            return;
        }

        const targetTake = await takes.findById(data.takeId);
        if (!targetTake || !targetTake._id) return;

        const takeAuthor = 
            (targetTake.author == user.username) ? user 
                : await users.findOne({ username: targetTake.author });

        if (!takeAuthor || !takeAuthor._id.toString()) return;

        if (data.likes > (targetTake.likes as number)) {
            if (takeAuthor.username != user.username)
                takeAuthor.totalLikes += 1;
            targetTake.likedBy.push(user.username as string);
        }
        if (data.likes < (targetTake.likes as number)) {
            if (takeAuthor.username != user.username)
                takeAuthor.totalLikes -= 1;
            targetTake.likedBy = targetTake.likedBy.filter(name => name != user.username);
        }
        if (data.dislikes > (targetTake.dislikes as number))
            targetTake.dislikedBy.push(user.username as string);
        if (data.dislikes < (targetTake.dislikes as number))
            targetTake.dislikedBy = targetTake.dislikedBy.filter(name => name != user.username);

        targetTake.likes = data.likes;
        targetTake.dislikes = data.dislikes;
 
        const updatedTake: Partial<ATake> = {
            _id: data.takeId,
            author: targetTake.author as string,
            likes: data.likes,
            dislikes: data.dislikes,
            likedBy: targetTake.likedBy,
            dislikedBy: targetTake.dislikedBy,
        }

        const updatedTakeAuthor: FrontendUser = {
            name: takeAuthor.username as string,
            likes: takeAuthor.totalLikes,
            posts: takeAuthor.totalTakes,
        }
        
        this.io.to(targetTake.clgId as string).emit("updateATakeDone", updatedTake, updatedTakeAuthor);
        targetTake.save();
        takeAuthor.save();
    }
}
