import { ChangeEvent, useState } from 'react';
import { Button, Form, Header, Segment } from 'semantic-ui-react';
import { AppEvent, EventFormInputs } from '../../../app/types/event';
import { createId } from '@paralleldrive/cuid2';

type Props = {
    selectedEvent: AppEvent | null;
    setFormOpen: (value: boolean) => void;
    addEvent: (event: AppEvent) => void;
    updateEvent: (updateEvent: AppEvent) => void;
}

export default function EventForm({ selectedEvent, setFormOpen, addEvent, updateEvent }: Props) {
    const initialValues = selectedEvent ?? emptyObject;
    const [formValues, setFormValues] = useState(initialValues);
    const onSubmit = () => {
        const extraProps = {
            id: createId(),
            hostedBy: 'Bob',
            attendees: [],
            hostPhotoURL: '',
        }
        const newEvent: AppEvent = { ...formValues, ...extraProps }
        const updatedEvent: AppEvent = { ...selectedEvent, ...formValues }
        selectedEvent ? updateEvent(updatedEvent) : addEvent(newEvent);
        setFormOpen(false);
    }
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }
    return (
        <Segment clearing>
            <Header content={selectedEvent ? 'Update Event' : 'Create Event'} />
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
                <Button type='submit' floated='right' content='Cancel' onClick={() => setFormOpen(false)} />
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
