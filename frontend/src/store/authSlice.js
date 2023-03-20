import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuth: false,
    user: null,
    otp: {
        phone: '',
        hash: '',
    },
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action) => {
            const { user } = action.payload;
            state.user = user;
            if (user === null) {
                state.isAuth = false;
            } else {
                state.isAuth = true;
            }
        },
        setOtp: (state, action) => {
            const { phone, hash } = action.payload;
            state.otp.phone = phone;
            state.otp.hash = hash;
        },
        addLike: (state, action) => {
            const { podcast } = action.payload;
            state.user.liked.push(podcast);
        },
        removeLike: (state, action) => {
            const { id } = action.payload;
            state.user.liked = state.user.liked.filter(
                (item) => item._id !== id
            );
        },
    },
});

export const { setAuth, setOtp, addLike, removeLike } = authSlice.actions;

export default authSlice.reducer;
