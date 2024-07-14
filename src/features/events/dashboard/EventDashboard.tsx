import { useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import { collection, FirestoreError, onSnapshot, query, QuerySnapshot } from 'firebase/firestore';
import { db } from '../../../app/config/firebase';
import { useAppDispatch, useAppSelector } from '../../../app/store/store';
import { AppEvent } from '../../../app/types/event';
import { actions } from '../eventSlice';
import EventList from './EventList';
import LoadingComponent from '../../../app/layouts/LoadingComponent';

export default function EventDashboard() {
    const { data: events } = useAppSelector(state => state.events);
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);
    const getData = () => {
        const obsNext = (querySnapshot: QuerySnapshot) => {
            const evts: AppEvent[] = [];
            querySnapshot.forEach(doc => {
                const data = doc.data() as AppEvent;
                evts.push({ ...data, id: doc.id });
            });
            dispatch(actions.success(evts));
            setLoading(false);
        }
        const obsError = (err: FirestoreError) => {
            console.log('EventDashboard', err);
            setLoading(false);
        }
        const obs = { next: obsNext, error: obsError }
        const qry = query(collection(db, 'events'));
        const unsubscribe = onSnapshot(qry, obs);
        return () => unsubscribe();
    }
    useEffect(getData, [dispatch]);

    if (loading) {
        return (<LoadingComponent />);
    }

    return (
        <Grid>
            <Grid.Column width={10}>
                <EventList events={events} />
            </Grid.Column>
            <Grid.Column width={6}>
                <h2>Filters</h2>
            </Grid.Column>
        </Grid>
    );
}
