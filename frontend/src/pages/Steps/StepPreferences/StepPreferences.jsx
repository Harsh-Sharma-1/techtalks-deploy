import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../components/shared/Button/Button';
import Card from '../../../components/shared/Card/Card';
import { activate } from '../../../http';
import { setAuth } from '../../../store/authSlice';
import styles from './StepPreferences.module.css';

const StepPreferences = ({ onNext }) => {
    const { name, avatar } = useSelector((state) => state.activate);
    const dispatch = useDispatch();

    const list = [
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

    const [selectedItems, setSelectedItems] = useState([]);

    async function handleSubmit() {
        try {
            const { data } = await activate({
                name,
                avatar,
                preferences: selectedItems,
            });
            if (data.auth) {
                dispatch(setAuth(data));
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Card title='Select some topics' icon='email-emoji'>
            <div className={styles.topicsWrapper}>
                {list.map((item, i) => {
                    return (
                        <div
                            key={i}
                            style={{
                                borderColor: selectedItems.includes(item)
                                    ? '#20bd5f'
                                    : 'transparent',
                            }}
                            onClick={() => {
                                if (selectedItems.includes(item)) {
                                    setSelectedItems((prev) => {
                                        return prev.filter(
                                            (filterItem) => filterItem !== item
                                        );
                                    });
                                } else {
                                    setSelectedItems((prev) => [...prev, item]);
                                }
                            }}
                        >
                            {item}
                        </div>
                    );
                })}
            </div>
            <div>
                <div className={styles.actionButtonWrap} onClick={handleSubmit}>
                    <Button text='Next' />
                </div>

                <p className={styles.bottomParagraph}>
                    By entering your number, you’re agreeing to our Terms of
                    Service and Privacy Policy. Thanks!
                </p>
            </div>
        </Card>
    );
};

export default StepPreferences;
