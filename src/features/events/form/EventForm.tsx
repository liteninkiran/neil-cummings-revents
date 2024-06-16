import { ChangeEvent, useState } from 'react';
import { Button, Form, Header, Segment } from 'semantic-ui-react';
import { EventFormInputs } from '../../../app/types/event';

export default function EventForm() {
    const initialValues = emptyObject;
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
            <Header content={'Create Event'} />
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
