import dotenv from "dotenv";
import mongoose from "mongoose";
import { Plugboard } from "plugboard.io";
import { InitMailer } from "./helpers/mailManager.js";
import { Socket } from "socket.io";

dotenv.config();

const plugboard = new Plugboard("./dist/connections", {
    cors: { origin: "*" }
});

plugboard.start(
    +(process.env.PORT ?? 3000), 
    () => console.log(`\n👂 [listening to port: ${process.env.PORT ?? 3000}]`)
);

plugboard.onConnection = ({ id }) =>{
    console.log(id + " connected")
};

InitMailer();
console.log("📨 [mailer is ready]");

mongoose.connect(process.env.DB as string)
    .then(() => {
        console.log("📦 [connected to db]");
        console.log('\n🚀 [SERVER INITIALIZED]\n');
    })
    .catch(e => console.log("[error connecting to db]\n" + e));