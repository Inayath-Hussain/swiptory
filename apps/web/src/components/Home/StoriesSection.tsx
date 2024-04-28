import { useContext, useEffect, useState } from "react";

import StoryCard from "./StoryCard";
import PrimaryButton from "../common/PrimaryButton";
import { authTokenContext } from "@src/context/authTokens";
import { ApiError, CanceledError, UnauthorizedError } from "@src/services/errors";
import { IStories } from "@src/store/apiSlice/storiesApi";

import styles from "./StoriesSection.module.css";


interface Iprops {
    header: string
    data: IStories[string] | undefined
    category: string
    fetchAll: () => Promise<any>

    userStory?: boolean
}

const StoriesSection: React.FC<Iprops> = ({ header, category, data, fetchAll, userStory = false }) => {

    const { logout } = useContext(authTokenContext);

    const [localData, setLocalData] = useState<typeof data>(data);
    const [fetchedAll, setFetchedAll] = useState(false);


    // when props are changed componentWillUpdate fires not componentDidMount as a result "localData" state doesn't get updated.
    // this is done only for "your stories" section since the rest are rendered using map function
    useEffect(() => {
        if (userStory) setLocalData(data)
    }, [data])



    const getStoryData = (storyId: string) => data?.find(d => d._id === storyId)


    const handleFetchAll = async () => {
        const result = await fetchAll();

        switch (true) {
            case (result instanceof CanceledError):
                return

            case (userStory && result instanceof UnauthorizedError):
                logout();
                // please login again toast
                return

            case (result instanceof ApiError):
                // please try again later toast
                return


            default:
                // if the component is of user stories section then extract the data accordingly
                setLocalData(userStory ? result.stories : result[category])
                setFetchedAll(true)
                return
        }
    }

    const dataExists = localData && localData.length > 0

    return (
        <section className={styles.section_container}>
            <p className={styles.section_header}>{header}</p>



            <div className={styles.stories_container}>
                {
                    // add check if data.length is zero then display
                    !dataExists ?
                        <p className={styles.no_stories_text}>No stories Available</p>
                        :
                        null
                }

                {
                    // add check if loading then show text Please wait fetching stories 
                }

                {
                    // add check if error then show something went wrong. Please try again later
                }


                {
                    // add check if data.length > 0 then display

                    <>
                        {
                            dataExists ?
                                localData.map(d => (
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
                (dataExists && fetchedAll === false) ?
                    <PrimaryButton children="See more" handleClick={handleFetchAll} className={styles.see_more_button} />
                    :
                    null
            }


        </section>
    );
}

export default StoriesSection;