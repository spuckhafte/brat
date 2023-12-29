import mongoose from "mongoose";

const takesSchema = new mongoose.Schema({
    author: String,
    clgId: {
        type: String,
        index: true,
    },
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
        default: () => Date.now().toString(),
        index: true,
    },
});

export default mongoose.model("takes", takesSchema);