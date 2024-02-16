

import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
});

const sendEmail = async (to: string, subject: string, html: string) => {
    try {
        const mailOptions = {
            from: `"Police Connect" <${process.env.EMAIL}>`,
            to, subject, html
        };
        var result = await transporter.sendMail(mailOptions);
        if (result) return { success: false, message: "Unabled to send mail!" }
        return { success: true }
    } catch (error) {
        console.error(`mail>try: ${error}`);
        return { success: false, message: "Something went wrong!" }
    }
};

export const sendSignup = async (email: string) => {
    try {
        var html;
        return await sendEmail(email, 'Welcome to police connect!', html);
    } catch (e) {
        return { success: false, message: "Something went wrong!" }
    }
};

export const sendAuthorised = async (email: string) => {
    try {
        var html;
        return await sendEmail(email, 'Authorised', html);
    } catch (e) {
        return { success: false, message: "Something went wrong!" }
    }
};