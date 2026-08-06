import { FaUser, FaLocationDot, FaGraduationCap, FaAtom, FaPhone, FaEnvelope, FaFacebook, FaListCheck, FaGears, FaArrowUpRightFromSquare } from "react-icons/fa6";
import { FaReact } from "react-icons/fa";
import { SiVite, SiFreelancer } from "react-icons/si";

const About = () => {
    return (
        <div className="w-full h-full p-4 sm:p-8 overflow-y-scroll no-scrollbar font-[Kalpurush]">
            <div className="max-w-4xl mx-auto flex flex-col gap-6">
                {/* App Main Intro Card */}
                <div className="p-6 sm:p-8 border border-emerald-500/30 rounded-2xl shadow-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                    <div className="flex items-center gap-4 mb-4">
                        <img alt="Hisnul Muslim" className="w-16 h-16 object-contain" src="/icon.png" />
                        <div>
                            <h2 className="text-3xl font-bold font-[AnekBangla] text-emerald-800 dark:text-emerald-300">
                                হিসনুল মুসলিম ডেক্সটপ
                            </h2>
                            <p className="text-sm font-sans font-semibold text-emerald-600 dark:text-emerald-400">
                                Version 1.0.0 (Tauri v2 Desktop Edition)
                            </p>
                        </div>
                    </div>
                    <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                        <strong>হিসনুল মুসলিম</strong> কুরআন ও সুন্নাহ ভিত্তিক দৈনন্দিন জীবনের সকল দু'আ ও জিকির সম্বলিত একটি আধুনিক, দ্রুত এবং অত্যন্ত হালকা ডেক্সটপ অ্যাপ্লিকেশন।
                    </p>
                </div>

                {/* Features Card */}
                <div className="p-6 sm:p-8 border border-emerald-500/30 rounded-2xl shadow-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                    <h3 className="text-2xl font-bold font-[AnekBangla] text-emerald-800 dark:text-emerald-300 mb-4 flex items-center gap-2">
                        <FaListCheck className="text-emerald-600" />
                        <span>অ্যাপের মূল বৈশিষ্ট্যসমূহ (Features)</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base sm:text-lg">
                        <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-gray-700/50 border border-emerald-500/20 dark:border-gray-700">
                            <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">📖 বিশুদ্ধ দু'আ সংকলন</span>
                            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                                হিসনুল মুসলিমের সকল ক্যাটাগরি ও অধ্যায়ের প্রাত্যহিক দু'আ ও জিকির।
                            </p>
                        </div>
                        <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-gray-700/50 border border-emerald-500/20 dark:border-gray-700">
                            <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">🔤 শব্দে শব্দে অর্থ (Word-by-Word)</span>
                            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                                আরবি প্রতিটি শব্দ সমূহের সরাসরি পৃথক বাংলা অনুবাদ দেখার ইন্টারঅ্যাক্টিভ ব্যবস্থা।
                            </p>
                        </div>
                        <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-gray-700/50 border border-emerald-500/20 dark:border-gray-700">
                            <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">🔍 তাৎক্ষণিক লাইভ সার্চ</span>
                            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                                আরবি পাঠ, উচ্চারণ, অনুবাদ এবং জিকিরের নাম দিয়ে সরাসরি অনুসন্ধানের সুবিধা।
                            </p>
                        </div>
                        <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-gray-700/50 border border-emerald-500/20 dark:border-gray-700">
                            <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">🔖 বুকমার্ক ও প্রিয় দু'আ</span>
                            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                                প্রয়োজনীয় দু'আসমূহে ক্লিক করে পৃথক প্রিয় তালিকায় সংরক্ষণের সুবিধা।
                            </p>
                        </div>
                        <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-gray-700/50 border border-emerald-500/20 dark:border-gray-700">
                            <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">📋 এক-ক্লিক কপি</span>
                            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                                সম্পূর্ণ দু'আর আরবি, উচ্চারণ, অর্থ ও রেফারেন্স সহজে অনুলিপি (Copy) করার সুবিধা।
                            </p>
                        </div>
                        <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-gray-700/50 border border-emerald-500/20 dark:border-gray-700">
                            <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">⚙️ ফন্ট সাইজ ও ডিসপ্লে অপশন</span>
                            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                                স্বাধীনভাবে আরবি ও বাংলা ফন্ট সাইজ পরিবর্তন এবং বিষয়সমূহ প্রদর্শনের পছন্দ।
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tech Specs Card */}
                <div className="p-6 sm:p-8 border border-emerald-500/30 rounded-2xl shadow-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                    <h3 className="text-2xl font-bold font-[AnekBangla] text-emerald-800 dark:text-emerald-300 mb-4 flex items-center gap-2">
                        <FaGears className="text-emerald-600" />
                        <span>স্পেসিফিকেশন ও প্রযুক্তি (Specifications)</span>
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center mb-6">
                        <div className="p-3 border border-emerald-500/20 dark:border-gray-700 rounded-xl bg-emerald-50/40 dark:bg-gray-700/40">
                            <span className="font-bold text-amber-600 block text-lg">🦀 Rust</span>
                            <span className="text-xs text-gray-600 dark:text-gray-400">Tauri v2 Native</span>
                        </div>
                        <div className="p-3 border border-emerald-500/20 dark:border-gray-700 rounded-xl bg-emerald-50/40 dark:bg-gray-700/40">
                            <FaReact className="text-cyan-500 text-xl mx-auto mb-1" />
                            <span className="text-xs text-gray-600 dark:text-gray-400">React 19 Frontend</span>
                        </div>
                        <div className="p-3 border border-emerald-500/20 dark:border-gray-700 rounded-xl bg-emerald-50/40 dark:bg-gray-700/40">
                            <SiVite className="text-purple-500 text-xl mx-auto mb-1" />
                            <span className="text-xs text-gray-600 dark:text-gray-400">Vite 7 Bundler</span>
                        </div>
                        <div className="p-3 border border-emerald-500/20 dark:border-gray-700 rounded-xl bg-emerald-50/40 dark:bg-gray-700/40">
                            <span className="font-bold text-emerald-700 dark:text-emerald-400 block text-lg">🗄️ SQLite</span>
                            <span className="text-xs text-gray-600 dark:text-gray-400">100% Offline DB</span>
                        </div>
                    </div>
                    <div className="space-y-2 text-md font-[Kalpurush]">
                        <p>• <strong>র‍্যাম ব্যবহার:</strong> অত্যন্ত হালকা (কমবেশি ৩০-৪০ মেগাবাইট)</p>
                        <p>• <strong>নেটওয়ার্ক:</strong> সম্পূর্ণ ইন্টারনেটবিহীন ১০০% অফলাইন ব্যাকএন্ড</p>
                        <p>• <strong>সমর্থিত ওএস:</strong> Windows, macOS এবং Linux ডেক্সটপ</p>
                    </div>
                </div>

                {/* Developer Info Card */}
                <div className="p-6 sm:p-8 border border-emerald-500/30 rounded-2xl shadow-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                    <h3 className="text-2xl font-bold font-[AnekBangla] text-emerald-800 dark:text-emerald-300 mb-4">
                        Developer Info
                    </h3>
                    <div className="space-y-2 text-lg">
                        <p className="flex items-center gap-3">
                            <FaUser className="text-emerald-600" />
                            <span>Anum Hosen Shawon</span>
                        </p>
                        <p className="flex items-center gap-3">
                            <FaLocationDot className="text-emerald-600" />
                            <span>Satkhira, Khulna, Bangladesh</span>
                        </p>
                        <p className="flex items-center gap-3">
                            <FaGraduationCap className="text-emerald-600" />
                            <span>Jashore University of Science and Technology</span>
                        </p>
                        <p className="flex items-center gap-3">
                            <FaAtom className="text-emerald-600" />
                            <span>Dept. of Physics</span>
                        </p>
                    </div>
                </div>

                {/* Developer Contact Card */}
                <div className="p-6 sm:p-8 border border-emerald-500/30 rounded-2xl shadow-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                    <h3 className="text-2xl font-bold font-[AnekBangla] text-emerald-800 dark:text-emerald-300 mb-4">
                        Developer Contact
                    </h3>
                    <div className="space-y-2 text-lg">
                        <p className="flex items-center gap-3">
                            <FaPhone className="text-emerald-600" />
                            <span>+880 15212 42061</span>
                        </p>
                        <p className="flex items-center gap-3">
                            <FaEnvelope className="text-emerald-600" />
                            <span>anumhosen@gmail.com</span>
                        </p>
                        <p className="flex items-center gap-3">
                            <FaFacebook className="text-emerald-600" />
                            <a
                                href="https://www.facebook.com/anumhosen80/"
                                target="_blank"
                                rel="noreferrer"
                                className="text-emerald-700 dark:text-emerald-400 hover:underline"
                            >
                                Anum Hosen Shawon
                            </a>
                        </p>
                        <p className="flex items-center gap-3">
                            <SiFreelancer className="text-emerald-600" />
                            <a
                                href="https://www.freelancer.com/u/anumhosen"
                                target="_blank"
                                rel="noreferrer"
                                className="text-emerald-700 dark:text-emerald-400 hover:underline"
                            >
                                @anumhosen
                            </a>
                        </p>
                    </div>
                </div>

                {/* Reference & Acknowledgements Card */}
                <div className="p-6 sm:p-8 border border-emerald-500/30 rounded-2xl shadow-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                    <h3 className="text-2xl font-bold font-[AnekBangla] text-emerald-800 dark:text-emerald-300 mb-3">
                        Reference & Acknowledgements
                    </h3>
                    <p className="text-lg leading-relaxed">
                        This application utilizes resource content and database structure from the{" "}
                        <strong>Hisnul Muslim</strong> app by
                        <a
                            href="https://dua.gtaf.org/"
                            className="inline-flex items-center gap-1 mx-1.5 px-2 py-0.5 rounded-lg border border-emerald-500/40 text-emerald-700 dark:text-emerald-400 font-bold hover:bg-emerald-50 dark:hover:bg-gray-700 transition-colors"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <span>Greentech Apps Foundation</span>
                            <FaArrowUpRightFromSquare className="text-xs" />
                        </a>
                        . Special thanks for their dedicated Islamic publication work.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
