import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSidebarStore from '../store/useSidebarStore';
import useThemeStore from '../store/useThemeStore';
import useDuaStore from '../store/useDuaStore';
import { FaBars, FaGear, FaSun, FaMoon, FaMagnifyingGlass } from 'react-icons/fa6';
import {
    VscChromeMinimize,
    VscChromeMaximize,
    VscChromeRestore,
    VscChromeClose,
} from 'react-icons/vsc';

const Navbar = () => {
    const toggleLeft = useSidebarStore((s) => s.toggleLeft);
    const toggleRight = useSidebarStore((s) => s.toggleRight);
    const { theme, toggleTheme, initializeTheme } = useThemeStore();
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');
    const setSearchInput = useDuaStore((s) => s.setSearchInput);
    const [isMaximized, setIsMaximized] = useState(false);

    useEffect(() => {
        const cleanup = window.tauriAPI?.onMaximizeChange?.(setIsMaximized);
        return () => {
            if (typeof cleanup === 'function') cleanup();
        };
    }, []);

    useEffect(() => {
        initializeTheme();
    }, [initializeTheme]);

    const handleClick = () => {
        if (inputValue.trim().length < 2) {
            alert('কমপক্ষে দুই বা তার অধিক অক্ষর দিয়ে অনুসন্ধান করুন।');
        } else {
            setSearchInput(inputValue.trim());
            navigate('/search');
        }
    };

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleClick();
        }
    };

    const handleFullScreen = () => {
        window.tauriAPI.maximize();
    };

    return (
        <div
            data-tauri-drag-region
            className="flex h-11 justify-between items-center px-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-emerald-500/20 dark:border-gray-800 shadow-sm select-none z-30"
            style={{ WebkitAppRegion: 'drag' }}
        >
            <div
                className="flex items-center gap-3"
                style={{ WebkitAppRegion: 'no-drag' }}
            >
                <button
                    onClick={toggleLeft}
                    className="p-1.5 rounded-lg text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                    title="মেনু"
                >
                    <FaBars className="text-lg" />
                </button>
                <span
                    className="flex items-center gap-2 font-bold font-[AnekBangla] text-xl italic cursor-pointer text-emerald-800 dark:text-emerald-300 hover:opacity-90 transition-opacity"
                    onClick={() => navigate('/')}
                >
                    <img alt="হিসনুল মুসলিম" className="w-7 h-7" src="/icon.png" />
                    <span className="hidden sm:inline-block">হিসনুল মুসলিম</span>
                </span>
            </div>

            <div
                className="flex items-center bg-emerald-50/80 dark:bg-gray-800/80 border border-emerald-500/30 dark:border-gray-700 rounded-full px-3 py-1 w-48 sm:w-72 focus-within:border-emerald-600 transition-colors"
                style={{ WebkitAppRegion: 'no-drag' }}
            >
                <input
                    placeholder="দু'আ অনুসন্ধান করুন..."
                    className="w-full bg-transparent outline-none font-[Kalpurush] text-sm sm:text-base text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
                <button
                    onClick={handleClick}
                    className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-200 cursor-pointer pl-1"
                    title="অনুসন্ধান"
                >
                    <FaMagnifyingGlass className="text-sm sm:text-base" />
                </button>
            </div>

            <div
                className="flex items-center gap-1 sm:gap-2"
                style={{ WebkitAppRegion: 'no-drag' }}
            >
                <button
                    onClick={toggleTheme}
                    className="p-1.5 rounded-lg text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-gray-800 transition-colors cursor-pointer text-base sm:text-lg"
                    title={theme === 'dark' ? 'লাইট মোড' : 'ডার্ক মোড'}
                >
                    {theme === 'dark' ? <FaSun /> : <FaMoon />}
                </button>

                <button
                    onClick={toggleRight}
                    className="p-1.5 rounded-lg text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-gray-800 transition-colors cursor-pointer text-base sm:text-lg"
                    title="সেটিংস"
                >
                    <FaGear />
                </button>

                <div className="flex items-center ml-1 -mr-2.5 border-l border-emerald-500/20 dark:border-gray-800 pl-1">
                    <button
                        onClick={() => window.tauriAPI.minimize()}
                        className="w-9 h-8 flex justify-center items-center text-gray-700 dark:text-gray-200 hover:bg-emerald-100 dark:hover:bg-gray-800 transition-colors rounded-lg cursor-pointer"
                        title="মিনিমাইজ"
                    >
                        <VscChromeMinimize className="text-base" />
                    </button>
                    <button
                        onClick={handleFullScreen}
                        className="w-9 h-8 flex justify-center items-center text-gray-700 dark:text-gray-200 hover:bg-emerald-100 dark:hover:bg-gray-800 transition-colors rounded-lg cursor-pointer"
                        title="ম্যাক্সিমাইজ"
                    >
                        {isMaximized ? <VscChromeRestore className="text-base" /> : <VscChromeMaximize className="text-base" />}
                    </button>
                    <button
                        onClick={() => window.tauriAPI.close()}
                        className="w-9 h-8 flex justify-center items-center text-gray-700 dark:text-gray-200 hover:bg-red-500 hover:text-white transition-colors rounded-lg cursor-pointer"
                        title="বন্ধ করুন"
                    >
                        <VscChromeClose className="text-lg" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
