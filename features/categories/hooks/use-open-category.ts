import { create} from "zustand";

type OpenaCategoryState = {
    id?:string, 
    isOpen: boolean;
    onOpen: (id:string) => void;
    onClose: () => void;
}

export const useOpenCategory = create<OpenaCategoryState>((set) => ({
    id: undefined,
    isOpen: false, 
    onOpen: (id:string) => set({ isOpen:true, id}),
    onClose: () => set({ isOpen: false, id:undefined}),
}))