import { prisma } from "../config/client";
import nodemailer from "nodemailer";

// Configura tu transportador de email
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

export const sendAppointmentReminders = async () => {
    const now = new Date();
    const inOneHour = new Date(now.getTime() + 60 * 60 * 1000);

    // Obtener citas en la siguiente hora
    const appointments = await prisma.appointment.findMany({
        where: {
            date: inOneHour,
            status: "confirmed"
        },
        include: { patient: { include: { user: true } }, doctor: { include: { user: true } } }
    });

    for (const appt of appointments) {
        const email = appt.patient.user.email;
        const subject = `Recordatorio: tu cita con ${appt.doctor.user.name}`;
        const text = `Hola ${appt.patient.user.name}, recuerda tu cita el ${appt.date.toLocaleString()} con ${appt.doctor.user.name}.`;

        await transporter.sendMail({ from: process.env.SMTP_USER, to: email, subject, text });
    }

    return appointments.length;
};
