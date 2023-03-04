import nodemailer from 'nodemailer';
import dotenv from "dotenv";

dotenv.config();

async function sendMailNotification(newUser) {

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
        console.log(error);
    }
}


export default sendMailNotification;
