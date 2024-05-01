import { useContext, useEffect, useMemo, useRef, useState } from "react";

import BottomSection from "../Components/StoryView/BottomSection";
import CloseAndShare from "../Components/StoryView/CloseAndShare";
import DesktopControlButton from "../Components/StoryView/DesktopControlButton";
import MobileControl from "../Components/StoryView/MobileControl";
import ProgressBar from "../Components/StoryView/ProgressBar";
import useDeviceWidth from "@src/hooks/useDeviceWidth";
import { IStories } from "@src/store/apiSlice/storiesApi";

import styles from "./StoryView.module.css";
import { authTokenContext } from "@src/context/authTokens";
import { useGetUserLikedStoriesQuery } from "@src/store/apiSlice/userLikedStoriesApi";



interface Iprops {
    data: IStories[string][number]

    closeModal: () => void
}


const StoryView: React.FC<Iprops> = ({ data, closeModal }) => {

    const { isDesktop } = useDeviceWidth();
    const { isLoggedIn } = useContext(authTokenContext);
    const { data: userLikedStories } = useGetUserLikedStoriesQuery(undefined, { skip: isLoggedIn === false });

    const timeoutIDRef = useRef<NodeJS.Timeout | null>();
    const images = useMemo(() => data.slides.map(d => ({ url: d.image })), [data])

    const [reachedEnd, setReachedEnd] = useState(false);

    const [currentIndex, setCurrentIndex] = useState(0);
    // to get the current index inside setTimeout function
    const currentIndexRef = useRef(0);

    const [startAnimation, setStartAnimation] = useState(false);


    useEffect(() => {

        return () => {
            timeoutIDRef.current && clearTimeout(timeoutIDRef.current);
        }
    }, [])


    // updates currentIndexRef when there is a change in currentIndex state
    useEffect(() => {
        currentIndexRef.current = currentIndex;
    }, [currentIndex])


    const moveToNextSlide = () => {
        if (currentIndexRef.current === images.length - 1) return

        setCurrentIndex(prev => prev + 1);

        if (shouldTriggerOnLoad("forward")) onLoad()
    }


    const moveToPreviousSlide = () => {
        setCurrentIndex(prev => {
            if (prev === 0) return prev;
            return prev - 1;
        });

        setReachedEnd(false);
        if (shouldTriggerOnLoad("backward")) onLoad();
    }



    // function to update only the current index (startAnimation - false) - this function should be called inside timeout or interval
    const updateCurrentIndex = () => {
        const index = currentIndexRef.current;

        setStartAnimation(false);

        moveToNextSlide();

        if (index === images.length - 1) return setReachedEnd(true);

        // if next image url is same then call onLoad, if image url is same then onload event doesn't fire
        if (shouldTriggerOnLoad("forward")) onLoad()
    }



    // function to start animation and trigger set timeout when image is loaded
    const onLoad = () => {
        timeoutIDRef.current && clearTimeout(timeoutIDRef.current)
        setStartAnimation(true);
        timeoutIDRef.current = setTimeout(updateCurrentIndex, 5000)
    }



    /**
     * returns a boolean indicating if onLoad function should be manually called.
     * This is needed when adjacent slide image urls are same.
     * @param type - indication of slide movement. "forward" when next slide is being displayed and "backward" when previous slide is being displayed.
     */
    const shouldTriggerOnLoad = (type: "forward" | "backward") => {
        switch (type) {
            case ("forward"):
                return data.slides[currentIndexRef.current].image === data.slides[currentIndexRef.current + 1].image

            case ("backward"):
                return data.slides[currentIndexRef.current].image === data.slides[currentIndexRef.current - 1].image
        }
    }



    const checkLikedByUser = () => {
        if (isLoggedIn === false || !userLikedStories) return false;

        return userLikedStories.includes(data._id)
    }

    const isLikedByUser = useMemo(checkLikedByUser, [isLoggedIn, userLikedStories]);


    return (
        // story view container
        <div className={styles.container} onClick={e => e.stopPropagation()}>

            {/* slide controls for devices with width below 768px */}
            {
                isDesktop === false ?
                    <MobileControl moveToNextSlide={moveToNextSlide} moveToPreviousSlide={moveToPreviousSlide} />
                    :
                    null
            }



            {/* slide control button for devices with width of minimum 768px */}
            {
                isDesktop ?
                    <DesktopControlButton direction="left" onClick={moveToPreviousSlide} />
                    :
                    null
            }




            {/* slide view */}
            <div className={styles.story_container}>
                <div className={styles.top}>
                    <ProgressBar totalSlides={data.slides.length} currentIndex={currentIndex}
                        startAnimation={startAnimation} reachedEnd={reachedEnd} />

                    <CloseAndShare close={closeModal} />
                </div>

                <img src={data.slides[currentIndex].image} alt="" onLoad={onLoad} className={styles.image} />


                <BottomSection story_id={data._id} category={data.category} heading={data.slides[currentIndex].heading} description={data.slides[currentIndex].description}
                    likes={data.likes} liked={isLikedByUser} />
            </div>






            {/* slide control button for devices with width of minimum 768px */}
            {
                isDesktop ?
                    <DesktopControlButton direction="right" onClick={moveToNextSlide} />
                    :
                    null
            }



        </div>
    );
}

export default StoryView;