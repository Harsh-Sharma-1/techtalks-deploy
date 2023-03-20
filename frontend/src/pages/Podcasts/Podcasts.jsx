import React, { useEffect, useState } from 'react';
import styles from './Podcasts.module.css';
import { getAllPodcasts } from '../../http';
import AddPodcastModel from '../../components/AddPodcastModel/AddPodcastModel';
import PodcastCard from '../../components/PodcastCard/PodcastCard';
import PodcastCategoryList from '../../components/PodcastCategoryList/PodcastCategoryList';
import { useSelector } from 'react-redux';

// const rooms = [
//     {
//         id: 1,
//         topic: 'Which framework best for frontend ?',
//         speakers: [
//             {
//                 id: 1,
//                 name: 'John Doe',
//                 avatar: monkeyAvatar,
//             },
//             {
//                 id: 2,
//                 name: 'Jane Doe',
//                 avatar: monkeyAvatar,
//             },
//         ],
//         totalPeople: 40,
//     },
//     {
//         id: 3,
//         topic: 'What’s new in machine learning?',
//         speakers: [
//             {
//                 id: 1,
//                 name: 'John Doe',
//                 avatar: monkeyAvatar,
//             },
//             {
//                 id: 2,
//                 name: 'Jane Doe',
//                 avatar: monkeyAvatar,
//             },
//         ],
//         totalPeople: 40,
//     },
//     {
//         id: 4,
//         topic: 'Why people use stack overflow?',
//         speakers: [
//             {
//                 id: 1,
//                 name: 'John Doe',
//                 avatar: monkeyAvatar,
//             },
//             {
//                 id: 2,
//                 name: 'Jane Doe',
//                 avatar: monkeyAvatar,
//             },
//         ],
//         totalPeople: 40,
//     },
//     {
//         id: 5,
//         topic: 'Artificial inteligence is the future?',
//         speakers: [
//             {
//                 id: 1,
//                 name: 'John Doe',
//                 avatar: monkeyAvatar,
//             },
//             {
//                 id: 2,
//                 name: 'Jane Doe',
//                 avatar: monkeyAvatar,
//             },
//         ],
//         totalPeople: 40,
//     },
// ];

const Podcasts = () => {
    const [showModel, setShowModel] = useState(false);
    const [rooms, setRooms] = useState([]);
    const [refetch, setRefetch] = useState(1);
    const [selectedItem, setSelectedItem] = useState(0);
    const { user } = useSelector((state) => state.auth);
    const [search, setSearch] = useState('');

    if (user.preferences === []) {
        setSelectedItem(0);
    }
    const list = [
        'Recommended',
        'Science talks',
        'Option 1',
        'Option 2',
        'Option 3',
        'Option 4',
        'Option 5',
        'Option 6',
        'Option 7',
        'Option 8',
        'Option 9',
        'Option 10',
        'Option 11',
        'Option 12',
        'Option 13',
    ];

    useEffect(() => {
        const fetchRooms = async () => {
            const { data } = await getAllPodcasts();
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
                        <span className={styles.heading}>All podcasts</span>
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
                            <span>Upload podcast</span>
                        </button>
                    </div>
                </div>
                <hr className={styles.divider} />

                <PodcastCategoryList
                    list={list}
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                />

                <div className={styles.roomsList}>
                    {selectedItem === 0
                        ? user.preferences === []
                            ? rooms.map((room) => {
                                  if (
                                      user.preferences.includes(room.category)
                                  ) {
                                      if (search.trim() === '') {
                                          return (
                                              <PodcastCard
                                                  key={room.id}
                                                  podcast={room}
                                              />
                                          );
                                      }

                                      if (room.topic.includes(search)) {
                                          return (
                                              <PodcastCard
                                                  key={room.id}
                                                  podcast={room}
                                              />
                                          );
                                      }
                                  }
                                  return <></>;
                              })
                            : rooms.map((room, i) => {
                                  if (search.trim() === '') {
                                      return (
                                          <PodcastCard
                                              key={room.id}
                                              podcast={room}
                                          />
                                      );
                                  }

                                  if (room.topic.includes(search)) {
                                      return (
                                          <PodcastCard
                                              key={room.id}
                                              podcast={room}
                                          />
                                      );
                                  }
                              })
                        : rooms.map((room) => {
                              if (room.category === list[selectedItem]) {
                                  if (search.trim() === '') {
                                      return (
                                          <PodcastCard
                                              key={room.id}
                                              podcast={room}
                                          />
                                      );
                                  }

                                  if (room.topic.includes(search)) {
                                      return (
                                          <PodcastCard
                                              key={room.id}
                                              podcast={room}
                                          />
                                      );
                                  }
                              } else {
                                  return <></>;
                              }
                          })}
                </div>
            </div>
            {showModel && (
                <AddPodcastModel
                    setRefetch={setRefetch}
                    onClose={() => setShowModel(false)}
                />
            )}
        </>
    );
};

export default Podcasts;
