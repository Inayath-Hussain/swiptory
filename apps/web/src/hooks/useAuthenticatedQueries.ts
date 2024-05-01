import { authTokenContext } from "@src/context/authTokens";
import { useGetUserBookmarksQuery } from "@src/store/apiSlice/bookmarkApi";
import { useGetUserLikedStoriesQuery } from "@src/store/apiSlice/userLikedStoriesApi";
import { defaultUserStoriesQueryString, useGetUserStoriesQuery } from "@src/store/apiSlice/userStoriesApi";
import { useContext, useEffect } from "react";
import useLoader from "./useLoader";


/**
 * fetch user data using rtk query when authenticated
 */
const useAuthenticatedQueries = () => {
    const { isLoggedIn } = useContext(authTokenContext);

    const skip = isLoggedIn === false;

    const { refetch: refetchUserStories, isFetching: userStoriesLoading } = useGetUserStoriesQuery(defaultUserStoriesQueryString, { skip });

    const { refetch: refetchUserLikedStories, isFetching: userLikedStoriesLoading } = useGetUserLikedStoriesQuery(undefined, { skip });

    const { refetch: refetchUserBookmarks, isFetching: userBookmarksLoading } = useGetUserBookmarksQuery(undefined, { skip });


    useLoader([userStoriesLoading, userLikedStoriesLoading, userBookmarksLoading]);

    useEffect(() => {

        if (isLoggedIn) {
            refetchUserStories();
            refetchUserLikedStories();
            refetchUserBookmarks();
        };

    }, [isLoggedIn])
}

export default useAuthenticatedQueries;