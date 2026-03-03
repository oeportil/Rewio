import { prisma } from "../config/client";


export const isWithinDoctorSchedule = async (
    doctorId: number,
    date: Date,
    startTime: string,
    endTime: string
): Promise<boolean> => {
    const weekday = date.getDay() + 1;

    // Obtener horarios del doctor
    const schedules = await prisma.doctorSchedule.findMany({
        where: { doctorId, weekday }
    });
    if (schedules.length === 0) return false;

    const withinSchedule = schedules.some(s => startTime >= s.startTime && endTime <= s.endTime);
    console.log("withinSchedule", withinSchedule)
    console.log("schedules", schedules)
    if (!withinSchedule) return false;

    // Verificar bloqueos
    const block = await prisma.doctorBlock.findFirst({
        where: {
            doctorId,
            date,
            startTime: { lte: endTime },
            endTime: { gte: startTime }
        }
    });
    console.log("block", block)
    if (block) return false;

    // Verificar vacaciones

    const vacation = await prisma.doctorVacation.findFirst({
        where: {
            doctorId,
            startDate: { lte: date },
            endDate: { gte: date }
        }
    });
    console.log("vacation", vacation)
    if (vacation) return false;

    return true;
};


export const calculateEndTime = async (serviceId: number, startTime: string): Promise<string> => {
    const service = await prisma.service.findUnique({
        where: { id: serviceId },
        select: { duration: true }
    });
    if (!service) throw new Error("Servicio no existe");

    const [h, m] = startTime.split(":").map(Number);
    const start = new Date(2000, 0, 1, h, m);
    start.setMinutes(start.getMinutes() + service.duration);

    const endH = start.getHours().toString().padStart(2, "0");
    const endM = start.getMinutes().toString().padStart(2, "0");

    return `${endH}:${endM}`;
};


export const hasCollision = async (
    doctorId: number,
    date: Date,
    startTime: string,
    endTime: string,
    excludeAppointmentId?: number
): Promise<boolean> => {
    const where: any = {
        doctorId,
        date,
        NOT: [
            { endTime: { lte: startTime } },
            { startTime: { gte: endTime } }
        ]
    };

    if (excludeAppointmentId) {
        where.id = { not: excludeAppointmentId };
    }

    const collision = await prisma.appointment.findFirst({ where });
    return Boolean(collision);
};
