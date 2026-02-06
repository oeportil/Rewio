import { create } from 'zustand'

interface WindowSizeState {
    width: number;
    height: number;
    setSize: (width: number, height: number) => void;
}

const useWindowSize = create<WindowSizeState>((set) => ({
    width: window.innerWidth,
    height: window.innerHeight,
    setSize: (width: number, height: number) => set({ width, height }),
}))

export default useWindowSize;