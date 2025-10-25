import {create} from "zustand";

const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,

    setAuth: (user) => set({
        user: user, isAuthenticated: true
    }),
    logout: () => set({
        user: null, isAuthenticated: false
    }),
}));

export {useAuthStore};