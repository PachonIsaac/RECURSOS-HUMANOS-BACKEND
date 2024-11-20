// email.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    }

    async sendCredentials(email: string, username: string, password: string) {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Credenciales de acceso HrMinder',
            html: `
                <h1>Bienvenido a HrMinder</h1>
                <p>Estimado(a) usuario,</p>
                <p>Nos complace informarle que su cuenta ha sido creada exitosamente. A continuación, encontrará sus credenciales de acceso:</p>
                <ul>
                    <li><strong>Nombre de usuario:</strong> ${username}</li>
                    <li><strong>Contraseña:</strong> ${password}</li>
                </ul>
                <p>Si tiene alguna pregunta o necesita asistencia, no dude en ponerse en contacto con nuestro equipo de soporte.</p>
                <p>Atentamente,</p>
                <p>El equipo de HrMinder</p>
            `,
        };

        await this.transporter.sendMail(mailOptions);
    }
}