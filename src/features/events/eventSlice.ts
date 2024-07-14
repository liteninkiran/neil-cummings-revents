import { PayloadAction } from '@reduxjs/toolkit';
import { AppEvent } from '../../app/types/event';
import { Timestamp } from 'firebase/firestore';
import { createGenericSlice, GenericActions, GenericState } from '../../app/store/genericSlice';

type State = { data: AppEvent[] }

const name = 'events';
const initialState: State = { data: [] }
const getDate = (date: Timestamp) => date.toDate().toISOString();
const mapDate = (event: any): AppEvent => ({ ...event, date: getDate(event.date) });
const reducer = (state: any, action: PayloadAction<AppEvent[]>) => { state.data = action.payload; state.status = 'finished'; }
const prepare = (events: any[]) => ({ payload: events.map<AppEvent>(mapDate) });
const setEvts = { reducer, prepare }
const reducers = { success: setEvts }
const slice = { name, initialState: initialState as GenericState<AppEvent[]>, reducers }

export const eventSlice = createGenericSlice(slice);
export const actions = eventSlice.actions as GenericActions<AppEvent[]>;
