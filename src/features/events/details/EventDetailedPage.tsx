import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/store/store';
import { Grid } from 'semantic-ui-react';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedSidebar from './EventDetailedSidebar';
import { doc, DocumentSnapshot, FirestoreError, onSnapshot } from 'firebase/firestore';
import { db } from '../../../app/config/firebase';
import { setMyEvents } from '../eventSlice';
import { toast } from 'react-toastify';
import LoadingComponent from '../../../app/layouts/LoadingComponent';
import { AppEvent } from '../../../app/types/event';

export default function EventDetailedPage() {
    const { id } = useParams();
    const event = useAppSelector(state => state.events.events.find(e => e.id === id));
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);
    const myEffect = () => {
        if (!id) return;
        const next = (snapshot: DocumentSnapshot) => {
            const e: AppEvent = {
                ...snapshot.data() as unknown as AppEvent,
                id: snapshot.id,
            }
            dispatch(setMyEvents([e]));
            setLoading(false);
        }
        const error = (error: FirestoreError) => {
            console.log('EventDetailedPage', error);
            setLoading(false);
            toast.error(error.message);
        }
        const observer = { next, error }
        const unsubscribe = onSnapshot(doc(db, 'events', id), observer);
        return () => unsubscribe();
    }
    useEffect(myEffect, [id, dispatch]);

    if (!event) {
        return (
            <h2>Event Not Found</h2>
        );
    }

    if (loading) {
        return (
            <LoadingComponent />
        );
    }

    return (
        <Grid>
            <Grid.Column width={10}>
                <EventDetailedHeader event={event} />
                <EventDetailedInfo event={event} />
                <EventDetailedChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <EventDetailedSidebar />
            </Grid.Column>
        </Grid>
    );
}
