import React from 'react';
import styles from './PodcastCard.module.css';
import { useHistory } from 'react-router-dom';

const PodcastCard = ({ podcast }) => {
    const history = useHistory();

    return (
        <div
            onClick={() => {
                history.push(
                    `/podcast/${podcast.id ? podcast.id : podcast._id}`
                );
            }}
            className={styles.card}
        >
            <h3 className={styles.topic}>{podcast.topic}</h3>
            <p className={styles.description}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut
                natus omnis modi,....
            </p>
            <br />

            {podcast.ownerId.name && (
                <h4 className={styles.author}>
                    By <span>{podcast.ownerId.name}</span>
                </h4>
            )}

            {/* <div className={`${styles.speakers} ${styles.singleSpeaker}`}> */}
            {/* <div className={styles.avatars}>
                    <img
                        key={speaker.id}
                        src={speaker.avatar}
                        alt='speaker-avatar'
                    />
                </div> */}
            {/* <div className={styles.names}> */}
            {/* {room.speakers.map((speaker) => (
                        <div key={speaker.id} className={styles.nameWrapper}>
                            <span>{speaker.name}</span>
                            <img src={chatBubble} alt='' />
                        </div>
                    ))} */}
            {/* </div> */}
            {/* </div> */}
        </div>
    );
};

export default PodcastCard;
