import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    username: String,
    password: String,
    mail: String,
    socketId: String,

    session: {
        id: String,
        lastUpdate: Number
    },

    // default values
    totalLikes: {
        type: Number,
        default: 0,
    },
    totalTakes: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: String,
        default: () => Date.now().toString()
    },
    lastActive: {
        type: String,
        default: () => Date.now().toString()
    },
});

export default mongoose.model("users", usersSchema);