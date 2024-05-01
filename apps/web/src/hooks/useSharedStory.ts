import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { ApiError } from "@src/services/errors";
import { getStoryByIdService } from "@src/services/story/getStoryById";
import { IStories } from "@src/store/apiSlice/storiesApi";


/**
 * used to check if home route contains any valid id to display the story. returns valid status and storyData if id is valid.
 */
const useSharedStory = (showModal: () => void) => {
    const [searchParams] = useSearchParams();
    const [storyData, setStoryData] = useState<IStories[string][number] | null>(null);

    const story_id = searchParams.get("story");

    useEffect(() => {
        const call = async (id: string) => {
            const result = await getStoryByIdService(id);

            if (result instanceof ApiError) {
                // toast result.message
                return;
            }

            setStoryData(result);
            showModal();
        }


        if (story_id) call(story_id);
    }, [story_id])


    return {
        storyData
    }
}

export default useSharedStory;