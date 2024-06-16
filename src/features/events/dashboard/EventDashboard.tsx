import { useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import EventList from './EventList';
import EventForm from '../form/EventForm';
import { sampleData } from '../../../app/api/sampleData';
import { AppEvent } from '../../../app/types/event';

type Props = {
    formOpen: boolean;
    setFormOpen: (value: boolean) => void;
}

export default function EventDashboard({ formOpen, setFormOpen }: Props) {
    const [events, setEvents] = useState<AppEvent[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<AppEvent | null>(null);
    const initialiseEvents = () => setEvents(sampleData);
    const addEvent = (event: AppEvent) => setEvents(prev => [...prev, event]);
    const handleSelectedEvent = (event: AppEvent) => {
        setSelectedEvent(event);
        setFormOpen(true);
    }
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
                        />
                    ) : (
                        null
                    )
                }
            </Grid.Column>
        </Grid>
    );
}
