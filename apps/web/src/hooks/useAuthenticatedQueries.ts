import { authTokenContext } from "@src/context/authTokens";
import { useGetUserLikedStoriesQuery } from "@src/store/apiSlice/userLikedStoriesApi";
import { defaultUserStoriesQueryString, useGetUserStoriesQuery } from "@src/store/apiSlice/userStoriesApi";
import { useContext, useEffect } from "react";


/**
 * fetch user data using rtk query when authenticated
 */
const useAuthenticatedQueries = () => {
    const { isLoggedIn } = useContext(authTokenContext);

    const skip = isLoggedIn === false;

    const { refetch: refetchUserStories } = useGetUserStoriesQuery(defaultUserStoriesQueryString, { skip });

    const { refetch: refetchUserLikedStories } = useGetUserLikedStoriesQuery(undefined, { skip });

    useEffect(() => {

        if (isLoggedIn) {
            refetchUserStories();
            refetchUserLikedStories();
        };

    }, [isLoggedIn])
}

export default useAuthenticatedQueries;