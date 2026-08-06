import useDuaStore from "../store/useDuaStore";
import DuaCard from "../components/DuaCard";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";

const Bookmarks = () => {
    const { bookmarks } = useDuaStore();

    return (
        <div className="h-full w-full">
            <div className="h-full overflow-y-scroll p-2 sm:p-6 scrollbar-light" id="main">
                <h2 className="text-center font-[AnekBangla] font-bold text-2xl my-3 text-emerald-800 dark:text-emerald-300 flex items-center justify-center gap-2">
                    <FaBookmark className="text-emerald-600" />
                    <span>আপনার প্রিয় দু'আসমূহ ({bookmarks.length})</span>
                </h2>

                {bookmarks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-80 text-gray-500 text-center font-[Kalpurush]">
                        <FaRegBookmark className="text-5xl text-emerald-500 mb-3 opacity-60" />
                        <p className="text-xl font-bold text-gray-700 dark:text-gray-300">
                            কোনো বুকমার্ক করা দু'আ নেই
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                            পছন্দের দু'আসমূহে বুকমার্ক আইকনে ক্লিক করে সংরক্ষণ করুন
                        </p>
                    </div>
                ) : (
                    <div className="pb-10">
                        {bookmarks.map((b) => (
                            <DuaCard key={b.dua_global_id} detail={b} title={b.title || "বুকমার্ককৃত দু'আ"} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Bookmarks;
