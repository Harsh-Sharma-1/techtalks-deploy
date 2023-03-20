import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AddDiscussionCommentModel from '../../components/AddCommentModel/AddDiscussionCommentModel';
import { getDiscussion } from '../../http';
import styles from './Discussion.module.css';

const Discussion = () => {
    const [showModel, setShowModel] = useState(false);
    const [discussion, setDiscussion] = useState({
        topic: '',
        description: '',
        comments: [],
    });

    const { id } = useParams();
    useEffect(() => {
        (async () => {
            const { data } = await getDiscussion(id);
            setDiscussion(data);
        })();
    }, []);

    return (
        <div>
            <div className='container'>
                <Link
                    to='/discussions'
                    style={{ textDecoration: 'none' }}
                    className={styles.goBack}
                >
                    <img src='/images/arrow-left.png' alt='arrow-left' />
                    <span>All Discussions</span>
                </Link>
            </div>
            <div className={styles.discussion + ' container'}>
                <h1>{discussion.topic}</h1>
                <p>{discussion.description}</p>
            </div>

            <div className={styles.clientsWrap}>
                <div className='container'>
                    <div className={styles.header}>
                        <h3>Comments</h3>
                        <div className={styles.actions}>
                            <button
                                onClick={() => setShowModel(true)}
                                className={styles.actionBtn}
                            >
                                <img src='/images/win.png' alt='win-icon' />
                                <span>Add Comment</span>
                            </button>
                        </div>
                    </div>
                    <div className={styles.clientsList}>
                        {discussion.comments.map((comment, i) => {
                            return (
                                <div className={styles.comment} key={i}>
                                    <h3>{comment.id}</h3>
                                    <hr />
                                    <p>{comment.comment}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {showModel && (
                <AddDiscussionCommentModel
                    onClose={() => setShowModel(false)}
                    changeData={setDiscussion}
                />
            )}
        </div>
    );
};

export default Discussion;
