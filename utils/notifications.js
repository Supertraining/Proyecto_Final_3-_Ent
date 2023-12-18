import nodemailer from 'nodemailer';
import Twilio from 'twilio'
import logger from './logger.js';
import * as config from '../config/config.js';

const transporter = nodemailer.createTransport({
    service: config.service,
    port: config.gmailPort,
    auth: {
        user: config.user,
        pass: config.pass
    },
    tls: {
        rejectUnauthorized: false
    }
});

export const adminNewUserNotification = async (newUser) => {

    const emailContent = {
        from: `My e-commerce NodeJS app <noreply@example.com>`,
        to: `"Mati GMAIL" <${config.adminEmail}>`,
        subject: 'Nuevo registro',
        text: ` Un nuevo usuario ha quedado registrado en nuestra base de datos con los siguientes datos:
        Usuario: ${newUser.username},
        Nombre: ${newUser.nombre},
        Edad: ${newUser.edad},
        Direccion: ${newUser.direccion},
        Telefono: ${newUser.Telefono}
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
        to: `"Mati GMAIL" <${config.adminEmail}>`,
        subject: `Nuevo pedido de ${user.nombre}, ${user.username}`,
        html: `<p style="font-size: 16px;">${newOrder}</p>`
    }

    try {
        let info = await transporter.sendMail(emailContent);
        logger.info('Message sent: %s', info.messageId);
        logger.info('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        const client = Twilio(config.accountSID, config.authToken);
        let message = await client.messages
            .create({
                body: `Nuevo pedido de ${user.nombre}, ${user.username}`,
                from: `whatsapp:${config.twilioNumber}`,
                to: `whatsapp:${config.adminNumber}`
            })
    } catch (error) {
        logger.error(error);
    }
}
export const userOrderNotification = async (userPhone) => {
    try {
        const client = Twilio(config.accountSID , config.authToken);
        const message = await client.messages.create({
            body: 'Su pedido ha sido recibido y se encuentra en proceso',
            from: config.twilioNumberSms,
            to: `${userPhone}`,
        });
    } catch (error) {
        logger.error(error);
    }
}
