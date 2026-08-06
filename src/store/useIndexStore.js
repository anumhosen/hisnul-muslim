import { create } from "zustand";

const useIndexStore = create((set) => ({
    isIndexVisible: true,
    toggleIndex: () => set((state) => ({ isIndexVisible: !state.isIndexVisible })),

    isCategoryVisible: true,
    toggleCategory: (state) => set({ isCategoryVisible: state }),
}));

export default useIndexStore;
