import { useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import EventList from './EventList';
import { sampleData } from '../../../app/api/sampleData';
import { AppEvent } from '../../../app/types/event';

export default function EventDashboard() {
    const [events, setEvents] = useState<AppEvent[]>([]);
    const initialiseEvents = () => setEvents(sampleData);
    useEffect(initialiseEvents, []);
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
