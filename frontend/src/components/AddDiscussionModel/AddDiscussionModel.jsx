import React, { useState } from 'react';
import TextInput from '../shared/TextInput/TextInput';
import styles from './AddDiscussionModel.module.css';
import { createDiscussion as create } from '../../http';
import { useHistory } from 'react-router-dom';

const AddDiscussionModel = ({ onClose, setRefetch }) => {
    const [topic, setTopic] = useState('');
    const [description, setDescription] = useState(null);

    const history = useHistory();

    async function createDiscussion(link) {
        // server call
        try {
            if (!topic) return;
            const { data } = await create({
                topic,
                description,
            });
            setRefetch((state) => state + 1);
            onClose();
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
                    <h3 className={styles.heading}>
                        Enter the topic to be discussed
                    </h3>
                    <TextInput
                        fullwidth='true'
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                    />
                    <div className={styles.description}>
                        <label htmlFor=''>Description</label>
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

export default AddDiscussionModel;
