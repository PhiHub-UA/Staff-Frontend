import { create } from "zustand";

export const useStaffStore = create((set) => ({

    username: null,
    loggedIn: false,

    logout: () => {localStorage.removeItem("token") ; set({ username: null, loggedIn: false});},

    login: (username) => set({ username: username, loggedIn: true})

}));

