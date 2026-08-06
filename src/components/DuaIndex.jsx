import { useState, useEffect } from "react";
import useDuaStore from "../store/useDuaStore";
import useIndexStore from "../store/useIndexStore";
import Category from "./Category";
import { FaX } from "react-icons/fa6";

const DuaIndex = () => {
    const { categoryId, setDuaGlobalId, duaGlobalId } = useDuaStore();
    const { isCategoryVisible, toggleCategory, toggleIndex } = useIndexStore();
    const [chapters, setChapters] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        let isMounted = true;
        const fetchChapters = async () => {
            try {
                let sql = "SELECT * FROM duanames";
                if (categoryId) {
                    sql += ` WHERE category = '${categoryId}'`;
                }
                sql += " ORDER BY dua_global_id ASC";
                const res = await window.tauriAPI.DBOperation(sql);
                if (isMounted) setChapters(res || []);
            } catch (err) {
                console.error("Failed to fetch chapters:", err);
            }
        };

        fetchChapters();
        return () => {
            isMounted = false;
        };
    }, [categoryId]);

    const filteredChapters = chapters.filter((chap) => {
        if (!searchTerm) return true;
        const term = searchTerm.toLowerCase();
        return (
            (chap.duaname && chap.duaname.toLowerCase().includes(term)) ||
            (chap.chapname && chap.chapname.toLowerCase().includes(term)) ||
            (chap.ID && chap.ID.includes(term))
        );
    });

    const handleSelectDua = (dua) => {
        setDuaGlobalId(dua.dua_global_id);
    };

    return (
        <div className="h-full w-full p-4 bg-white dark:bg-gray-800 border border-emerald-500/20 dark:border-gray-700 rounded-2xl shadow-sm flex flex-col overflow-hidden select-none">
            {/* Index Header Bar with Tabs */}
            <div className="flex justify-between items-center pb-3 mb-2 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 font-[AnekBangla]">
                    <button
                        className={`px-3 py-1 rounded-xl text-base font-bold transition-all cursor-pointer ${isCategoryVisible
                                ? "bg-emerald-600 text-white shadow-sm"
                                : "text-emerald-800 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-gray-700"
                            }`}
                        onClick={() => toggleCategory(true)}
                    >
                        বিষয়
                    </button>
                    <button
                        className={`px-3 py-1 rounded-xl text-base font-bold transition-all cursor-pointer ${!isCategoryVisible
                                ? "bg-emerald-600 text-white shadow-sm"
                                : "text-emerald-800 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-gray-700"
                            }`}
                        onClick={() => toggleCategory(false)}
                    >
                        অধ্যায়সূচী
                    </button>
                </div>

                <button
                    onClick={toggleIndex}
                    className="p-1.5 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-emerald-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                    title="বন্ধ করুন"
                >
                    <FaX className="text-sm text-gray-600 dark:text-gray-300" />
                </button>
            </div>

            {/* Tab Content */}
            {isCategoryVisible ? (
                <Category />
            ) : (
                <div className="flex-1 flex flex-col min-h-0">
                    <input
                        type="text"
                        placeholder="অধ্যায় ফিল্টার করুন..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-3 py-1.5 mb-2 rounded-lg border border-emerald-300 dark:border-gray-600 bg-white dark:bg-gray-900 font-[Kalpurush] text-sm outline-none focus:border-emerald-600"
                    />

                    <ul className="flex-1 overflow-y-scroll no-scrollbar pb-6 space-y-1">
                        {filteredChapters.length === 0 ? (
                            <div className="p-4 text-center text-gray-500 font-[Kalpurush]">কোনো অধ্যায় পাওয়া যায়নি</div>
                        ) : (
                            filteredChapters.map((chap) => {
                                const isSelected = duaGlobalId === chap.dua_global_id;
                                const displayName = chap.duaname || chap.chapname;
                                return (
                                    <li
                                        key={chap.dua_global_id}
                                        onClick={() => handleSelectDua(chap)}
                                        className={`p-2 rounded-xl transition-all duration-200 cursor-pointer ${isSelected
                                                ? "bg-emerald-600 text-white font-semibold shadow-sm"
                                                : "hover:bg-emerald-50 dark:hover:bg-gray-700/60 text-gray-800 dark:text-gray-200"
                                            }`}
                                    >
                                        <div className="flex font-[Kalpurush] items-baseline gap-2">
                                            {chap.ID && (
                                                <span className={`text-sm font-semibold ${isSelected ? "text-emerald-200" : "text-emerald-700 dark:text-emerald-400"}`}>
                                                    {chap.ID}.
                                                </span>
                                            )}
                                            <span className="text-base leading-snug">{displayName}</span>
                                        </div>
                                    </li>
                                );
                            })
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DuaIndex;
