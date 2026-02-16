import { create } from "zustand";

type ModalState = {
    modals: Record<string, boolean>;
    open: (id: string) => void;
    close: (id: string) => void;
    isOpen: (id: string) => boolean;
    clean: (fn?: (v: null) => void) => void;
};

const useModal = create<ModalState>((set, get) => ({
    modals: {},

    open: (id) =>
        set((state) => ({
            modals: { ...state.modals, [id]: true },
        })),

    close: (id) =>
        set((state) => ({
            modals: { ...state.modals, [id]: false },
        })),

    isOpen: (id) => !!get().modals[id],

    clean: (fn) => {
        if (fn) fn(null);
    },
}));

export default useModal;
