import React from 'react';
import styles from './DiscussionCard.module.css';
import { useHistory } from 'react-router-dom';

const DiscussionCard = ({ discussion }) => {
    const history = useHistory();

    return (
        <div
            onClick={() => {
                history.push(`/discussion/${discussion.id}`);
            }}
            className={styles.card}
        >
            <h3 className={styles.topic}>{discussion.topic}</h3>
            <p>{discussion.description}</p>
        </div>
    );
};

export default DiscussionCard;
