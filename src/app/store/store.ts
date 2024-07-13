import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux'
import { testSlice } from '../scratch/testSlice';
import { eventSlice } from '../../features/events/eventSlice';
import { modalSlice } from '../common/modals/modalSlice';

export const store = configureStore({
    reducer: {
        test: testSlice.reducer,
        events: eventSlice.reducer,
        modals: modalSlice.reducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
