import { Button, Form, Header, Segment } from 'semantic-ui-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/store/store';
import { createId } from '@paralleldrive/cuid2';
import { FieldValues, useForm } from 'react-hook-form';

export default function EventForm() {
    const { register, handleSubmit } = useForm();
    const params = useParams();
    const id = params.id ?? createId();
    const event = useAppSelector(state => state.events.events.find(e => e.id === id));
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const onSubmit = (data: FieldValues) => {
        console.log(data);
        // const extraProps = {
        //     id,
        //     hostedBy: 'Bob',
        //     attendees: [],
        //     hostPhotoURL: '',
        // }
        // const newEvent: AppEvent = { ...formValues, ...extraProps }
        // const updatedEvent: AppEvent = { ...event, ...formValues }
        // event ? dispatch(updateEvent(updatedEvent)) : dispatch(createEvent(newEvent));
        // navigate(`/events/${id}`);
    }
    return (
        <Segment clearing>
            <Header content={event ? 'Update Event' : 'Create Event'} />
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Input
                    placeholder='Event Title'
                    defaultValue={event?.title || ''}
                    {...register('title')}
                />
                <Form.Input
                    placeholder='Category'
                    defaultValue={event?.category || ''}
                    {...register('category')}
                />
                <Form.Input
                    placeholder='Description'
                    defaultValue={event?.description || ''}
                    {...register('description')}
                />
                <Form.Input
                    placeholder='City'
                    defaultValue={event?.city || ''}
                    {...register('city')}
                />
                <Form.Input
                    placeholder='Venue'
                    defaultValue={event?.venue || ''}
                    {...register('venue')}
                />
                <Form.Input
                    type='date'
                    placeholder='Date'
                    defaultValue={event?.date || ''}
                    {...register('date')}
                />

                <Button type='submit' floated='right' positive content='Submit' />
                <Button type='submit' floated='right' content='Cancel' />
            </Form>
        </Segment>
    );
}
