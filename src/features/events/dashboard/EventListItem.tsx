import { Button, Icon, Item, ItemGroup, List, Segment, SegmentGroup } from 'semantic-ui-react';
import { AppEvent } from '../../../app/types/event';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../app/config/firebase';
import EventListAttendee from './EventListAttendee';

type Props = {
    event: AppEvent;
}

export default function EventListItem({ event }: Props) {
    const [loading, setLoading] = useState(false);
    const removeEvent = async () => {
        setLoading(true);
        try {
            await deleteDoc(doc(db, 'events', event.id));
        } catch (error: any) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return (
        <SegmentGroup>
            <Segment>
                <ItemGroup>
                    <Item>
                        <Item.Image size='tiny' circular src={event.hostPhotoURL || '/user.png'} />
                        <Item.Content>
                            <Item.Header>{event.title}</Item.Header>
                            <Item.Description>Hosted by {event.hostedBy}</Item.Description>
                        </Item.Content>
                    </Item>
                </ItemGroup>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {event.date}
                    <Icon name='marker' /> {event.venue}
                </span>
            </Segment>
            <Segment secondary>
                <List horizontal>
                    {
                        event.attendees.map(attendee => 
                            <EventListAttendee key={attendee.id} attendee={attendee} />
                        )
                    }
                </List>
            </Segment>

            <Segment clearing>
                <span>{event.description}</span>
                <Button loading={loading} color='red' floated='right' content='Delete' onClick={removeEvent} />
                <Button color='teal' floated='right' content='View' as={Link} to={`/events/${event.id}`} />
            </Segment>
        </SegmentGroup>
    );
}
