import { Button, Form, Header, Segment } from 'semantic-ui-react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useAppDispatch, useAppSelector } from '../../../app/store/store';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../app/store/store';
import { createId } from '@paralleldrive/cuid2';
import { FieldValues, useForm } from 'react-hook-form';

export default function EventForm() {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        mode: 'onTouched',
    });
    const params = useParams();
    const id = params.id ?? createId();
    const event = useAppSelector(state => state.events.events.find(e => e.id === id));
    // const dispatch = useAppDispatch();
    // const navigate = useNavigate();
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
                    {...register('title', { required: true })}
                    error={errors.title && 'Title is required'}
                />
                <Form.Input
                    placeholder='Category'
                    defaultValue={event?.category || ''}
                    {...register('category', { required: 'Category is required' })}
                    error={errors.category && errors.category.message}
                />
                <Form.Input
                    placeholder='Description'
                    defaultValue={event?.description || ''}
                    {...register('description', { required: 'Description is required' })}
                    error={errors.description && errors.description.message}
                />
                <Form.Input
                    placeholder='City'
                    defaultValue={event?.city || ''}
                    {...register('city', { required: 'City is required' })}
                    error={errors.city && errors.city.message}
                />
                <Form.Input
                    placeholder='Venue'
                    defaultValue={event?.venue || ''}
                    {...register('venue', { required: 'Venue is required' })}
                    error={errors.venue && errors.venue.message}
                />
                <Form.Input
                    type='date'
                    placeholder='Date'
                    defaultValue={event?.date || ''}
                    {...register('date', { required: 'Date is required' })}
                    error={errors.date && errors.date.message}
                />

                <Button type='submit' floated='right' positive content='Submit' disabled={!isValid} />
                <Button type='submit' floated='right' content='Cancel' />
            </Form>
        </Segment>
    );
}
