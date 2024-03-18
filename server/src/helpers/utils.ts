import { createHash } from "node:crypto";
import { Server, Socket } from "socket.io";

export const SESSION_VALID_FOR = 2 * 24 * 60 * 60 * 1000; // 2 days

export function sha(string: string) {
    return createHash('sha256').update(string).digest('hex');
}

export function generateOTP() {
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let otp = '';
    for (let i = 0; i < 5; i++)
        otp += numbers[Math.floor(Math.random() * numbers.length)].toString();
    return otp;
}

export function clgIdFromMail(mail: string) {
    return mail.split('@')[mail.split('@').length - 1];
}

export async function membersInRoom(room: string, io: Server) {
    return (await io.in(room).fetchSockets()).length
}

export function sessionInvalid(lastSet: number) {
    return Date.now() > lastSet + SESSION_VALID_FOR;
}

export function forceLogout(socket: Socket) {
    socket.emit("force-logout");
}
