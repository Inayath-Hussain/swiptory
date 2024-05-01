import { useContext, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import LikeIcon from "@src/components/Icons/Like";
import { authTokenContext } from "@src/context/authTokens";
import { ApiError, CanceledError, UnauthorizedError } from "@src/services/errors";
import { AppDispatch } from "@src/store";
import { updateLike } from "@src/store/apiSlice/storiesApi";
import { useGetUserLikedStoriesQuery, useLikeStoryMutation, useUnlikeStoryMutation } from "@src/store/apiSlice/userLikedStoriesApi";
import { storiesQuerySelector } from "@src/store/slices/storiesQuery";

import styles from "./LikeButton.module.css";
import { defaultUserStoriesQueryString, updateUserStoriesLike } from "@src/store/apiSlice/userStoriesApi";



interface Iprops {
    likes: number
    category: string
    story_id: string

    showLoginForm: () => void
}

const LikeButton: React.FC<Iprops> = ({ category, story_id, likes, showLoginForm }) => {

    const dispatch = useDispatch<AppDispatch>();
    const { queryString } = useSelector(storiesQuerySelector);

    const { isLoggedIn } = useContext(authTokenContext);

    const [likeStory, { isLoading: likeStoryLoading }] = useLikeStoryMutation();
    const [unlikeStory, { isLoading: unlikeStoryLoading }] = useUnlikeStoryMutation();



    const { data: userLikedStories } = useGetUserLikedStoriesQuery(undefined, { skip: isLoggedIn === false });


    const checkLikedByUser = () => {
        if (isLoggedIn === false || !userLikedStories) return false;

        return userLikedStories.includes(story_id)
    }

    const isLikedByUser = useMemo(checkLikedByUser, [isLoggedIn, userLikedStories]);




    const handleLikeChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();

        if (isLoggedIn === false) {
            showLoginForm();
            return
        }


        const onSuccess = (type: "increase" | "decrease") => {

            dispatch(updateLike(queryString, category, story_id, type))

            // updates likes property of the story in userStories slice if posted by user.
            dispatch(updateUserStoriesLike(defaultUserStoriesQueryString, story_id, type))
        }


        const onError = (err: any) => {
            switch (true) {
                case (err instanceof CanceledError):
                    return

                case (err instanceof ApiError):
                    // toast err.message
                    return

                case (err instanceof UnauthorizedError):
                    // please login again toast
                    showLoginForm();
                    return

                default:
                    // setError(err)
                    // toast err
                    return
            }
        }

        switch (true) {
            case (isLikedByUser === false):
                likeStory({ story_id }).unwrap()
                    .then(() => onSuccess("increase"))
                    .catch(onError)
                return


            case (isLikedByUser):
                unlikeStory({ story_id }).unwrap()
                    .then(() => onSuccess("decrease"))
                    .catch(onError)
                return

        }

    }



    const likeColor = isLikedByUser ? "#FF0000" : "#fff";

    return (
        <div className={styles.like_container}>
            <button className={styles.like_button} disabled={likeStoryLoading || unlikeStoryLoading}
                onClick={handleLikeChange}>
                <LikeIcon fill={likeColor} className={styles.button_icon} />
            </button>

            <p className={styles.likes}>{likes}</p>
        </div>
    );
}

export default LikeButton;