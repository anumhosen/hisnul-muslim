import { MemoryRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SidebarLeft from "./components/SidebarLeft";
import SidebarRight from "./components/SidebarRight";
import Home from "./pages/Home";
import About from "./pages/About";
import Main from "./pages/Main";
import Search from "./pages/Search";
import Books from "./pages/Books";
import CategoryPage from "./pages/CategoryPage";
import Bookmarks from "./pages/Bookmarks";
import "./App.css";

function App() {
    return (
        <MemoryRouter>
            <div className="h-screen flex flex-col bg-emerald-50/50 dark:bg-gray-900 text-black dark:text-gray-200 transition-colors duration-300">
                <Navbar />
                <div className="flex flex-1 justify-between overflow-hidden relative">
                    <SidebarLeft />
                    <div className="flex w-full justify-center flex-1 overflow-hidden">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/main" element={<Main />} />
                            <Route path="/search" element={<Search />} />
                            <Route path="/category" element={<CategoryPage />} />
                            <Route path="/books" element={<Books />} />
                            <Route path="/bookmarks" element={<Bookmarks />} />
                        </Routes>
                    </div>
                    <SidebarRight />
                </div>
            </div>
        </MemoryRouter>
    );
}

export default App;
