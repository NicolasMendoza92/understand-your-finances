import { create} from "zustand";

type OpenaAccountState = {
    id?:string, 
    isOpen: boolean;
    onOpen: (id:string) => void;
    onClose: () => void;
}

export const useOpenAccount = create<OpenaAccountState>((set) => ({
    id: undefined,
    isOpen: false, 
    onOpen: (id:string) => set({ isOpen:true, id}),
    onClose: () => set({ isOpen: false, id:undefined}),
}))