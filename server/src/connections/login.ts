import { ASocket } from "plugboard.io";
import { DataOnEntry, UserForLogin } from "../../types";
import users from "../schema/users.js";
import { clgIdFromMail, membersInRoom, sessionInvalid, sha } from "../helpers/utils.js";
import clgs from "../schema/clgs.js";
import getTakes from "../helpers/getTakes.js";
import { Server, Socket } from "socket.io";

export default class extends ASocket<[userLogin: UserForLogin]> {
    async run() {
        if (!this.io || !this.socket || !this.args) return;

        const [{ mail, password }] = this.args;

        const user = await users.findOne({ 
            mail, 
            password: sha(`${password}`),
        });

        if (!user || !user._id) {
            this.socket.emit("loginErr", "No such user exists");
            return;
        }

        const sessionId = sha(mail + Date.now());

        if (
            user.socketId && 
            !sessionInvalid(user.session?.lastUpdate ?? 0)
        ) {
            const Io = this.io as Server;
            const Socket = this.socket as Socket;
        
            this.socket.emit("loginAwait", user.mail);
            this.socket.on("loginContinue", endOtherActiveSession);

            function endOtherActiveSession(userMail: string, status: boolean) {
                if (!user?.socketId) return;
                if (userMail != user.mail) return;

                if (status) {
                    const targetSocket = Io.sockets.sockets.get(user.socketId);
                    if (targetSocket) {
                        targetSocket.emit("force-logout");
                        targetSocket.leave(clgIdFromMail(mail));
                    }
                }

                Socket.off("loginContinue", endOtherActiveSession);
            }
            return;
        }

        user.socketId = this.socket.id;
        user.session = {
            id: sessionId,
            lastUpdate: Date.now(),
        };

        const clgId = clgIdFromMail(mail);
        const college = await clgs.findOne({ clgId });
        if (!college) return;

        const sizeofRoom = await membersInRoom(clgId, this.io);

        const data: DataOnEntry = {
            user: {
                name: user.username as string,
                posts: user.totalTakes as number,
                likes: user.totalLikes as number,
            },
            clg: {
                name: college.name as string,
                id: clgId,
                totalMembers: college.members as number,
                onlineMembers: sizeofRoom + 1,
                pfp: college.img as string,
            },
            sessionId: user.session.id as string,
            takes: await getTakes(clgId),
        };

        this.socket.join(clgId);
        this.socket.emit("loginDone", data);
        user.save();
    }
}
