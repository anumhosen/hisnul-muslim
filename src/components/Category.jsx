import { useState, useEffect } from "react";
import useDuaStore from "../store/useDuaStore";
import useIndexStore from "../store/useIndexStore";
import {numberToBangla} from "../utils/numberToBangla";

const Category = () => {
    const [categories, setCategories] = useState([]);
    const categoryId = useDuaStore((s) => s.categoryId);
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

    const handleClick = (category) => {
        setCategoryId(category.id);
        toggleCategory(false); // Switch tab to Dua chapters view
    };

    return (
        <div className="h-full font-[Kalpurush]">
            {categories.length === 0 ? (
                <div className="p-4 text-gray-500">লোডিং...</div>
            ) : (
                <ul className="overflow-y-auto max-h-[calc(100vh-180px)] pr-1 space-y-1 no-scrollbar">
                    {categories.map((cat) => {
                        const isSelected = categoryId === cat.id;
                        return (
                            <li
                                key={cat.id}
                                className={`px-3 py-2 rounded-lg cursor-pointer transition-all text-lg flex items-center ${isSelected
                                    ? "bg-emerald-600 text-white font-bold shadow-sm"
                                    : "hover:bg-emerald-50 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200"
                                    }`}
                                onClick={() => handleClick(cat)}
                            >
                                <span className="mr-2 text-base font-sans">{numberToBangla(cat.id)}.</span>
                                <span>{cat.name}</span>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default Category;
