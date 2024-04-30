import { useContext } from "react";

import EditIcon from "@src/assets/icons/edit.svg";
import { userStoriesContext } from "@src/context/userStories";

import styles from "./StoryCard.module.css";
import useModal from "@src/hooks/useModal";
import { IStories } from "@src/store/apiSlice/storiesApi";
import StoryForm from "../Modal/Content/StoryForm";
import StoryView from "../Modal/Content/StoryView";

interface Iprops {
    data: {
        image: string
        heading: string
        description: string
    }
    story_id: string

    getStoryData: (story_id: string) => IStories[string][number] | undefined
}


const StoryCard: React.FC<Iprops> = ({ data, story_id, getStoryData }) => {

    const { ModalPortal, hideModal, showModal } = useModal();
    const { ModalPortal: StoryViewModal, hideModal: hideStoryView, showModal: showStoryView } = useModal();

    const { data: userStories } = useContext(userStoriesContext);

    const isUserStory = userStories?.some(v => v._id === story_id);




    return (
        <>
            <div className={styles.card_container} onClick={showStoryView}>
                <img src={data.image} alt="" className={styles.image} />

                <div className={styles.text_container}>
                    <p className={styles.heading}>{data.heading}</p>
                    <p className={styles.description}>{data.description}</p>
                </div>


                {
                    isUserStory ?
                        <button className={styles.edit_button} onClick={showModal}>
                            <img src={EditIcon} alt="" className={styles.edit_image} />
                            Edit
                        </button>
                        :
                        null
                }
            </div>

            {ModalPortal(<StoryForm closeModal={hideModal} type="edit" data={getStoryData(story_id)} />)}

            {StoryViewModal(<StoryView data={getStoryData(story_id) as IStories[string][number]} closeModal={hideStoryView} />, false)}
        </>
    );
}

export default StoryCard;