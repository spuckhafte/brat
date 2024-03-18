import { Resend } from "resend";

let transporter: Resend | null;

export function InitMailer() {
    const apiKey = process.env.MAIL_INFO as string;
    transporter = new Resend(apiKey);
    return transporter;
}

export async function sendMail(mail:string, otp:string) {
    transporter = transporter ?? InitMailer();

    return await transporter.emails.send({
        from: '"Brat Mails" <onboarding@resend.dev>',
        to: mail,
        subject: "Verify Email",
        html: `<h2>Your Brat verification code is:</h2><h1>${otp}</h1>`
    });
}
