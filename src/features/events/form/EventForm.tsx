import { Button, Form, Header, Segment } from 'semantic-ui-react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useAppDispatch, useAppSelector } from '../../../app/store/store';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../app/store/store';
import { createId } from '@paralleldrive/cuid2';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { categoryOptions } from './categoryOptions';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function EventForm() {
    const { register, handleSubmit, control, setValue, formState: { errors, isValid, isSubmitting } } = useForm({
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
            <Header content={'Event Details'} sub color='teal' />
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Input
                    placeholder='Event Title'
                    defaultValue={event?.title || ''}
                    {...register('title', { required: true })}
                    error={errors.title && 'Title is required'}
                />
                <Controller
                    name='category'
                    control={control}
                    rules={{
                        required: 'Category is required'
                    }}
                    defaultValue={event?.category}
                    render={({ field }) => (
                        <Form.Select
                            options={categoryOptions}
                            placeholder='Category'
                            {...field}
                            error={errors.category && errors.category.message}
                            clearable
                            onChange={(_, d) => setValue('category', d.value, { shouldValidate: true })}
                        />
                    )}
                />
                <Form.TextArea
                    placeholder='Description'
                    defaultValue={event?.description || ''}
                    {...register('description', { required: 'Description is required' })}
                    error={errors.description && errors.description.message}
                />
                <Header sub content='Location Details' color='teal' />
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
                <Form.Field>
                    <Controller
                        name='date'
                        control={control}
                        rules={{ required: 'Date is required' }}
                        defaultValue={event && new Date(event.date) || null}
                        render={({ field }) => (
                            <DatePicker
                                selected={field.value}
                                onChange={value => setValue('date', value, { shouldValidate: true })}
                                showTimeSelect
                                timeCaption='time'
                                dateFormat='dd/MM/yyyy HH:mm'
                                placeholderText='Event Date/Time'
                            />
                        )}
                    />
                </Form.Field>

                <Button type='submit' floated='right' positive content='Submit' disabled={!isValid} loading={isSubmitting} />
                <Button type='submit' floated='right' content='Cancel' disabled={isSubmitting} />
            </Form>
        </Segment>
    );
}
