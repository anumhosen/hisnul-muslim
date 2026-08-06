import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useDuaStore from "../store/useDuaStore";
import useIndexStore from "../store/useIndexStore";

const Home = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const setCategoryId = useDuaStore((s) => s.setCategoryId);
    const toggleCategory = useIndexStore((s) => s.toggleCategory);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const result = await window.tauriAPI.DBOperation("SELECT * FROM category ORDER BY id ASC");
                setCategories(result || []);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };
        fetchCategories();
    }, []);

    const handleCategoryClick = (catId) => {
        setCategoryId(catId);
        toggleCategory(false); // Switch left panel to chapters tab
        navigate("/category");
    };

    return (
        <div className="flex flex-col w-full h-full items-center overflow-y-scroll no-scrollbar p-4 sm:p-8 select-none">
            {/* Header Title Section */}
            <div className="text-center max-w-2xl mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold font-[AnekBangla] text-emerald-800 dark:text-emerald-400 mb-2">
                    হিসনুল মুসলিম
                </h1>
                <p className="text-md sm:text-lg font-[Kalpurush] text-gray-600 dark:text-gray-300">
                    কুরআন ও সুন্নাহ থেকে দৈনন্দিন জীবনের প্রয়োজনীয় সকল দু'আ ও জিকির
                </p>
            </div>

            {/* Grid of Categories using SVG icons */}
            {categories.length === 0 ? (
                <div className="w-full h-48 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
                    <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 w-full max-w-6xl">
                    {categories.map((cat) => (
                        <li
                            key={cat.id}
                            onClick={() => handleCategoryClick(cat.id)}
                            className="group flex flex-col items-center justify-center p-5 rounded-2xl bg-white dark:bg-gray-800 border border-emerald-500/20 dark:border-gray-700/80 shadow-md shadow-gray-200/50 dark:shadow-black/50 hover:shadow-xl hover:shadow-emerald-500/10 hover:border-emerald-500/50 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
                        >
                            <div className="w-14 h-14 sm:w-16 sm:h-16 p-3 mb-3 rounded-2xl bg-emerald-50 dark:bg-gray-700/60 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/40 transition-colors flex items-center justify-center">
                                <img
                                    alt={cat.name}
                                    className="w-full h-full object-contain"
                                    src={`/${cat.id}.svg`}
                                />
                            </div>
                            <div className="text-lg sm:text-xl font-[Kalpurush] font-semibold text-center text-gray-800 dark:text-gray-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                                {cat.name}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Home;
