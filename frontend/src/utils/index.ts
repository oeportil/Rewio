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

export function debounce<T extends (...args: any[]) => void>(fn: T, delay = 400) {
    let timer: ReturnType<typeof setTimeout>;

    return (...args: Parameters<T>) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}