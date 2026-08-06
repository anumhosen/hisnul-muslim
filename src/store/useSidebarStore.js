import { create } from "zustand";

const useSidebarStore = create((set) => ({
    activeSidebar: null, // 'left', 'right', or null

    toggleLeft: () =>
        set((state) => ({
            activeSidebar: state.activeSidebar === "left" ? null : "left",
        })),

    toggleRight: () =>
        set((state) => ({
            activeSidebar: state.activeSidebar === "right" ? null : "right",
        })),
}));

export default useSidebarStore;
