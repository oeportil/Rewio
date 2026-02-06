import { create } from 'zustand'

interface ModalContext {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
    cleanInside: (value: (v: null) => void) => void;
}

const useModal = create<ModalContext>((set) => ({
    isOpen: false,
    openModal: () => set(() => ({ isOpen: true })),
    closeModal: () => set(() => ({ isOpen: false })),
    cleanInside: (setFunc: (value: null) => void) => {
        setFunc(null);
    },
}))

export default useModal;