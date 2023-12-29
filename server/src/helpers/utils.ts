import { createHash } from "node:crypto";

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