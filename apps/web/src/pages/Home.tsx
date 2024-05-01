import { useContext } from "react";
import { useSelector } from "react-redux";

import CategoriesFilter from "@src/components/common/CategoriesFilter";
import StoriesSection from "@src/components/Home/StoriesSection";
import { authTokenContext } from "@src/context/authTokens";
import { userStoriesContext } from "@src/context/userStories";
import useDeviceWidth from "@src/hooks/useDeviceWidth";
import { getAllStoriesOfCategoy } from "@src/services/story/getAllStoriesOfCategory";
import { getUserStoriesService } from "@src/services/user/stories";
import { categoriesSelector } from "@src/store/slices/categories";
import { useGetStoriesQuery } from "@src/store/apiSlice/storiesApi";
import { storiesQuerySelector } from "@src/store/slices/storiesQuery";

import styles from "./Home.module.css";


const HomePage = () => {

    const { isDesktop } = useDeviceWidth();
    const { isLoggedIn } = useContext(authTokenContext);

    const { categories } = useSelector(categoriesSelector);
    const { queryString, options } = useSelector(storiesQuerySelector);

    const { isFetching, data } = useGetStoriesQuery(queryString);
    const { data: userStories } = useContext(userStoriesContext);


    const fetchAllFromCategory = (category: string) => getAllStoriesOfCategoy(category);

    const fetchAllUserStories = () => getUserStoriesService();

    const selectedCategory = options.category ? { value: options.category, displayText: categories.find(c => c.name === options.category)?.displayText } : false

    const getHeaderText = (text: string) => `Top Stories from ${text}`

    return (
        <>
            <CategoriesFilter />
            <main className={styles.home_page_layout}>

                {
                    // if authenticated show your stories section in devices whose width is atleast 768px
                    (isLoggedIn && isDesktop && userStories) ?
                        <StoriesSection header="Your Stories" userStory
                            data={[...userStories]} category="Your Stories" fetchAll={() => fetchAllUserStories()} />
                        :
                        null
                }


                {
                    (isFetching === false && data) ?
                        // if a story is not filtered by category then display all category stories
                        selectedCategory === false ?
                            <>


                                {categories.map(c => (
                                    <StoriesSection header={getHeaderText(c.displayText)} key={c.displayText}
                                        data={data[c.name]} category={c.name} fetchAll={() => fetchAllFromCategory(c.name)} />
                                ))}

                            </>
                            :
                            // if story is filtered by category then display only that particular category story
                            <StoriesSection header={getHeaderText(selectedCategory.displayText as string)} key={selectedCategory.value}
                                data={data[selectedCategory.value]} category={selectedCategory.value} fetchAll={() => fetchAllFromCategory(selectedCategory.value)} />
                        :
                        null
                }
            </main>
        </>
    );
}

export default HomePage;