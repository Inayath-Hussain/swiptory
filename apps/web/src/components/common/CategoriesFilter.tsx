import { ChangeEventHandler } from "react";
import { useDispatch, useSelector } from "react-redux";

import { categoriesSelector } from "@src/store/slices/categories";
import { updateStoriesQuery } from "@src/store/slices/storiesQuery";


import styles from "./CategoriesFilter.module.css";
import { storiesQuerySelector } from "@src/store/slices/storiesQuery";


const CategoriesFilter = () => {

    const { isError, isOptionsFetched, categories } = useSelector(categoriesSelector);
    const { options } = useSelector(storiesQuerySelector);

    const dispatch = useDispatch();

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => dispatch(updateStoriesQuery({ key: "category", value: e.target.value }))


    const getLabelClass = (value: string) => options.category === value ? `${styles.label} ${styles.active_label}` : styles.label

    return (
        <div className={styles.container}>
            {
                // when request is still pending 
                (isOptionsFetched === false && isError === false) ?
                    <h1 className={styles.header}>Fetching categories please wait ...</h1>
                    :
                    null
            }

            {
                // when there is an error when fetching categories
                isError === true ?
                    <h1 className={`${styles.header} ${styles.error}`}>Some Error occured when fetching categories. <br />
                        Please try again later</h1>
                    :
                    null
            }

            {
                categories.length > 0 ?
                    <>
                        {/* "all" option */}
                        <label className={getLabelClass("")} title="All">
                            <div className={styles.image} />

                            <p className={`${styles.name} ${styles.font_black}`}>All</p>

                            <input type="radio" value="" onChange={handleChange} name="category"
                                className={styles.input} />
                        </label>

                        {/* category options */}
                        {categories.map(c => (
                            <label className={getLabelClass(c.name)} key={c.name} title={c.name}>

                                <img src={c.image} alt="" className={styles.image} />

                                <p className={styles.name}>{c.displayText}</p>

                                <input type="radio" value={c.name} onChange={handleChange} name="category"
                                    className={styles.input} />
                            </label>
                        ))}
                    </>
                    :
                    null
            }

        </div >
    );
}

export default CategoriesFilter;