import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { IUser } from '../types'

type UserStore = {
  user: IUser | null
  saveUser: (user: IUser) => void
  cleanUser: () => void
  updateStore: (user: IUser) => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      saveUser: (user: IUser) => {
        if (user) set({ user })
      },
      cleanUser: () => set({ user: null }),
      updateStore: (user: IUser) => set({ user })
    }),
    {
      name: 'user', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)