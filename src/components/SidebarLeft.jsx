import useSidebarStore from '../store/useSidebarStore';
import Navigation from './Navigation';

const SidebarLeft = () => {
    const activeSidebar = useSidebarStore((s) => s.activeSidebar);
    const isOpen = activeSidebar === 'left';

    return (
        <div
            className={`fixed top-11 bottom-0 w-full sm:w-80 transition-transform duration-300 z-20 ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            } bg-emerald-50 dark:bg-gray-900 text-black dark:text-white border-r border-emerald-500/20 dark:border-gray-800 shadow-xl overflow-y-scroll no-scrollbar select-none`}
        >
            <Navigation />
        </div>
    );
};

export default SidebarLeft;
