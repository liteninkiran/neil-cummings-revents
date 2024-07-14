import { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { actions } from '../eventSlice';
import { useFireStore } from '../../../app/hooks/firestore/useFirestore';
import { useAppSelector } from '../../../app/store/store';
import EventList from './EventList';
import LoadingComponent from '../../../app/layouts/LoadingComponent';

export default function EventDashboard() {
    const { data: events, status } = useAppSelector(state => state.events);
    const { loadCollection } = useFireStore('events');
    const getData = (): void => loadCollection(actions);
    useEffect(getData, [loadCollection]);

    return status === 'loading' ? (
        <LoadingComponent />
    ) : (
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
