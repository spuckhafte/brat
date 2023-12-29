import mongoose from "mongoose";

const takesSchema = new mongoose.Schema({
    author: String,
    clgId: String,
    content: {
        title: String,
        body: String,
    },
    likes: Number,
    dislikes: Number,
    likedBy: [String],
    dislikedBy: [String],

    // default values
    createdAt: {
        type: String,
        default: () => Date.now().toString()
    },
});

export default mongoose.model("takes", takesSchema);