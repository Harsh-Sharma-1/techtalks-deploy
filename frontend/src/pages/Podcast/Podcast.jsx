import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AddDiscussionCommentModel from '../../components/AddCommentModel/AddDiscussionCommentModel';
import AddPodcastCommentModel from '../../components/AddCommentModel/AddPodcastCommentModel';
import { getPodcast, likePodcast } from '../../http';
import styles from './Podcast.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addLike, removeLike } from '../../store/authSlice';
import { toast } from 'react-toastify';

const Podcast = () => {
    const { id } = useParams();
    const [showModel, setShowModel] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const [liked, setLiked] = useState(false);

    const dispatch = useDispatch();

    const [podcast, setPodcast] = useState({
        topic: '',
        description: `
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Iste quod qui ipsam voluptas odio suscipit vitae, placeat 
        ab, quidem error consectetur sint! Dignissimos, nostrum 
        reiciendis! Nemo iure facere fugit reprehenderit.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Iste quod qui ipsam voluptas odio suscipit vitae, placeat 
        ab, quidem error consectetur sint! Dignissimos, nostrum 
        reiciendis! Nemo iure facere fugit reprehenderit.
        `,
        comments: [],
        link: '',
    });

    useEffect(() => {
        (async () => {
            const { data } = await getPodcast(id);

            user.liked.map((item) => {
                if (item._id === data._id) {
                    setLiked(true);
                }
            });
            setPodcast(data);
        })();
    }, []);

    const like = async () => {
        const { data } = await likePodcast(id);
        if (liked) {
            dispatch(
                removeLike({
                    id: podcast._id,
                })
            );
            setLiked(false);
        } else {
            dispatch(
                addLike({
                    podcast: {
                        category: podcast.category,
                        likes: podcast.likes,
                        comments: podcast.comments,
                        _id: podcast._id,
                        topic: podcast.topic,
                        link: podcast.link,
                        ownerId: podcast.ownerId._id,
                        createdAt: podcast.createdAt,
                        updatedAt: podcast.updatedAt,
                        __v: podcast.__v,
                    },
                })
            );
            setLiked(true);
        }
    };

    const sharePodcast = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success('link copied!');
    };

    return (
        <div>
            <div className='container'>
                <Link
                    to='/podcasts'
                    style={{ textDecoration: 'none' }}
                    className={styles.goBack}
                >
                    <img src='/images/arrow-left.png' alt='arrow-left' />
                    <span>All Podcasts</span>
                </Link>
            </div>
            <div className={styles.discussion + ' container'}>
                <h1>{podcast.topic}</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Iste quod qui ipsam voluptas odio suscipit vitae, placeat
                    ab, quidem error consectetur sint! Dignissimos, nostrum
                    reiciendis! Nemo iure facere fugit reprehenderit. Lorem
                    ipsum dolor sit amet consectetur adipisicing elit. Iste quod
                    qui ipsam voluptas odio suscipit vitae, placeat ab, quidem
                    error consectetur sint! Dignissimos, nostrum reiciendis!
                    Nemo iure facere fugit reprehenderit.
                </p>
                <audio src={podcast.link} controls></audio>
            </div>

            <div className={styles.clientsWrap}>
                <div className='container'>
                    <div className={styles.header}>
                        <h3>Comments</h3>
                        <div className={styles.actions}>
                            <button
                                onClick={like}
                                style={{
                                    background: liked ? '#f0f0f0' : '#262626',
                                }}
                                className={styles.actionBtn}
                            >
                                <img src='/images/win.png' alt='win-icon' />
                            </button>
                            <button
                                onClick={() => setShowModel(true)}
                                className={styles.actionBtn}
                            >
                                <img src='/images/win.png' alt='win-icon' />
                                <span>Add Comment</span>
                            </button>

                            <button
                                className={styles.actionBtn}
                                onClick={sharePodcast}
                            >
                                <img src='/images/win.png' alt='win-icon' />
                                <span>Share</span>
                            </button>
                        </div>
                    </div>
                    <div className={styles.clientsList}>
                        {podcast.comments.map((comment, i) => {
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
                <AddPodcastCommentModel
                    onClose={() => setShowModel(false)}
                    changeData={setPodcast}
                />
            )}
        </div>
    );
};

export default Podcast;
