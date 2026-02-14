import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
        user: process.env.EMAIL_USER || 'test@example.com',
        pass: process.env.EMAIL_PASS || 'password',
    },
});

if (!process.env.EMAIL_USER || process.env.EMAIL_USER === 'your_email@example.com') {
    console.warn('AVISO: El servicio de email está usando credenciales de prueba. No se enviarán correos reales hasta que configures el archivo .env');
}

export const sendWelcomeEmail = async (userEmail: string, userName: string) => {
    const mailOptions = {
        from: `"BDEC" <${process.env.EMAIL_USER || 'no-reply@bdec.com'}>`,
        to: userEmail,
        subject: '¡Bienvenido a BDEC!',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
                <h2 style="color: #0066ff;">¡Hola, ${userName}!</h2>
                <p>Gracias por registrarte en <strong>BDEC (Banco de Datos de Empleos Comunitarios)</strong>.</p>
                <p>Ahora puedes buscar empleos, postularte y estar al tanto de las mejores oportunidades en tu comunidad.</p>
                <div style="margin: 30px 0; text-align: center;">
                    <a href="http://localhost:5173" style="background-color: #0066ff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Explorar Empleos</a>
                </div>
                <p style="color: #666; font-size: 0.9rem;">Si no te registraste en BDEC, puedes ignorar este correo.</p>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                <p style="font-size: 0.8rem; color: #999; text-align: center;">&copy; 2026 BDEC - Proyectos Universitarios</p>
            </div>
        `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        // We log the error but don't throw it to avoid breaking the registration flow
        return null;
    }
};
