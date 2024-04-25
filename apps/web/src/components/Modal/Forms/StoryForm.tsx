import { FormEventHandler, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import CloseCircleButton from "@src/components/common/CloseCircleButton";
import ErrorMessage from "@src/components/common/ErrorMessage";
import GreenButton from "@src/components/common/GreenButton";
import PrimaryButton from "@src/components/common/PrimaryButton";
import SecondaryButton from "@src/components/common/SecondaryButton";
import SlideDetail from "../Components/StoryForm/SlideDetail";
import SlidesNavbar from "../Components/StoryForm/SlidesNavbar";
import useDeviceWidth from "@src/hooks/useDeviceWidth";
import { useOnline } from "@src/hooks/useOnline";
import { ApiError, CanceledError, UnauthorizedError } from "@src/services/errors";
import { IStories, usePostStoryMutation } from "@src/store/slices/storiesApi";
import { categoriesSelector } from "@src/store/slices/categories";


import styles from "./StoryForm.module.css";


type StoryData = Omit<IStories[string][number], "createdAt"> // _id, slides, category

export type StoryFormData = Omit<StoryData, "_id">

interface Iprops {
    type: "create" | "edit"
    data?: StoryData // _id, slides, category
    closeModal: () => void
    closeNavbar: () => void
}


const StoryForm: React.FC<Iprops> = ({ data: dataProp = undefined, closeModal, closeNavbar }) => {

    const [post, { isLoading, isError, status }] = usePostStoryMutation();

    const { isDesktop } = useDeviceWidth();
    const { isOnline } = useOnline();
    const { categories } = useSelector(categoriesSelector);

    const [data, setData] = useState<StoryFormData>(dataProp || {
        category: "",
        slides: [1, 2, 3].map((v) => ({ _id: v.toString(), heading: "", description: "", image: "" }))
    });

    const [error, setError] = useState("");

    const [selectedSlideID, setSelectedSlideID] = useState(data.slides[0]._id);

    const selectedIndex = useMemo(() => data.slides.findIndex(v => v._id === selectedSlideID), [selectedSlideID, data.slides.length]);

    const handleChangeSlide = (id: string) => setSelectedSlideID(id);

    useEffect(() => {
        setError(isOnline === false ? "You are offline" : "");
    }, [isOnline])


    useEffect(() => {
        console.log(status)
    }, [isError])

    const addNewSlide = () => {
        if (data.slides.length >= 6) return
        const id = Date.now().toString()
        setData(prev => {
            const slides = [...prev.slides]
            slides.push({ _id: id, description: "", heading: "", image: "" })

            return ({ ...prev, slides })
        })

        setSelectedSlideID(id)
    }

    /**
     * 
     * @param e mouse event
     * @param id id of the slide to be deleted
     * @param slideIndex index of the slide to be deleted
     */
    const removeSlide = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string, slideIndex: number) => {

        e.stopPropagation();

        // variable used to store id of the slide which should be displayed after removing this slide
        let nextSlideID = ""

        // if the active slide and slide to be deleted is same
        if (selectedIndex === slideIndex) {

            // if the active slide is the last element then display the prev slide after deletion
            if (selectedIndex + 1 === data.slides.length) nextSlideID = data.slides[selectedIndex - 1]._id

            // display the next slide after deletion, this is done to maintain active slide number same
            else nextSlideID = data.slides[selectedIndex + 1]._id
            setSelectedSlideID(nextSlideID)
        }

        setData(prev => {
            const slides = prev.slides.filter(s => s._id !== id)
            return { ...prev, slides }
        })

    }

    /**
     * moves to the previous slide and display's the slide details
     */
    const moveToPreviousSlide = () => {
        if (selectedIndex === 0) return
        setSelectedSlideID(data.slides[selectedIndex - 1]._id)
    }

    /**
     * moves to next slide and display's the slide details
     */
    const moveToNextSlide = () => {
        if (selectedIndex === data.slides.length - 1) return
        setSelectedSlideID(data.slides[selectedIndex + 1]._id)
    }


    // prevent closing modal when clicked inside the form
    const preventClose: React.MouseEventHandler<HTMLDivElement> = (e) => e.stopPropagation();



    /**
     * validate form data before submiting
     */
    const validate = () => {
        let errorMessage = "";
        let errorSlideId = ""

        for (const s of data.slides) {
            switch ("") {
                case (s.heading):
                    errorMessage = "heading is required";
                    errorSlideId = s._id;
                    break;

                case (s.description):
                    errorMessage = "description is required";
                    errorSlideId = s._id;
                    break;

                case (s.image):
                    errorMessage = "image is required";
                    errorSlideId = s._id;
                    break;
            }

            // break out of loop when there's an error
            if (errorMessage) break;
        }


        // validate category only when slides are valid
        if (errorMessage === "") {
            switch (true) {
                case (data.category === ""):
                    errorMessage = "category is required";
                    break;

                case (categories.find(c => c.name === data.category) === undefined):
                    errorMessage = "category is invalid"
                    break;
            }
        }


        setError(errorMessage)
        if (errorSlideId) setSelectedSlideID(errorSlideId);

    }


    const handleSubmit: FormEventHandler = async (e) => {
        e.preventDefault();

        if (isOnline === false) return

        validate();


        // request body doesn't take _id property in slides array
        let slides: Omit<StoryData["slides"][number], "_id">[] = [];
        slides = data.slides.map(s => ({ description: s.description, heading: s.heading, image: s.image }))


        post({ category: data.category, slides }).unwrap()
            .then((result) => {
                console.log(result)
                closeModal();
                closeNavbar();
                return
            })
            .catch((err) => {
                switch (true) {
                    case (err instanceof CanceledError):
                        return

                    case (err instanceof ApiError):
                        return setError(err.message)

                    case (err instanceof UnauthorizedError):
                        // please login again toast
                        // closeModal()
                        return

                    default:
                        setError(err)
                        return
                }
            })
    }


    return (
        <div className={styles.container} onClick={preventClose}>

            <form onSubmit={handleSubmit} className={styles.form}>

                {/* form close icon */}
                <CloseCircleButton handleClick={closeModal}
                    buttonClassName={styles.form_close_icon_button}
                    imageClassName={styles.form_close_icon_image}
                />

                {/* form header */}
                {/* text displayed in devices whose width is 768px and below */}
                <h1 className={styles.form_header}>Add story to feed</h1>


                <div className={styles.slides_layout}>

                    {/* text displayed in devices whose width is 768px and above */}
                    <p className={styles.slides_instruction}>Add upto 6 slides </p>

                    {/* slides nav */}
                    <SlidesNavbar
                        data={data} selectedIndex={selectedIndex}
                        addNewSlide={addNewSlide} removeSlide={removeSlide}
                        handleChangeSlide={handleChangeSlide}
                    />


                    <SlideDetail data={data} setData={setData} selectedIndex={selectedIndex} />

                </div>

                <ErrorMessage errorMessage={error} className={styles.error_message} />


                <div className={styles.buttons_container}>

                    {
                        isDesktop ?
                            <div className={styles.slide_buttons_container}>
                                <GreenButton children="Previous" type="button"
                                    disabled={selectedIndex === 0}
                                    handleClick={moveToPreviousSlide}
                                    title="move to previous slide" />

                                <SecondaryButton children="Next" type="button"
                                    disabled={selectedIndex === data.slides.length - 1}
                                    handleClick={moveToNextSlide}
                                    className={styles.next_slide_button}
                                    title="move to next slide" />
                            </div>
                            :
                            null
                    }

                    <PrimaryButton children="Post" type="submit" className={styles.submit_button} loading={isLoading}
                        title="post story" />
                </div>


            </form>
        </div>
    );
}

export default StoryForm;

