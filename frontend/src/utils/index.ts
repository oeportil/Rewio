import type { FormEvent } from "react";

//Ojo negritos siempre es necesario mandar el tipado de la respuesta aca
export function formDataKeysAndValues<T extends Record<string, string>>(
    e: FormEvent<HTMLFormElement>
): T {
    const fd = new FormData(e.currentTarget);

    const result = Object.fromEntries(
        Array.from(fd.entries()).map(([k, v]) => [k, String(v)])
    ) as T;

    return result;
}

export function formatDate(date: string | Date) {
    const d = new Date(date)

    return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit"
    })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => void>(fn: T, delay = 400) {
    let timer: ReturnType<typeof setTimeout>;

    return (...args: Parameters<T>) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}


export const calculateEndTime = (duration: number, startTime: string) => {
    const [h, m] = startTime.split(":").map(Number);
    const start = new Date(2000, 0, 1, h, m);
    start.setMinutes(start.getMinutes() + duration);

    const endH = start.getHours().toString().padStart(2, "0");
    const endM = start.getMinutes().toString().padStart(2, "0");

    return `${endH}:${endM}`;
};

export const addMonthAndYear = (day: number) => {
    const today = new Date()

    const todayDay = today.getDay()
    let diff = day - todayDay

    if (diff <= 0) {
        diff += 7
    }

    const result = new Date(today)
    result.setDate(today.getDate() + diff)

    return result.toISOString().split("T")[0]
}

export const canReprogram = (date: string) => {
    const today = new Date()
    const appointmentDate = new Date(date)
    const diffInMs = appointmentDate.getTime() - today.getTime()
    const diffInHours = diffInMs / (1000 * 60 * 60)
    return diffInHours >= 48

}