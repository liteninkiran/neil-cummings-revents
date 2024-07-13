import { ChangeEvent, useState } from 'react';
import { Button, Form, Header, Segment } from 'semantic-ui-react';
import { AppEvent, EventFormInputs } from '../../../app/types/event';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/store/store';
import { createEvent, updateEvent } from '../eventSlice';
import { createId } from '@paralleldrive/cuid2';

export default function EventForm() {
    const params = useParams();
    const id = params.id ?? createId();
    const event = useAppSelector(state => state.events.events.find(e => e.id === id));
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const initialValues = event ?? emptyObject;
    const [formValues, setFormValues] = useState(initialValues);
    const onSubmit = () => {
        const extraProps = {
            id,
            hostedBy: 'Bob',
            attendees: [],
            hostPhotoURL: '',
        }
        const newEvent: AppEvent = { ...formValues, ...extraProps }
        const updatedEvent: AppEvent = { ...event, ...formValues }
        event ? dispatch(updateEvent(updatedEvent)) : dispatch(createEvent(newEvent));
        navigate(`/events/${id}`);
    }
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }
    return (
        <Segment clearing>
            <Header content={event ? 'Update Event' : 'Create Event'} />
            <Form onSubmit={onSubmit}>
                <Form.Field>
                    <input
                        type='text'
                        placeholder='Event Title'
                        name='title'
                        value={formValues.title}
                        onChange={e => handleInputChange(e)}
                    />
                </Form.Field>
                <Form.Field>
                    <input
                        type='text'
                        placeholder='Category'
                        name='category'
                        value={formValues.category}
                        onChange={e => handleInputChange(e)}
                    />
                </Form.Field>
                <Form.Field>
                    <input
                        type='text'
                        placeholder='Description'
                        name='description'
                        value={formValues.description}
                        onChange={e => handleInputChange(e)}
                    />
                </Form.Field>
                <Form.Field>
                    <input
                        type='text'
                        placeholder='City'
                        name='city'
                        value={formValues.city}
                        onChange={e => handleInputChange(e)}
                    />
                </Form.Field>
                <Form.Field>
                    <input
                        type='text'
                        placeholder='Venue'
                        name='venue'
                        value={formValues.venue}
                        onChange={e => handleInputChange(e)}
                    />
                </Form.Field>
                <Form.Field>
                    <input
                        type='date'
                        placeholder='Date'
                        name='date'
                        value={formValues.date}
                        onChange={e => handleInputChange(e)}
                    />
                </Form.Field>
                <Button type='submit' floated='right' positive content='Submit' />
                <Button type='submit' floated='right' content='Cancel' />
            </Form>
        </Segment>
    );
}

const emptyObject: EventFormInputs = {
    title: '',
    category: '',
    description: '',
    city: '',
    venue: '',
    date: '',
    attendees: [],
}
