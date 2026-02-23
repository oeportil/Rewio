import { useEffect } from "react";
import { create } from "zustand";

interface WindowSizeState {
    width: number;
    height: number;
    setSize: (width: number, height: number) => void;
}

const useWindowSize = create<WindowSizeState>((set) => ({
    width: window.innerWidth,
    height: window.innerHeight,
    setSize: (width, height) => set({ width, height }),
}));

export const useWindowSizeListener = () => {
    const setSize = useWindowSize((state) => state.setSize);

    useEffect(() => {
        const handleResize = () => {
            setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [setSize]);
};

export default useWindowSize;
