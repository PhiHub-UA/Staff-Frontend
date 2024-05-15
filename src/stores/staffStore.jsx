import {create} from 'zustand'

export const useStaffStore = create((set) => ({

    name: "",
    setName: (name) => set({name}),
    email: "",
    setEmail: (email) => set({email})

}));

