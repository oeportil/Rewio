import type { TimeRangePickerProps } from "antd";
import dayjs from "dayjs";

export const classesNavbarLinks = `relative inline-block
cursor-pointer
mx-4 font-semibold
text-gray-700
transition-all duration-300 ease-out

hover:text-sky-900
hover:-translate-y-[1px]
hover:drop-shadow-[0_4px_12px_rgba(79,70,229,0.35)]

after:content-['']
after:absolute
after:left-1/2
after:-bottom-1
after:h-[2px]
after:w-0
after:bg-gradient-to-r
after:from-sky-500
after:to-sky-300
after:transition-all
after:duration-300
after:ease-out
after:-translate-x-1/2

hover:after:w-full`;

export const roles = [
    'admin',
    'clinic',
    'doctor',
    'patient'
]

export const regRoles = [
    { id: 1, value: "admin", label: "administrador" },
    { id: 2, value: "clinic", label: "Clinica - Deseo Adquirir el Servicio" },
    { id: 3, value: "doctor", label: "Doctor - Formo Parte de una Clinica" },
    { id: 4, value: "patient", label: "Paciente - Deseo Agendar una Cita" },

]

export const roleLabels: Record<string, string> = {
    admin: "Administrador",
    patient: "Paciente",
    clinic: "Propietario",
};

export const rangePresets: TimeRangePickerProps["presets"] = [
    { label: "7 Dias", value: [dayjs().add(7, "d"), dayjs()] },
    { label: "14 Dias", value: [dayjs().add(14, "d"), dayjs()] },
    { label: "30 Dias", value: [dayjs().add(30, "d"), dayjs()] },
    { label: "90 Dias", value: [dayjs().add(90, "d"), dayjs()] },
];


export const weekdays = [
    { id: 1, label: "Lunes", value: "1" },
    { id: 2, label: "Martes", value: "2" },
    { id: 3, label: "Miércoles", value: "3" },
    { id: 4, label: "Jueves", value: "4" },
    { id: 5, label: "Viernes", value: "5" },
    { id: 6, label: "Sabado", value: "6" },
    { id: 7, label: "Domingo", value: "7" },
]