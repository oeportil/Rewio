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

export const getDoctorAvailability = async (
    doctorId: number,
    date: string,
    serviceId: number
) => {
    const targetDate = new Date(date)
    const weekday = targetDate.getDay()

    const schedules = await prisma.doctorSchedule.findMany({ where: { doctorId, weekday } })
    if (schedules.length === 0) return []

    const service = await prisma.service.findUnique({ where: { id: serviceId }, select: { duration: true } })
    if (!service) throw new Error("Servicio no existe")

    const duration = service.duration

    const appointments = await prisma.appointment.findMany({
        where: { doctorId, date: targetDate, status: { not: "cancelled" } },
        select: { startTime: true, endTime: true }
    })


    const vacations = await prisma.doctorVacation.findMany({
        where: {
            doctorId,
            startDate: { lte: targetDate },
            endDate: { gte: targetDate }
        },
        select: { startDate: true, endDate: true }
    })

    const blocks = await prisma.doctorBlock.findMany({
        where: {
            doctorId,
            date: targetDate
        },
        select: { startTime: true, endTime: true }
    })

    const availableSlots: string[] = []

    for (const s of schedules) {
        let current = s.startTime

        while (true) {
            const end = addMinutes(current, duration)
            if (end > s.endTime) break

            const collision = appointments.some(a => isOverlapping(current, end, a.startTime, a.endTime))
            const inVacation = vacations.some(vac => {
                const vacStart = vac.startDate.toTimeString().slice(0, 5)
                const vacEnd = vac.endDate.toTimeString().slice(0, 5)
                return isOverlapping(current, end, vacStart, vacEnd)
            })
            const inBlock = blocks.some(b => isOverlapping(current, end, b.startTime, b.endTime))

            if (!collision && !inVacation && !inBlock) availableSlots.push(current)

            current = addMinutes(current, duration)
        }
    }

    return availableSlots
}

export const getDoctorScheduleByServAndDate = async (
    date: Date,
    doctorId: number,
    serviceId: number
) => {

    const weekday = date.getDay()

    // 1️⃣ Horarios base del doctor
    const schedules = await prisma.doctorSchedule.findMany({
        where: {
            doctorId,
            weekday
        }
    })

    if (schedules.length === 0) return []

    // 2️⃣ Duración del servicio
    const service = await prisma.service.findUnique({
        where: { id: serviceId },
        select: { duration: true }
    })
    if (!service) throw new Error("Servicio no existe")

    const duration = service.duration

    // 3️⃣ Citas ya existentes
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

    // 4️⃣ Bloqueos del doctor
    const blocks = await prisma.doctorBlock.findMany({
        where: {
            doctorId,
            date
        }
    })

    // 5️⃣ Vacaciones del doctor
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

    // 6️⃣ Generar slots reales
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

