import mongoose from "mongoose";

const clgsSchema = new mongoose.Schema({
    id: String,
    name: String,
    img: String,
    members: Number,
});

export default mongoose.model("clgs", clgsSchema);