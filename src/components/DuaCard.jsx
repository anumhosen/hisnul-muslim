import { useState, useEffect } from "react";
import useSettingsStore from "../store/useSettingsStore";
import useDuaStore from "../store/useDuaStore";
import { FaCopy, FaCheck, FaBookmark, FaRegBookmark, FaBookOpen } from "react-icons/fa6";

const DuaCard = ({ detail, title }) => {
    const {
        showArabic,
        showTransliteration,
        showTranslation,
        showReference,
        showWordByWord: globalWordByWord,
        arabicFontSize,
        banglaFontSize,
    } = useSettingsStore();

    const { toggleBookmark, isBookmarked } = useDuaStore();

    const [localWbw, setLocalWbw] = useState(false);
    const [wbwWords, setWbwWords] = useState([]);
    const [copied, setCopied] = useState(false);

    const isWbwActive = globalWordByWord || localWbw;
    const bookmarked = isBookmarked(detail.dua_global_id);

    // Fetch word-by-word data from SQLite duawbw table
    useEffect(() => {
        let isMounted = true;
        const fetchWbw = async () => {
            if (!isWbwActive || !detail.dua_global_id) return;
            try {
                const sql = `SELECT * FROM duawbw WHERE dua_global_id = ${detail.dua_global_id} AND dua_segment_id = ${detail.dua_segment_id || 1} ORDER BY word_id ASC`;
                const words = await window.tauriAPI.DBOperation(sql);
                if (isMounted) setWbwWords(words || []);
            } catch (err) {
                console.error("Failed to fetch word-by-word data:", err);
            }
        };
        fetchWbw();
        return () => {
            isMounted = false;
        };
    }, [isWbwActive, detail.dua_global_id, detail.dua_segment_id]);

    const handleCopy = async () => {
        let copyText = `${title || ""}\n\n`;
        if (detail.top) copyText += `${detail.top}\n\n`;
        if (detail.arabic) copyText += `${detail.arabic}\n\n`;
        if (detail.transliteration) copyText += `উচ্চারণ: ${detail.transliteration}\n\n`;
        if (detail.translations) copyText += `অনুবাদ: ${detail.translations}\n\n`;
        if (detail.reference || detail.app_reference) copyText += `রেফারেন্স: ${detail.reference || detail.app_reference}`;

        try {
            await navigator.clipboard.writeText(copyText);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy text:", err);
        }
    };

    return (
        <div className="flex flex-col gap-4 p-4 sm:p-6 my-4 md:mx-6 rounded-2xl shadow-md shadow-gray-300 dark:shadow-black border border-emerald-500/20 dark:border-gray-700 bg-white dark:bg-gray-800 transition-all duration-300">
            {/* Header bar */}
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-3">
                <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-400 font-[AnekBangla] font-semibold text-lg">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                    <span>{title}</span>
                </div>

                <div className="flex items-center gap-1 sm:gap-2">
                    <button
                        onClick={() => setLocalWbw(!localWbw)}
                        title="শব্দে শব্দে অর্থ"
                        className={`flex items-center gap-1 px-2.5 py-1 text-xs sm:text-sm rounded-lg border transition-colors cursor-pointer ${isWbwActive
                                ? "bg-emerald-600 text-white border-emerald-600"
                                : "bg-emerald-50 dark:bg-gray-700 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-gray-600 hover:bg-emerald-100"
                            }`}
                    >
                        <FaBookOpen className="text-xs" />
                        <span className="font-[Kalpurush] hidden sm:inline">শব্দে শব্দে</span>
                    </button>

                    <button
                        onClick={handleCopy}
                        title="অনুলিপি করুন (Copy)"
                        className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                    >
                        {copied ? <FaCheck className="text-emerald-600" /> : <FaCopy />}
                    </button>

                    <button
                        onClick={() => toggleBookmark({ dua_global_id: detail.dua_global_id, title, ...detail })}
                        title="বুকমার্ক করুন"
                        className={`p-2 rounded-lg transition-colors cursor-pointer ${bookmarked
                                ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-gray-700"
                                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            }`}
                    >
                        {bookmarked ? <FaBookmark /> : <FaRegBookmark />}
                    </button>
                </div>
            </div>

            {/* Top Introductory Text */}
            {detail.top && (
                <div className="font-[Kalpurush] text-emerald-900 dark:text-emerald-200 font-semibold text-lg my-1">
                    {detail.top}
                </div>
            )}

            {/* Arabic Paragraph */}
            {showArabic && detail.arabic && (
                <p
                    dir="rtl"
                    className="leading-relaxed font-[Kitab] text-right dir-rtl text-emerald-900 dark:text-emerald-200 my-2 select-text"
                    style={{ fontSize: `${arabicFontSize}px`, direction: "rtl", textAlign: "right" }}
                >
                    {detail.arabic}
                </p>
            )}

            {/* Word by Word Section */}
            {isWbwActive && wbwWords.length > 0 && (
                <div
                    dir="rtl"
                    className="flex flex-wrap justify-start gap-2.5 dir-rtl my-3 p-3 bg-emerald-50/50 dark:bg-gray-800/60 rounded-xl border border-emerald-200/50 dark:border-gray-700"
                    style={{ direction: "rtl", textAlign: "right" }}
                >
                    {wbwWords.map((word, idx) => (
                        <div
                            key={word.word_id || idx}
                            className="flex flex-col items-center justify-between p-2 min-w-[70px] bg-white dark:bg-gray-900 rounded-lg border border-emerald-300/40 dark:border-gray-700 shadow-sm hover:scale-105 transition-transform duration-200 select-none"
                        >
                            <span className="text-xl font-[Kitab] font-bold text-emerald-800 dark:text-emerald-300">
                                {word.arabic}
                            </span>
                            <span className="text-xs font-[Kalpurush] text-gray-700 dark:text-gray-300 mt-1 text-center dir-ltr">
                                {word.bn}
                            </span>
                        </div>
                    ))}
                </div>
            )}

            {/* Pronunciation Transliteration Box */}
            {showTransliteration && detail.transliteration && (
                <div
                    className="font-[Kalpurush] italic text-gray-700 dark:text-gray-300 bg-emerald-50/40 dark:bg-gray-900/40 p-3 rounded-xl border border-emerald-100 dark:border-gray-700/50"
                    style={{ fontSize: `${banglaFontSize}px` }}
                >
                    <span className="font-semibold text-emerald-700 dark:text-emerald-400 not-italic">
                        উচ্চারণ:{" "}
                    </span>
                    {detail.transliteration}
                </div>
            )}

            {/* Translation Box */}
            {showTranslation && detail.translations && (
                <div
                    className="font-[Kalpurush] text-gray-800 dark:text-gray-200 text-justify leading-relaxed"
                    style={{ fontSize: `${banglaFontSize}px` }}
                >
                    <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                        অনুবাদ:{" "}
                    </span>
                    {detail.translations}
                </div>
            )}

            {/* Bottom commentary if present */}
            {detail.bottom && (
                <div
                    className="font-[Kalpurush] text-gray-700 dark:text-gray-300 text-justify leading-relaxed mt-1 whitespace-pre-line"
                    style={{ fontSize: `${banglaFontSize}px` }}
                >
                    {detail.bottom}
                </div>
            )}

            {/* Reference Footer */}
            {showReference && (detail.reference || detail.app_reference) && (
                <div className="text-right font-[Kalpurush] text-sm text-emerald-700 dark:text-emerald-400 italic border-t border-gray-100 dark:border-gray-700/50 pt-2 mt-1">
                    রেফারেন্স: {detail.reference || detail.app_reference}
                </div>
            )}
        </div>
    );
};

export default DuaCard;
