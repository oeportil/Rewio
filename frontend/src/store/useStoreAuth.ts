import { create } from 'zustand'

interface AuthState {
    token: string | null;
    setToken: (newToken: string) => void;
    clearToken: () => void;
}

const useStoreAuth = create<AuthState>((set) => ({
    token: localStorage.getItem('token') || null,
    setToken: (newToken: string) => {
        localStorage.setItem("token", newToken);
        set({ token: newToken });
    },
    clearToken: () => {
        localStorage.removeItem("token");
        set({ token: null });
    }
}))

export default useStoreAuth;
