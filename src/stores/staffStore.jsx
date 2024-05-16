import { create } from "zustand";

export const useStaffStore = create((set) => ({
  username: null,
  role: "medic" | "staff",
  permissions: [],
  loggedIn: false,

  logout: () => {
    localStorage.removeItem("token");
    set({ username: null, loggedIn: false, permissions: [], role: null });
  },

  login: (username, role, permissions) =>
    set({
      username: username,
      role: role,
      permissions: permissions,
      loggedIn: true,
    }),
}));
