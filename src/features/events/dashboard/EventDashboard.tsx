import { useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import EventList from './EventList';
import EventForm from '../form/EventForm';
import { sampleData } from '../../../app/api/sampleData';
import { AppEvent } from '../../../app/types/event';

type Props = {
    formOpen: boolean;
    selectedEvent: AppEvent | null;
    setFormOpen: (value: boolean) => void;
    handleSelectedEvent: (event: AppEvent) => void;
}

export default function EventDashboard({
    formOpen,
    selectedEvent,
    setFormOpen,
    handleSelectedEvent,
}: Props) {
    const [events, setEvents] = useState<AppEvent[]>([]);
    const initialiseEvents = () => setEvents(sampleData);
    const addEvent = (event: AppEvent) => setEvents(prev => [...prev, event]);

    useEffect(initialiseEvents, []);
    return (
        <Grid>
            <Grid.Column width={10}>
                <EventList events={events} selectEvent={handleSelectedEvent} />
            </Grid.Column>
            <Grid.Column width={6}>
                {
                    formOpen ? (
                        <EventForm
                            setFormOpen={setFormOpen}
                            addEvent={appEvent => addEvent(appEvent)}
                            selectedEvent={selectedEvent}
                            key={selectedEvent ? selectedEvent.id : 'create' }
                        />
                    ) : (
                        null
                    )
                }
            </Grid.Column>
        </Grid>
    );
}
