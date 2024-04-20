import { useState } from "react";

import StoryCard from "./StoryCard";
import PrimaryButton from "../common/PrimaryButton";

import styles from "./StoriesSection.module.css";


interface Iprops {
    header: string
}

const StoriesSection = () => {

    const [fetchedAll, setFetchedAll] = useState(false);

    const handleFetchAll = () => {

    }

    return (
        <section className={styles.section_container}>
            <p className={styles.section_header}>Top Stories from Food</p>



            <div className={styles.stories_container}>
                {
                    // add check if data.length is zero then display
                    false ?
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
                        <StoryCard />
                        <StoryCard />
                    </>
                }

            </div>


            {/* add check to display button only when data.length > 0 and fetchedAll is false */}
            <PrimaryButton children="See more" handleClick={handleFetchAll} className={styles.see_more_button} />


        </section>
    );
}

export default StoriesSection;