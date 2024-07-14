import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppEvent } from '../../app/types/event';
import { Timestamp } from 'firebase/firestore';

type State = {
    events: AppEvent[];
}

const initialState: State = {
    events: [],
}

export const eventSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        setMyEvents: {
            reducer: (state, action: PayloadAction<AppEvent[]>) => { state.events = action.payload; },
            prepare: (events: AppEvent[]) =>
                ({ payload: events.map((e: any) =>
                    ({ ...e, date: (e.date as Timestamp).toDate().toISOString() })) }),
        },
    },
});

export const {setMyEvents} = eventSlice.actions;
