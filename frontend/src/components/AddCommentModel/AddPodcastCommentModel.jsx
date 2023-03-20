import React, { useState } from 'react';
import styles from './style.module.css';
import { addComment as create } from '../../http';
import { useHistory, useParams } from 'react-router-dom';

const AddPodcastCommentModel = ({ onClose, changeData }) => {
    const [description, setDescription] = useState(null);
    const { id } = useParams();

    const history = useHistory();

    async function createDiscussion(link) {
        // server call
        try {
            if (!description) return;
            const { data } = await create(
                id,
                {
                    comment: description,
                },
                'pocast'
            );
            changeData((prev) => {
                const newData = { ...prev };
                newData.comments.push(data);
                return newData;
            });

            onClose(true);
            // history.push(`/room/${data.id}`);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className={styles.modelMask}>
            <div className={styles.modelBody}>
                <button onClick={onClose} className={styles.closeButton}>
                    <img src={'/images/close.png'} alt='' />
                </button>
                <div className={styles.modelHeader}>
                    <div className={styles.description}>
                        <label htmlFor=''>write a comment ...</label>
                        <textarea
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                            rows={10}
                        />
                    </div>
                </div>
                <div className={styles.modelFooter}>
                    <h2>Start a room, open to everyone</h2>
                    <button
                        onClick={createDiscussion}
                        className={styles.footerButton}
                    >
                        <img src={'/images/celebration.png'} alt='' />
                        <span>Let's go</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddPodcastCommentModel;
