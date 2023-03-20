import React, { useState } from 'react';
import styles from './PodcastCategoryList.module.css';

const PodcastCategoryList = ({ list, selectedItem, setSelectedItem }) => {
    return (
        <div className={styles.listContainer}>
            {list.map((item, i) => (
                <p
                    key={i}
                    className={`${styles.category} ${
                        i === selectedItem ? styles.active : ''
                    }`}
                    onClick={() => setSelectedItem(i)}
                >
                    {item}
                </p>
            ))}
        </div>
    );
};

export default PodcastCategoryList;
