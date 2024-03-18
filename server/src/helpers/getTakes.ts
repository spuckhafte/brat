import { ATake } from "../../types";
import takes from "../schema/takes.js"

const TAKES_AT_A_TIME=20;

export default async (clgId: string, lastDate?: number, takesAtATime=TAKES_AT_A_TIME) => {
    return await takes.find({
        clgId, 
        createdAt: { $lt: lastDate ?? Date.now() },
    }).sort({ createdAt: -1 }).limit(takesAtATime) as ATake[];
}
