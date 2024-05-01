import { useContext, useEffect } from "react";

import StoriesSection from "@src/components/Home/StoriesSection";
import { authTokenContext } from "@src/context/authTokens";
import { getUserStoriesService } from "@src/services/user/stories";
import { defaultUserStoriesQueryString, useGetUserStoriesQuery } from "@src/store/apiSlice/userStoriesApi";

import styles from "./YourStories.module.css";


/**
 * your stories section for devices whose width is less than 768px.
 */
const YourStoriesPage = () => {

    const { isLoggedIn } = useContext(authTokenContext);
    const { data } = useGetUserStoriesQuery(defaultUserStoriesQueryString);

    useEffect(() => {
        // open authentication modal
    }, [isLoggedIn])

    const fetchAllUserStories = () => getUserStoriesService();

    return (
        <main className={styles.page_layout}>

            {
                isLoggedIn === false ?
                    <h1 className={styles.errorMessage}>Login to get your stories</h1>
                    :
                    null
            }

            {/* if authenticated show your stories section in devices whose width is atleast 768px */}
            {(isLoggedIn && data) ?
                <StoriesSection header="Your Stories" userStory
                    data={[...data]} category="Your Stories" fetchAll={() => fetchAllUserStories()} />
                :
                null}

        </main>
    );
}

export default YourStoriesPage;