import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useBookStore from "../store/useBookStore";
import useIndexStore from "../store/useIndexStore";

const Subcategory = () => {
    const [subcategories, setSubcategories] = useState([]);
    const { categoryId } = useBookStore();
    const setSubcategoryId = useBookStore((s) => s.setSubcategoryId);
    const navigate = useNavigate();
    const toggleIndex = useIndexStore((s) => s.toggleIndex);

    useEffect(() => {
        const fetchSubcategory = async () => {
            try {
                const result = await window.tauriAPI.DBOperation(
                    `SELECT * FROM subcategories WHERE category_id = ${categoryId}`
                );
                setSubcategories(result);
                setSubcategoryId(result[0].id);
            } catch (error) {
                console.error("Failed to fetch subcategory:", error);
                navigate("/");
            }
        };
        if (categoryId) {
            fetchSubcategory();
        }
    }, [categoryId]);

    const handleClick = (subcategory) => {
        setSubcategoryId(subcategory.id);
        toggleIndex();
        scrollToTop();
    };
    const scrollToTop = () => {
        document.getElementById("main").scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    return (
        <div className="h-full">
            {subcategories.length == 0 ? (
                <></>
            ) : (
                <ul className="h-sub overflow-y-scroll no-scrollbar">
                    {subcategories.map((subcategory, index) => (
                        <li
                            key={index}
                            className=" border-b border-b-gray-300 dark:border-b-gray-700 py-1 last:border-0 cursor-pointer"
                            onClick={() => handleClick(subcategory)}
                        >
                            <div className=" font-[Kalpurush] hover:translate-x-3 hover:text-orange-500 transition-all duration-300">
                                <span className="text-sm">{index + 1}.</span>
                                <span className="ml-1 text-lg">{subcategory.title}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Subcategory;
