import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppEvent } from '../../app/types/event';
import { Timestamp } from 'firebase/firestore';

type State = {
    events: AppEvent[]
}

const initialState: State = {
    events: [],
}

export const eventSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        createEvent: (state, action) => { state.events.push(action.payload); },
        updateEvent: (state, action) => { state.events[state.events.findIndex(evt => evt.id === action.payload.id)] = action.payload; },
        deleteEvent: (state, action) => { state.events.splice(state.events.findIndex(evt => evt.id === action.payload), 1) },
        setMyEvents: {
            reducer: (state, action: PayloadAction<AppEvent[]>) => { state.events = action.payload; },
            prepare: (events) =>
                ({ payload: events.map((e: any) =>
                    ({ ...e, date: (e.date as Timestamp).toDate().toISOString() })) }),
        },
    },
});

export const {createEvent, updateEvent, deleteEvent, setMyEvents} = eventSlice.actions;
