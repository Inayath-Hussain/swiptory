import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import CategoriesFilter from "@src/components/common/CategoriesFilter";
import StoriesSection from "@src/components/Home/StoriesSection";
import { getAllStoriesOfCategoy } from "@src/services/story/getAllStoriesOfCategory";
import { categoriesSelector } from "@src/store/slices/categories";
import { useGetStoriesQuery } from "@src/store/slices/storiesApi";
import { storiesQuerySelector } from "@src/store/slices/storiesQuery";

import styles from "./Home.module.css";


const HomePage = () => {

    const { categories } = useSelector(categoriesSelector);
    const { queryString, options } = useSelector(storiesQuerySelector);

    const { isFetching, data } = useGetStoriesQuery(queryString);


    const handleFetchAll = (category: string) => getAllStoriesOfCategoy(category);


    const selectedCategory = options.category ? { value: options.category, displayText: categories.find(c => c.name === options.category)?.displayText } : false

    const getHeaderText = (text: string) => `Top Stories from ${text}`

    return (
        <>
            <CategoriesFilter />
            <main className={styles.home_page_layout}>
                {
                    (isFetching === false && data) ?
                        // if a story is not filtered by category then display all category stories
                        selectedCategory === false ?
                            <>
                                {/* if user logged in then show your stories section */}

                                {categories.map(c => (
                                    <StoriesSection header={getHeaderText(c.displayText)} key={c.displayText}
                                        data={data[c.name]} category={c.name} fetchAll={() => handleFetchAll(c.name)} />
                                ))}

                            </>
                            :
                            // if story is filtered by category then display only that particular category story
                            <StoriesSection header={getHeaderText(selectedCategory.displayText as string)} key={selectedCategory.value}
                                data={data[selectedCategory.value]} category={selectedCategory.value} fetchAll={() => handleFetchAll(selectedCategory.value)} />
                        :
                        null
                }
            </main>
        </>
    );
}

export default HomePage;