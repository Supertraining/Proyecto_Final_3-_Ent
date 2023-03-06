import nodemailer from 'nodemailer';
import Twilio from 'twilio'
import dotenv from 'dotenv'
import logger from './logger.js';
dotenv.config()


const accountSID = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;

const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    port: process.env.GMAIL_PORT,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

export const adminNewUserNotification = async (newUser) => {

    const emailContent = {
        from: `My e-commerce NodeJS app <noreply@example.com>`,
        to: `"Mati GMAIL" <${process.env.ADMIN_EMAIL}>`,
        subject: 'Nuevo registro',
        text: ` Un nuevo usuario ha quedado registrado en nuestra base de datos con los siguientes datos:
        Usuario: ${newUser.username},
        Nombre: ${newUser.nombre},
        Edad: ${newUser.edad},
        Direccion: ${newUser.direccion},
        Contraseña: ${newUser.password}.`,
    }

    try {
        let info = await transporter.sendMail(emailContent);
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    } catch (error) {
        logger.error(error);
    }
}

export const adminNewOrderNotification = async (user, newOrder) => {

    const emailContent = {
        from: `My e-commerce NodeJS app <noreply@example.com>`,
        to: `"Mati GMAIL" <${process.env.ADMIN_EMAIL}>`,
        subject: `Nuevo pedido de ${user.nombre}, ${user.username}`,
        html: `<p style="font-size: 16px;">${newOrder}</p>`
    }

    try {
        let info = await transporter.sendMail(emailContent);
        logger.info('Message sent: %s', info.messageId);
        logger.info('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        const client = await Twilio(accountSID, authToken);
        let message = await client.messages
            .create({
                body: `Nuevo pedido de ${user.nombre}, ${user.username}`,
                from: `whatsapp:${process.env.TWILIO_NUMBER}`,
                to: `whatsapp:${process.env.ADMIN_NUMBER}`
            })
    } catch (error) {
       logger.error(error);
    }
}
export const userOrderNotification = async (userPhone) => {
    try {
        const client = await Twilio(accountSID, authToken);
        const message = await client.messages.create({
            body: 'Su pedido ha sido recibido y se encuentra en proceso',
            from: process.env.TWILIO_NUMBER_SMS,
            to: `${userPhone}`,
        });
    } catch (error) {
       logger.error(error);
    }
}
