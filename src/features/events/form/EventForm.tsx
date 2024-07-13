import { ChangeEvent, useState } from 'react';
import { Button, Form, Header, Segment } from 'semantic-ui-react';
import { EventFormInputs } from '../../../app/types/event';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../app/store/store';

export default function EventForm() {
    const { id } = useParams();
    const event = useAppSelector(state => state.events.events.find(e => e.id === id));

    const initialValues = event ?? emptyObject;
    const [formValues, setFormValues] = useState(initialValues);
    const onSubmit = () => {
        console.log(formValues);
        // const extraProps = {
        //     id: createId(),
        //     hostedBy: 'Bob',
        //     attendees: [],
        //     hostPhotoURL: '',
        // }
        // const newEvent: AppEvent = { ...formValues, ...extraProps }
        // const updatedEvent: AppEvent = { ...selectedEvent, ...formValues }
        // selectedEvent ? updateEvent(updatedEvent) : addEvent(newEvent);
        // setFormOpen(false);
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
