import { prisma } from "../config/client"

function addMinutes(time: string, minutes: number) {
    const [h, m] = time.split(":").map(Number)
    const d = new Date(2000, 0, 1, h, m)
    d.setMinutes(d.getMinutes() + minutes)
    return d.getHours().toString().padStart(2, "0") + ":" + d.getMinutes().toString().padStart(2, "0")
}

function toMinutes(time: string) {
    const [h, m] = time.split(":").map(Number)
    return h * 60 + m
}

function isOverlapping(start1: string, end1: string, start2: string, end2: string) {
    const s1 = toMinutes(start1)
    const e1 = toMinutes(end1)
    const s2 = toMinutes(start2)
    const e2 = toMinutes(end2)
    return !(e1 <= s2 || s1 >= e2)
}


export const getDoctorAvailableDays = async (
    doctorId: number,
    serviceId: number,
    year: number,
    month: number
) => {
    console.log({
        doctorId,
        serviceId,
        year,
        month
    });

    const service = await prisma.service.findUnique({
        where: { id: serviceId },
        select: { duration: true },
    });

    if (!service) throw new Error("Servicio no existe");

    const duration = service.duration;

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const availableDays: string[] = [];

    for (
        let d = new Date(startDate);
        d <= endDate;
        d.setDate(d.getDate() + 1)
    ) {
        const weekday = d.getDay();

        const schedules = await prisma.doctorSchedule.findMany({
            where: {
                doctorId,
                weekday,
            },
        });

        if (!schedules.length) continue;


        const vacation = await prisma.doctorVacation.findFirst({
            where: {
                doctorId,
                startDate: { lte: d },
                endDate: { gte: d },
            },
        });

        if (vacation) continue;


        const blocks = await prisma.doctorBlock.findMany({
            where: {
                doctorId,
                date: d,
            },
        });

        const appointments = await prisma.appointment.findMany({
            where: {
                doctorId,
                date: d,
                status: { not: "cancelled" },
            },
            select: {
                startTime: true,
                endTime: true,
            },
        });

        let hasAvailability = false;

        for (const s of schedules) {

            let current = s.startTime;

            while (true) {

                const end = addMinutes(current, duration);

                if (end > s.endTime) break;

                const collision = appointments.some(a =>
                    isOverlapping(current, end, a.startTime, a.endTime)
                );

                const blocked = blocks.some(b =>
                    isOverlapping(current, end, b.startTime, b.endTime)
                );

                if (!collision && !blocked) {
                    hasAvailability = true;
                    break;
                }

                current = addMinutes(current, duration);
            }

            if (hasAvailability) break;
        }

        if (hasAvailability) {
            availableDays.push(
                d.toISOString().split("T")[0]
            );
        }
    }

    return availableDays;
}


export const getDoctorAvailabilityHours = async (
    doctorId: number,
    serviceId: number,
    date: string
) => {


    const targetDate = new Date(date)
    const weekday = targetDate.getDay() + 1

    // horarios del doctor
    const schedules = await prisma.doctorSchedule.findMany({
        where: {
            doctorId,
            ...(weekday !== undefined && { weekday })
        }
    })

    if (schedules.length === 0)
        return []

    // duración del servicio
    const service = await prisma.service.findUnique({
        where: { id: serviceId },
        select: { duration: true }
    })

    if (!service) throw new Error("Servicio no existe")

    const duration = service.duration

    // citas existentes
    const appointments = await prisma.appointment.findMany({
        where: {
            doctorId,
            date: targetDate,
            status: { not: "cancelled" }
        },
        select: { startTime: true, endTime: true }
    })

    // vacaciones
    const vacations = targetDate
        ? await prisma.doctorVacation.findMany({
            where: {
                doctorId,
                startDate: { lte: targetDate },
                endDate: { gte: targetDate }
            },
            select: { startDate: true, endDate: true }
        })
        : []

    // bloqueos manuales
    const blocks = targetDate
        ? await prisma.doctorBlock.findMany({
            where: {
                doctorId,
                date: targetDate
            },
            select: { startTime: true, endTime: true }
        })
        : []

    // respuestas
    const availableSlots: string[] = []

    for (const s of schedules) {

        let current = s.startTime

        while (true) {

            const end = addMinutes(current, duration)
            if (end > s.endTime) break

            const collision = appointments.some(a =>
                isOverlapping(current, end, a.startTime, a.endTime)
            )

            const inVacation = vacations.some(vac => {
                const vacStart = vac.startDate.toTimeString().slice(0, 5)
                const vacEnd = vac.endDate.toTimeString().slice(0, 5)
                return isOverlapping(current, end, vacStart, vacEnd)
            })

            const inBlock = blocks.some(b =>
                isOverlapping(current, end, b.startTime, b.endTime)
            )

            if (!collision && !inVacation && !inBlock) {

                // respuesta cuando viene fecha

                availableSlots.push(current)
            }

            current = addMinutes(current, duration)
        }
    }

    // retorno dinámico
    return availableSlots

}


export const getDoctorScheduleByServAndDate = async (
    date: Date,
    doctorId: number,
    serviceId: number
) => {

    const weekday = date.getDay()

    //Horarios base del doctor
    const schedules = await prisma.doctorSchedule.findMany({
        where: {
            doctorId,
            weekday
        }
    })

    if (schedules.length === 0) return []

    // Duración del servicio
    const service = await prisma.service.findUnique({
        where: { id: serviceId },
        select: { duration: true }
    })
    if (!service) throw new Error("Servicio no existe")

    const duration = service.duration

    // Citas ya existentes
    const appointments = await prisma.appointment.findMany({
        where: {
            doctorId,
            date,
            status: { not: "cancelled" }
        },
        select: {
            startTime: true,
            endTime: true
        }
    })

    // Bloqueos del doctor
    const blocks = await prisma.doctorBlock.findMany({
        where: {
            doctorId,
            date
        }
    })

    // Vacaciones del doctor
    const vacations = await prisma.doctorVacation.findMany({
        where: {
            doctorId,
            startDate: { lte: date },
            endDate: { gte: date }
        }
    })

    // Si está de vacaciones → no hay agenda
    if (vacations.length > 0) return []

    const unavailableRanges = [
        ...appointments.map(a => ({ start: a.startTime, end: a.endTime })),
        ...blocks.map(b => ({ start: b.startTime, end: b.endTime }))
    ]

    const availableSlots: string[] = []


    for (const s of schedules) {
        let current = s.startTime

        while (true) {
            const end = addMinutes(current, duration)

            if (end > s.endTime) break

            const collision = unavailableRanges.some(r =>
                isOverlapping(current, end, r.start, r.end)
            )

            if (!collision) availableSlots.push(current)

            current = addMinutes(current, duration)
        }
    }

    return availableSlots
}

