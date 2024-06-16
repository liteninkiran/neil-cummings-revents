import { ChangeEvent, useState } from 'react';
import { Button, Form, Header, Segment } from 'semantic-ui-react';
import { EventFormInputs } from '../../../app/types/event';

type Props = {
    setFormOpen: (value: boolean) => void;
}

export default function EventForm({ setFormOpen }: Props) {
    const [values, setValues] = useState(intialValues);
    const onSubmit = () => {
        console.log(values);
    }
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    }
    return (
        <Segment clearing>
            <Header content='Create Event' />
            <Form onSubmit={onSubmit}>
                <Form.Field>
                    <input
                        type='text'
                        placeholder='Event Title'
                        name='title'
                        value={values.title}
                        onChange={e => handleInputChange(e)}
                    />
                </Form.Field>
                <Form.Field>
                    <input
                        type='text'
                        placeholder='Category'
                        name='category'
                        value={values.category}
                        onChange={e => handleInputChange(e)}
                    />
                </Form.Field>
                <Form.Field>
                    <input
                        type='text'
                        placeholder='Description'
                        name='description'
                        value={values.description}
                        onChange={e => handleInputChange(e)}
                    />
                </Form.Field>
                <Form.Field>
                    <input
                        type='text'
                        placeholder='City'
                        name='city'
                        value={values.city}
                        onChange={e => handleInputChange(e)}
                    />
                </Form.Field>
                <Form.Field>
                    <input
                        type='text'
                        placeholder='Venue'
                        name='vnue'
                        value={values.venue}
                        onChange={e => handleInputChange(e)}
                    />
                </Form.Field>
                <Form.Field>
                    <input
                        type='text'
                        placeholder='Date'
                        name='date'
                        value={values.date}
                        onChange={e => handleInputChange(e)}
                    />
                </Form.Field>
                <Button type='submit' floated='right' positive content='Submit' />
                <Button type='submit' floated='right' content='Cancel' onClick={() => setFormOpen(false)} />
            </Form>
        </Segment>
    );
}

const intialValues: EventFormInputs = {
    title: '',
    category: '',
    description: '',
    city: '',
    venue: '',
    date: '',
}
