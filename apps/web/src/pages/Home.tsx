import CategoriesFilter from "@src/components/common/CategoriesFilter";
import { Outlet } from "react-router-dom";

const HomePage = () => {
    return (
        <>
            <CategoriesFilter />
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default HomePage;