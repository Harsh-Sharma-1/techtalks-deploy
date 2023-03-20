import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PodcastCard from '../../components/PodcastCard/PodcastCard';
import { getAllPodcasts } from '../../http';
import styles from './Profile.module.css';
import BarChart from 'react-easy-bar-chart';

const Profile = () => {
    const { user } = useSelector((state) => state.auth);
    const [myPodcast, setMyPodcasts] = useState([]);
    const [tab, settab] = useState('my');

    useEffect(() => {
        const fetchRooms = async () => {
            const { data } = await getAllPodcasts();
            const newData = data.filter((item) => item.ownerId._id === user.id);

            setMyPodcasts(newData);
        };

        fetchRooms();
    }, []);

    const data = myPodcast.map((podcast, i) => {
        return {
            title: podcast.topic,
            value: podcast.likes,
            color: i % 2 ? '#fff' : '#ffdc5d',
        };
    });

    return (
        <div className='container'>
            <br />
            <br />
            <h1>{user.name}</h1>
            <br />
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio
                beatae reprehenderit impedit, exercitationem iure cum ipsa sed,
                repellat quisquam, accusamus nesciunt aliquam ab nostrum ipsam
                temporibus iste eius enim veritatis?
            </p>

            <div className={styles.tabs}>
                <button
                    onClick={() => settab('my')}
                    style={{
                        color: tab === 'my' ? 'white' : '#606060',
                        fontWeight: tab === 'my' ? 'bold' : 'normal',
                    }}
                >
                    My podcasts
                </button>
                <button
                    onClick={() => settab('liked')}
                    style={{
                        color: tab === 'liked' ? 'white' : '#606060',
                        fontWeight: tab === 'liked' ? 'bold' : 'normal',
                    }}
                >
                    Liked
                </button>
                {myPodcast.length > 0 && (
                    <button
                        onClick={() => settab('analytics')}
                        style={{
                            color: tab === 'analytics' ? 'white' : '#606060',
                            fontWeight: tab === 'analytics' ? 'bold' : 'normal',
                        }}
                    >
                        analytics
                    </button>
                )}
            </div>

            {tab === 'my' && (
                <div className={styles.roomsList}>
                    {myPodcast.map((room) => {
                        return <PodcastCard key={room.id} podcast={room} />;
                    })}
                </div>
            )}

            {tab === 'liked' && (
                <div className={styles.roomsList}>
                    {user.liked.map((room) => {
                        return <PodcastCard key={room.id} podcast={room} />;
                    })}
                </div>
            )}

            {tab === 'analytics' && (
                <div className={styles.analytics}>
                    <BarChart
                        xAxis='Podcast'
                        yAxis='Likes'
                        height={400}
                        width={800}
                        data={data}
                    />
                </div>
            )}
        </div>
    );
};

export default Profile;
