import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { IAppointment } from '../types'

type StoreAppointment = {
    appointment: IAppointment
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateAppointment: (appointment: any) => void
    cleanAppointment: () => void
}

const InitVal: IAppointment = {
    date: "",
    doctorId: 0,
    notes: "",
    startTime: "",
    serviceId: 0,
    duration: 0
}

export const useStoreAppointment = create<StoreAppointment>()(
    persist(
        (set) => ({
            appointment: InitVal,
            updateAppointment: (appointment) => set((state) => ({
                appointment: {
                    ...state.appointment,
                    ...appointment
                }
            })),
            cleanAppointment: () => set(() => ({ appointment: InitVal }))
        }),
        {
            name: 'appointment',
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
)

