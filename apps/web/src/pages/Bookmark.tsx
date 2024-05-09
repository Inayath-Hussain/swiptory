import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

import StoriesSection from "@src/components/Home/StoriesSection";
import { authTokenContext } from "@src/context/authTokens";
import { loginFormContext } from "@src/context/loginForm";
import useLoader from "@src/hooks/useLoader";
import { ApiError, UnauthorizedError } from "@src/services/errors";
import { getBookmarkStoriesService } from "@src/services/user/getBookmarkStories";
import { useGetUserBookmarksQuery } from "@src/store/apiSlice/bookmarkApi";
import { IStories } from "@src/store/apiSlice/storiesApi";

import styles from "./Bookmark.module.css";



const BookmarkPage = () => {

    const { isLoggedIn } = useContext(authTokenContext);
    const { showLoginForm } = useContext(loginFormContext);

    const { logout } = useContext(authTokenContext);
    const { data: userBookmarkIds } = useGetUserBookmarksQuery();

    const [stories, setStories] = useState<IStories[string]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useLoader([loading]);


    useEffect(() => {
        if (isLoggedIn === false) {
            showLoginForm()
            setError("Login to see your bookmarked stories")
        }
    }, [isLoggedIn])


    useEffect(() => {
        const call = async () => {
            setLoading(true);

            const result = await getBookmarkStoriesService();

            setLoading(false);

            switch (true) {
                case (result instanceof UnauthorizedError):
                    toast("please login again")
                    logout();
                    showLoginForm();
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