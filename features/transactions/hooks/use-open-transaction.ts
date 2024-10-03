import { create} from "zustand";

type OpenaTransactionState = {
    id?:string, 
    isOpen: boolean;
    onOpen: (id:string) => void;
    onClose: () => void;
}

export const useOpenTransaction = create<OpenaTransactionState>((set) => ({
    id: undefined,
    isOpen: false, 
    onOpen: (id:string) => set({ isOpen:true, id}),
    onClose: () => set({ isOpen: false, id:undefined}),
}))