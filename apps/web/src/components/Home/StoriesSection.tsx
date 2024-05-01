import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import StoryCard from "./StoryCard";
import PrimaryButton from "../common/PrimaryButton";
import { authTokenContext } from "@src/context/authTokens";
import { ApiError, CanceledError, UnauthorizedError } from "@src/services/errors";
import { AppDispatch } from "@src/store";
import { IStories, addMoreStories } from "@src/store/apiSlice/storiesApi";
import { defaultUserStoriesQueryString, replaceUserStories } from "@src/store/apiSlice/userStoriesApi";
import { storiesQuerySelector } from "@src/store/slices/storiesQuery";

import styles from "./StoriesSection.module.css";
import useLoader from "@src/hooks/useLoader";
import { loginFormContext } from "@src/context/loginForm";


interface Iprops {
    header: string
    data: IStories[string] | undefined
    category: string
    fetchAll: () => Promise<any>

    userStory?: boolean

    showMoreOption?: boolean
}

const StoriesSection: React.FC<Iprops> = ({ header, category, data, fetchAll, userStory = false, showMoreOption = true }) => {

    const { showLoginForm } = useContext(loginFormContext);

    const dispatch = useDispatch<AppDispatch>();
    const { logout } = useContext(authTokenContext);

    const [fetchedAll, setFetchedAll] = useState(false);

    const { queryString } = useSelector(storiesQuerySelector);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useLoader([loading]);

    const getStoryData = (storyId: string) => data?.find(d => d._id === storyId)


    const handleFetchAll = async () => {
        setLoading(true);
        const result = await fetchAll();
        setLoading(false);

        switch (true) {
            case (result instanceof CanceledError):
                return

            case (userStory && result instanceof UnauthorizedError):
                logout();
                // please login again toast
                showLoginForm();
                return

            case (result instanceof ApiError):
                // please try again later toast
                setError(result.message);
                return


            default:
                setError("");
                // if the component is of user stories section then extract the data accordingly
                // setLocalData(userStory ? result.stories : result[category])

                switch (userStory) {
                    case (true):
                        dispatch(replaceUserStories(defaultUserStoriesQueryString, result.stories))
                        break;


                    case (false):
                        dispatch(addMoreStories(queryString, category, result[category]))
                        break;
                }

                setFetchedAll(true)
                return
        }
    }

    const dataExists = data && data.length > 0


    return (
        <section className={styles.section_container}>
            <p className={styles.section_header}>{header}</p>



            <div className={styles.stories_container}>
                {
                    // if error exists show error
                    error ?
                        <p className={styles.no_stories_text}>{error}</p>
                        :

                        // add check if data.length is zero then display
                        !dataExists ?
                            <p className={styles.no_stories_text}>No stories Available</p>
                            :
                            null
                }

                {
                    // add check if error then show something went wrong. Please try again later
                }


                {

                    // data.length > 0 then display story cards
                    <>
                        {
                            dataExists ?
                                data.map(d => (
                                    <StoryCard data={d.slides[0]} story_id={d._id} key={d.slides[0]._id}
                                        getStoryData={getStoryData} />
                                ))
                                :
                                null
                        }
                    </>
                }

            </div>


            {/* add check to display button only when data.length > 0 and fetchedAll is false */}
            {
                (showMoreOption && dataExists && fetchedAll === false) ?
                    <PrimaryButton children="See more" handleClick={handleFetchAll} className={styles.see_more_button}
                        loading={loading} />
                    :
                    null
            }


        </section>
    );
}

export default StoriesSection;