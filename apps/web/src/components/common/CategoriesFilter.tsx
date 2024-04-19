import { ChangeEventHandler } from "react";
import { useDispatch, useSelector } from "react-redux";

import { categoriesSelector, updateSelectedCategory } from "@src/store/slices/categories";


import styles from "./CategoriesFilter.module.css";


const CategoriesFilter = () => {

    const { isError, isOptionsFetched, categories, selectedCategory } = useSelector(categoriesSelector);

    const dispatch = useDispatch();

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => dispatch(updateSelectedCategory(e.target.value))


    const getLabelClass = (value: string) => selectedCategory === value ? `${styles.label} ${styles.active_label}` : styles.label

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
                    <h1 className={styles.header}>Some Error occured when fetching categories. <br />
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