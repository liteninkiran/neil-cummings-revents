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
    selectEvent: (event: AppEvent | null) => void;
}

export default function EventDashboard({
    formOpen,
    selectedEvent,
    setFormOpen,
    selectEvent,
}: Props) {
    const [events, setEvents] = useState<AppEvent[]>([]);
    const initialiseEvents = () => setEvents(sampleData);
    const addEvent = (event: AppEvent) => setEvents(prev => [...prev, event]);
    const updateEvent = (updateEvent: AppEvent) => {
        setEvents(events.map(evt => evt.id === updateEvent.id ? updateEvent : evt));
        selectEvent(null);
        setFormOpen(false);
    }
    useEffect(initialiseEvents, []);
    return (
        <Grid>
            <Grid.Column width={10}>
                <EventList events={events} selectEvent={selectEvent} />
            </Grid.Column>
            <Grid.Column width={6}>
                {
                    formOpen ? (
                        <EventForm
                            setFormOpen={setFormOpen}
                            updateEvent={updateEvent}
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
