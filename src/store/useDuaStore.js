import { create } from "zustand";

const getBookmarksFromStorage = () => {
    try {
        const stored = localStorage.getItem("hisnul_bookmarks");
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
};

const useDuaStore = create((set, get) => ({
    categoryId: 1,
    setCategoryId: (id) => set({ categoryId: id }),

    duaGlobalId: 2, // Default to Dua #1 (ID 2 in duanames)
    setDuaGlobalId: (id) => set({ duaGlobalId: id }),

    searchInput: "",
    setSearchInput: (input) => set({ searchInput: input }),

    bookmarks: getBookmarksFromStorage(),
    
    toggleBookmark: (dua) => {
        const current = get().bookmarks;
        const exists = current.some((b) => b.dua_global_id === dua.dua_global_id);
        let updated;
        if (exists) {
            updated = current.filter((b) => b.dua_global_id !== dua.dua_global_id);
        } else {
            updated = [...current, dua];
        }
        try {
            localStorage.setItem("hisnul_bookmarks", JSON.stringify(updated));
        } catch (e) {
            console.error("Failed to save bookmarks:", e);
        }
        set({ bookmarks: updated });
    },

    isBookmarked: (duaGlobalId) => {
        return get().bookmarks.some((b) => b.dua_global_id === duaGlobalId);
    }
}));

export default useDuaStore;
