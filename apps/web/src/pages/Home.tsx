import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import CategoriesFilter from "@src/components/common/CategoriesFilter";
import { categoriesSelector } from "@src/store/slices/categories";

import styles from "./Home.module.css";
import StoriesSection from "@src/components/Home/StoriesSection";


const HomePage = () => {

    const { } = useSelector(categoriesSelector);

    return (
        <>
            <CategoriesFilter />
            <main className={styles.home_page_layout}>
                {/* if user logged in then show your stories section */}

                <StoriesSection />
                <StoriesSection />
            </main>
        </>
    );
}

export default HomePage;