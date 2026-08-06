import { useState, useEffect } from "react";
import useDuaStore from "../store/useDuaStore";
import useIndexStore from "../store/useIndexStore";
import DuaCard from "./DuaCard";
import { FaListUl } from "react-icons/fa6";

const DuaList = () => {
    const { duaGlobalId } = useDuaStore();
    const { isIndexVisible, toggleIndex } = useIndexStore();
    const [duaInfo, setDuaInfo] = useState(null);
    const [details, setDetails] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const fetchDua = async () => {
            if (!duaGlobalId) return;
            setLoading(true);
            try {
                // Fetch dua metadata from duanames
                const nameRes = await window.tauriAPI.DBOperation(
                    `SELECT * FROM duanames WHERE dua_global_id = ${duaGlobalId} LIMIT 1`
                );

                // Fetch details from duadetails
                const detailRes = await window.tauriAPI.DBOperation(
                    `SELECT * FROM duadetails WHERE dua_global_id = ${duaGlobalId} ORDER BY dua_segment_id ASC`
                );

                if (isMounted) {
                    setDuaInfo(nameRes && nameRes.length > 0 ? nameRes[0] : null);
                    setDetails(detailRes || []);
                }
            } catch (err) {
                console.error("Failed to fetch dua details:", err);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchDua();
        return () => {
            isMounted = false;
        };
    }, [duaGlobalId]);

    const title = duaInfo ? (duaInfo.duaname || duaInfo.chapname) : "দু'আ";

    return (
        <div className="block md:block flex-1 h-full overflow-hidden relative">
            {!isIndexVisible && (
                <button
                    onClick={toggleIndex}
                    className="fixed p-2.5 m-2 bg-emerald-600 text-white hover:bg-emerald-700 rounded-full shadow-md z-10 block"
                    title="অধ্যায় তালিকা"
                >
                    <FaListUl />
                </button>
            )}

            <div className="h-full w-full">
                <div className="h-full overflow-y-scroll p-2 sm:p-4 scrollbar-light" id="main">
                    <div className="text-center font-[AnekBangla] font-bold text-2xl my-3 text-emerald-800 dark:text-emerald-300">
                        {title}
                    </div>

                    {loading ? (
                        <div className="w-full h-64 flex justify-center items-center text-lg text-emerald-700 dark:text-emerald-400 gap-3">
                            <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                            <span>দু'আ লোড হচ্ছে...</span>
                        </div>
                    ) : details.length === 0 ? (
                        <div className="w-full h-64 flex justify-center items-center text-lg text-gray-500">
                            কোনো তথ্য পাওয়া যায়নি।
                        </div>
                    ) : (
                        <div className="pb-10">
                            {details.map((detail, idx) => (
                                <DuaCard
                                    key={detail.dua_segment_id || idx}
                                    detail={detail}
                                    title={detail.dua_segment_id && details.length > 1 ? `${title} (${detail.dua_segment_id})` : title}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DuaList;
