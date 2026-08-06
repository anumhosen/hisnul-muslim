import { FaBook, FaLeaf } from "react-icons/fa6";

const Books = () => {
    return (
        <div className="w-full h-full overflow-y-auto p-4 sm:p-8 font-[Kalpurush] select-none">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Main Intro Card */}
                <div className="bg-white/90 dark:bg-gray-800/90 border border-emerald-200 dark:border-gray-700 rounded-2xl shadow-sm p-6 sm:p-8 space-y-6">
                    <div className="flex items-center gap-3">
                        <FaBook className="text-3xl text-emerald-700 dark:text-emerald-400" />
                        <h1 className="text-2xl sm:text-3xl font-bold font-[AnekBangla] text-emerald-800 dark:text-emerald-300">
                            হিসনুল মুসলিম (Fortress of the Muslim)
                        </h1>
                    </div>

                    <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-200">
                        <strong>হিসনুল মুসলিম</strong> (রাসূলুল্লাহ সাল্লাল্লাহু আলাইহি ওয়া সাল্লামের জিকির ও দু'আ সম্বলিত দুর্গ) একটি বিখ্যাত দু'আ সংকলন গ্রন্থ। এতে কুরআন ও সহীহ হাদীস থেকে সংগৃহীত প্রাত্যহিক জীবনের প্রয়োজনীয় সকল দু'আ ও জিকির বিন্যস্ত রয়েছে।
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-gray-900/60 border border-emerald-200/80 dark:border-gray-700">
                            <h3 className="font-bold text-emerald-800 dark:text-emerald-400 text-lg mb-1">
                                মূল সংকলক:
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 text-base">
                                শেখ সা'ঈদ ইবনে আলী ইবনে ওয়াহফ আল-কাহতানী (রহ.)
                            </p>
                        </div>

                        <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-gray-900/60 border border-emerald-200/80 dark:border-gray-700">
                            <h3 className="font-bold text-emerald-800 dark:text-emerald-400 text-lg mb-1">
                                বিষয়বস্তু:
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 text-base">
                                কুরআন ও বিশুদ্ধ হাদীস ভিত্তিক দু'আ ও জিকির
                            </p>
                        </div>
                    </div>
                </div>

                {/* Features Card */}
                <div className="bg-white/90 dark:bg-gray-800/90 border border-emerald-200 dark:border-gray-700 rounded-2xl shadow-sm p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-4">
                        <FaLeaf className="text-2xl text-emerald-700 dark:text-emerald-400" />
                        <h2 className="text-2xl font-bold font-[AnekBangla] text-emerald-800 dark:text-emerald-300">
                            বৈশিষ্ট্যসমূহ
                        </h2>
                    </div>

                    <ul className="list-disc list-inside space-y-3 text-lg text-gray-800 dark:text-gray-200 leading-relaxed pl-2">
                        <li>কুরআন ও সুন্নাহ থেকে বিশুদ্ধ দু'আ সংকলন</li>
                        <li>আরবি পাঠ, সঠিক বাংলা উচ্চারণ (transliteration) এবং স্পষ্ট অর্থ</li>
                        <li>প্রত্যেক দু'আর জন্য হাদীস ও কুরআন থেকে রেফারেন্স</li>
                        <li>সহজ ও দ্রুত বিষয়ভিত্তিক এবং অধ্যায়ভিত্তিক অনুসন্ধান সুবিধা</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Books;
