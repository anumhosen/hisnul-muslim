import useIndexStore from "../store/useIndexStore";
import DuaIndex from "../components/DuaIndex";
import DuaList from "../components/DuaList";

const CategoryPage = () => {
    const { isIndexVisible } = useIndexStore();

    return (
        <div className="flex w-full justify-between h-full overflow-hidden">
            <div
                className={`${
                    isIndexVisible ? "block" : "hidden"
                } w-full md:w-1/4 md:py-4 md:ml-2 h-full transition-all duration-300`}
            >
                <DuaIndex />
            </div>

            <DuaList />
        </div>
    );
};

export default CategoryPage;
