import { useContext, useEffect, useState } from "react";

import StoriesSection from "@src/components/Home/StoriesSection";
import { authTokenContext } from "@src/context/authTokens";
import { ApiError, UnauthorizedError } from "@src/services/errors";
import { getBookmarkStoriesService } from "@src/services/user/getBookmarkStories";
import { useGetUserBookmarksQuery } from "@src/store/apiSlice/bookmarkApi";
import { IStories } from "@src/store/apiSlice/storiesApi";

import styles from "./Bookmark.module.css";



const BookmarkPage = () => {

    const { logout } = useContext(authTokenContext);
    const { data: userBookmarkIds } = useGetUserBookmarksQuery();

    const [stories, setStories] = useState<IStories[string]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    useEffect(() => {
        const call = async () => {
            setLoading(true);

            const result = await getBookmarkStoriesService();

            setLoading(false);

            switch (true) {
                case (result instanceof UnauthorizedError):
                    // please login again
                    logout();
                    setError("Please login again");
                    break;


                case (result instanceof ApiError):
                    setError(result.message);
                    break;


                default:
                    setError("");
                    setStories(result);
            }
        }


        call();


    }, [userBookmarkIds])



    return (
        <main className={styles.page_layout}>

            {
                error === "" ?
                    <StoriesSection category="Your Bookmarks" header="Your Bookmarks" data={stories} showMoreOption={false}
                        // @ts-ignore
                        fetchAll={() => { }}
                    />
                    :
                    <h1 className={styles.errorMessage}>{error}</h1>
            }

        </main>
    );
}

export default BookmarkPage;