import { Resend } from "resend";
import dotenv from 'dotenv';
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ to, subject, html }) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Blinkit <onboarding@resend.dev>',
            to: to,
            subject: subject,
            html: html
        });
        if (error) {
            console.log(error);
        }

        return data;

    } catch (error) {
        console.log(error);
    }
}

export default sendEmail;


