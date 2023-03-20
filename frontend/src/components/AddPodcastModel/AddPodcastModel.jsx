import React, { useState } from 'react';
import TextInput from '../shared/TextInput/TextInput';
import styles from './AddPodcastModel.module.css';
import { createPodcast as create } from '../../http';
import { useHistory } from 'react-router-dom';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../firebase';
import Loader from '../shared/Loader/Loader';

const AddPodcastModel = ({ onClose, setRefetch }) => {
    const [topic, setTopic] = useState('');
    const [file, setFile] = useState(null);
    const [category, setCategory] = useState('Science talks');
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    async function uploadFile() {
        setLoading(true);
        const fileName = topic.split(' ').join('-');
        const storageRef = ref(storage, fileName);
        uploadBytes(storageRef, file).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((downloadURL) => {
                // setLink(downloadURL);
                createPodcast(downloadURL);
            });
        });
    }

    async function createPodcast(link) {
        // server call
        try {
            if (!topic) return;
            const { data } = await create({
                topic,
                link,
                category,
            });
            setRefetch((state) => state + 1);
            setLoading(false);
            onClose();
            // history.push(`/room/${data.id}`);
        } catch (error) {
            console.log(error.message);
        }
    }

    if (loading) {
        return (
            <div className={styles.modelMask}>
                <Loader message={'the uploading is going on'} />
            </div>
        );
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
                    <br />
                    <h3 className={styles.heading}>Select a category</h3>
                    <select
                        className={styles.selectCategory}
                        onChange={(e) => {
                            setCategory(e.target.value);
                        }}
                    >
                        <option value={'Science talks'}>Science talks</option>
                        <option value={'Option 1'}>Option 1</option>
                        <option value={'Option 2'}>Option 2</option>
                        <option value={'Option 3'}>Option 3</option>
                        <option value={'Option 4'}>Option 4</option>
                        <option value={'Option 5'}>Option 5</option>
                        <option value={'Option 6'}>Option 6</option>
                        <option value={'Option 7'}>Option 7</option>
                        <option value={'Option 8'}>Option 8</option>
                        <option value={'Option 9'}>Option 9</option>
                        <option value={'Option 10'}>Option 10</option>
                    </select>

                    <div className={styles.fileUpload}>
                        <h3 htmlFor=''>Select file</h3>
                        <input
                            type='file'
                            onChange={(e) => {
                                setFile(e.target.files[0]);
                            }}
                        />
                    </div>
                </div>
                <div className={styles.modelFooter}>
                    <h2>Start a room, open to everyone</h2>
                    <button
                        onClick={uploadFile}
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

export default AddPodcastModel;
