import React, { useEffect, useState } from 'react';
import styles from './Discussions.module.css';
import { getAllDiscussions } from '../../http';
import AddDiscussionModel from '../../components/AddDiscussionModel/AddDiscussionModel';
import DiscussionCard from '../../components/DiscussionCard/DiscussionCard';

const Discussions = () => {
    const [showModel, setShowModel] = useState(false);
    const [rooms, setRooms] = useState([]);
    const [refetch, setRefetch] = useState(1);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchRooms = async () => {
            const { data } = await getAllDiscussions();
            setRooms(data);
        };

        fetchRooms();
    }, [refetch]);

    function openModel() {
        setShowModel(true);
    }
    return (
        <>
            <div className='container'>
                <div className={styles.roomsHeader}>
                    <div className={styles.left}>
                        <span className={styles.heading}>All Discussions</span>
                        <div className={styles.searchBox}>
                            <img src={'/images/search-icon.png'} alt='' />
                            <input
                                type='text'
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className={styles.searchInput}
                            />
                        </div>
                    </div>
                    <div className={styles.right}>
                        <button
                            onClick={openModel}
                            className={styles.startRoomButton}
                        >
                            <img src={'/images/add-room-icon.png'} alt='' />
                            <span>Start a discussion</span>
                        </button>
                    </div>
                </div>
                <hr className={styles.divider} />

                <div className={styles.discussionsList}>
                    {rooms.map((room) => {
                        if (search.trim() === '') {
                            return (
                                <DiscussionCard
                                    key={room.id}
                                    discussion={room}
                                />
                            );
                        }

                        if (room.topic.includes(search)) {
                            return (
                                <DiscussionCard
                                    key={room.id}
                                    discussion={room}
                                />
                            );
                        }
                    })}
                </div>
            </div>
            {showModel && (
                <AddDiscussionModel
                    setRefetch={setRefetch}
                    onClose={() => setShowModel(false)}
                />
            )}
        </>
    );
};

export default Discussions;
