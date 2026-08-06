import { create } from 'zustand';

const getItem = (key, defaultVal) => {
    const val = localStorage.getItem(key);
    return val !== null ? JSON.parse(val) : defaultVal;
};

const setItem = (key, val) => {
    localStorage.setItem(key, JSON.stringify(val));
};

const useSettingsStore = create((set) => ({
    showArabic: getItem('showArabic', true),
    showTransliteration: getItem('showTransliteration', true),
    showTranslation: getItem('showTranslation', true),
    showReference: getItem('showReference', true),
    showWordByWord: getItem('showWordByWord', false),
    arabicFontSize: Number(localStorage.getItem('arabicFontSize')) || 24,
    banglaFontSize: Number(localStorage.getItem('banglaFontSize')) || 18,

    setShowArabic: (val) => {
        setItem('showArabic', val);
        set({ showArabic: val });
    },
    toggleShowArabic: () =>
        set((state) => {
            const next = !state.showArabic;
            setItem('showArabic', next);
            return { showArabic: next };
        }),

    setShowTransliteration: (val) => {
        setItem('showTransliteration', val);
        set({ showTransliteration: val });
    },
    toggleShowTransliteration: () =>
        set((state) => {
            const next = !state.showTransliteration;
            setItem('showTransliteration', next);
            return { showTransliteration: next };
        }),

    setShowTranslation: (val) => {
        setItem('showTranslation', val);
        set({ showTranslation: val });
    },
    toggleShowTranslation: () =>
        set((state) => {
            const next = !state.showTranslation;
            setItem('showTranslation', next);
            return { showTranslation: next };
        }),

    setShowReference: (val) => {
        setItem('showReference', val);
        set({ showReference: val });
    },
    toggleShowReference: () =>
        set((state) => {
            const next = !state.showReference;
            setItem('showReference', next);
            return { showReference: next };
        }),

    setShowWordByWord: (val) => {
        setItem('showWordByWord', val);
        set({ showWordByWord: val });
    },
    toggleShowWordByWord: () =>
        set((state) => {
            const next = !state.showWordByWord;
            setItem('showWordByWord', next);
            return { showWordByWord: next };
        }),

    setArabicFontSize: (size) => {
        localStorage.setItem('arabicFontSize', size);
        set({ arabicFontSize: size });
    },
    setBanglaFontSize: (size) => {
        localStorage.setItem('banglaFontSize', size);
        set({ banglaFontSize: size });
    },
}));

export default useSettingsStore;

