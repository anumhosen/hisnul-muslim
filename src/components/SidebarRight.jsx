import useSidebarStore from '../store/useSidebarStore';
import useSettingsStore from '../store/useSettingsStore';
import { FaTextHeight, FaEye } from 'react-icons/fa6';

const SidebarRight = () => {
    const activeSidebar = useSidebarStore((s) => s.activeSidebar);
    const isOpen = activeSidebar === 'right';

    const {
        showArabic,
        toggleShowArabic,
        showTransliteration,
        toggleShowTransliteration,
        showTranslation,
        toggleShowTranslation,
        showReference,
        toggleShowReference,
        showWordByWord,
        toggleShowWordByWord,
        arabicFontSize,
        setArabicFontSize,
        banglaFontSize,
        setBanglaFontSize,
    } = useSettingsStore();

    return (
        <div
            className={`fixed right-0 top-11 bottom-0 w-full sm:w-80 p-5 transition-transform duration-300 z-20 ${
                isOpen ? 'translate-x-0' : 'translate-x-full'
            } bg-emerald-50 dark:bg-gray-900 text-black dark:text-white border-l border-emerald-500/20 dark:border-gray-800 shadow-xl overflow-y-scroll no-scrollbar select-none`}
        >
            <h2 className="text-2xl font-[AnekBangla] font-bold text-center mb-6 text-emerald-800 dark:text-emerald-300">
                সেটিংস ও কাস্টমাইজেশন
            </h2>

            {/* Font Size Box */}
            <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-emerald-500/20 dark:border-gray-700">
                <h3 className="flex items-center gap-2 font-[AnekBangla] font-bold text-lg mb-3 text-emerald-700 dark:text-emerald-400">
                    <FaTextHeight />
                    <span>লেখার সাইজ</span>
                </h3>

                <div className="mb-4">
                    <div className="flex justify-between text-sm font-[Kalpurush] mb-1">
                        <span>আরবি ফন্ট সাইজ</span>
                        <span className="font-semibold text-emerald-600">{arabicFontSize}px</span>
                    </div>
                    <input
                        min="18"
                        max="42"
                        className="w-full accent-emerald-600 cursor-pointer"
                        type="range"
                        value={arabicFontSize}
                        onChange={(e) => setArabicFontSize(Number(e.target.value))}
                    />
                </div>

                <div>
                    <div className="flex justify-between text-sm font-[Kalpurush] mb-1">
                        <span>বাংলা ফন্ট সাইজ</span>
                        <span className="font-semibold text-emerald-600">{banglaFontSize}px</span>
                    </div>
                    <input
                        min="14"
                        max="28"
                        className="w-full accent-emerald-600 cursor-pointer"
                        type="range"
                        value={banglaFontSize}
                        onChange={(e) => setBanglaFontSize(Number(e.target.value))}
                    />
                </div>
            </div>

            {/* Display Options Box */}
            <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-emerald-500/20 dark:border-gray-700">
                <h3 className="flex items-center gap-2 font-[AnekBangla] font-bold text-lg mb-3 text-emerald-700 dark:text-emerald-400">
                    <FaEye />
                    <span>প্রদর্শন অপশন</span>
                </h3>

                <div className="space-y-3 font-[Kalpurush] text-md">
                    <label className="flex items-center justify-between cursor-pointer">
                        <span>আরবি টেক্সট</span>
                        <input
                            className="w-4 h-4 accent-emerald-600 cursor-pointer"
                            type="checkbox"
                            checked={showArabic}
                            onChange={toggleShowArabic}
                        />
                    </label>

                    <label className="flex items-center justify-between cursor-pointer">
                        <span>উচ্চারণ (Transliteration)</span>
                        <input
                            className="w-4 h-4 accent-emerald-600 cursor-pointer"
                            type="checkbox"
                            checked={showTransliteration}
                            onChange={toggleShowTransliteration}
                        />
                    </label>

                    <label className="flex items-center justify-between cursor-pointer">
                        <span>অনুবাদ (Translation)</span>
                        <input
                            className="w-4 h-4 accent-emerald-600 cursor-pointer"
                            type="checkbox"
                            checked={showTranslation}
                            onChange={toggleShowTranslation}
                        />
                    </label>

                    <label className="flex items-center justify-between cursor-pointer">
                        <span>রেফারেন্স</span>
                        <input
                            className="w-4 h-4 accent-emerald-600 cursor-pointer"
                            type="checkbox"
                            checked={showReference}
                            onChange={toggleShowReference}
                        />
                    </label>

                    <label className="flex items-center justify-between cursor-pointer">
                        <span>শব্দে শব্দে অর্থ (Word-by-Word)</span>
                        <input
                            className="w-4 h-4 accent-emerald-600 cursor-pointer"
                            type="checkbox"
                            checked={showWordByWord}
                            onChange={toggleShowWordByWord}
                        />
                    </label>
                </div>
            </div>
        </div>
    );
};

export default SidebarRight;
