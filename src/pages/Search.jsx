import { useState, useEffect } from "react";
import useDuaStore from "../store/useDuaStore";
import DuaCard from "../components/DuaCard";
import { FaMagnifyingGlass, FaFilter } from "react-icons/fa6";
import { numberToBangla } from "../utils/numberToBangla";

const Search = () => {
    const { searchInput, setSearchInput } = useDuaStore();
    const [categories, setCategories] = useState([]);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [localQuery, setLocalQuery] = useState(searchInput || "");
    const [selectedCategory, setSelectedCategory] = useState("all");

    // Fetch categories for filter dropdown
    useEffect(() => {
        const fetchCats = async () => {
            try {
                const res = await window.tauriAPI.DBOperation("SELECT * FROM category ORDER BY id ASC");
                setCategories(res || []);
            } catch (err) {
                console.error("Failed to fetch categories:", err);
            }
        };
        fetchCats();
    }, []);

    // Sync local query when store search input changes
    useEffect(() => {
        setLocalQuery(searchInput || "");
    }, [searchInput]);

    // Execute Search
    useEffect(() => {
        const executeSearch = async () => {
            const queryText = searchInput ? searchInput.trim() : "";
            if (!queryText || queryText.length < 2) {
                setResults([]);
                setHasSearched(false);
                return;
            }

            setLoading(true);
            setHasSearched(true);

            try {
                const sanitize = (str) => str.replace(/'/g, "''");
                const cleanQuery = sanitize(queryText);

                let whereClause = `(
                    d.translations LIKE '%${cleanQuery}%' OR 
                    d.transliteration LIKE '%${cleanQuery}%' OR 
                    d.arabic LIKE '%${cleanQuery}%' OR 
                    n.duaname LIKE '%${cleanQuery}%' OR 
                    n.chapname LIKE '%${cleanQuery}%' OR 
                    n.tags LIKE '%${cleanQuery}%' OR 
                    d.reference LIKE '%${cleanQuery}%'
                )`;

                if (selectedCategory !== "all") {
                    whereClause += ` AND n.category = '${selectedCategory}'`;
                }

                const sql = `
                    SELECT d.*, n.duaname, n.chapname, n.ID as dua_code 
                    FROM duadetails d 
                    JOIN duanames n ON d.dua_global_id = n.dua_global_id 
                    WHERE ${whereClause} 
                    LIMIT 200
                `;

                const res = await window.tauriAPI.DBOperation(sql);
                setResults(res || []);
            } catch (err) {
                console.error("Search query failed:", err);
                setResults([]);
            } finally {
                setLoading(false);
            }
        };

        executeSearch();
    }, [searchInput, selectedCategory]);

    const handleSearchSubmit = (e) => {
        if (e) e.preventDefault();
        if (localQuery.trim().length < 2) {
            alert("কমপক্ষে দুই বা তার অধিক অক্ষর দিয়ে অনুসন্ধান করুন।");
            return;
        }
        setSearchInput(localQuery.trim());
    };

    return (
        <div className="h-full flex flex-col w-full overflow-hidden font-[Kalpurush] select-none">
            {/* Filter Bar */}
            <div className="p-3 sm:px-8 bg-emerald-50/80 dark:bg-gray-800/80 border-b border-emerald-200 dark:border-gray-700 flex flex-wrap items-center justify-between gap-3">
                <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 flex-1 max-w-xl">
                    <div className="relative flex-1 flex items-center">
                        <input
                            type="text"
                            placeholder="দু'আর নাম, বাংলা অনুবাদ, উচ্চারণ বা আরবি অনুসন্ধান করুন..."
                            className="w-full h-9 pl-4 pr-10 rounded-full border border-emerald-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-lg outline-none focus:border-emerald-600"
                            value={localQuery}
                            onChange={(e) => setLocalQuery(e.target.value)}
                        />
                        <button type="submit" className="absolute right-3 text-emerald-600 dark:text-emerald-400 cursor-pointer">
                            <FaMagnifyingGlass className="text-lg" />
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="h-9 px-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold text-base transition-colors cursor-pointer shadow-sm"
                    >
                        সন্ধান করুন
                    </button>
                </form>

                {/* Filter Dropdown */}
                <div className="flex items-center gap-2 text-base">
                    <FaFilter className="text-emerald-600 dark:text-emerald-400 text-base" />
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="h-9 px-3 rounded-full border border-emerald-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-base outline-none cursor-pointer"
                    >
                        <option value="all">সকল বিষয়</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Search Results Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8">
                {loading ? (
                    <div className="w-full h-64 flex flex-col justify-center items-center gap-3 text-xl text-emerald-700 dark:text-emerald-400">
                        <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                        <p>দু'আ অনুসন্ধান করা হচ্ছে...</p>
                    </div>
                ) : !hasSearched ? (
                    <div className="w-full h-64 flex flex-col justify-center items-center gap-2 text-xl text-gray-500">
                        <FaMagnifyingGlass className="text-4xl mb-2 text-emerald-500" />
                        <p>অনুসন্ধান করার জন্য অনুসন্ধানের বক্সে শব্দ লিখে সার্চ করুন।</p>
                    </div>
                ) : results.length === 0 ? (
                    <div className="w-full h-64 flex flex-col justify-center items-center gap-2 text-xl text-gray-500">
                        <p className="text-2xl text-red-500 font-bold">কোনো দু'আ পাওয়া যায়নি!</p>
                        <p className="text-lg">"{searchInput}" দিয়ে কোনো দু'আ খুঁজে পাওয়া যায়নি। অন্য শব্দ দিয়ে চেষ্টা করুন।</p>
                    </div>
                ) : (
                    <div className="max-w-4xl mx-auto space-y-6">
                        <h2 className="text-center font-bold text-xl text-emerald-800 dark:text-emerald-300 pb-2">
                            সর্বমোট {numberToBangla(results.length)} টি দু'আ পাওয়া গিয়েছে
                        </h2>

                        {results.map((res, idx) => (
                            <DuaCard
                                key={res.dua_segment_id || idx}
                                detail={res}
                                title={res.duaname || res.chapname || "দু'আ"}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;
