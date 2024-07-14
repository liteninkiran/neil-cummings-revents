import { Button, Form, Header, Segment } from 'semantic-ui-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../app/store/store';
import { Controller, FieldValues, useForm, UseFormProps } from 'react-hook-form';
import { categoryOptions } from './categoryOptions';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AppEvent } from '../../../app/types/event';
import { collection, doc, setDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { db } from '../../../app/config/firebase';

export default function EventForm() {
    const formOptions: UseFormProps = {
        mode: 'onTouched',
    }
    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: {
            errors,
            isValid,
            isSubmitting
        }
    } = useForm(formOptions);
    const { id } = useParams();
    const event = useAppSelector(state => state.events.events.find(e => e.id === id));
    const navigate = useNavigate();
    const getDate = (dt: string) => Timestamp.fromDate(dt as unknown as Date);
    const updateEvent = async (data: AppEvent) => {
        if (!event) return;
        const docRef = doc(db, 'events', event.id);
        const uData = { ...data, date: getDate(data.date) }
        await updateDoc(docRef, uData);
    }
    const createEvent = async (data: FieldValues) => {
        const newEventRef = doc(collection(db, 'events'));
        const date = getDate(data.date.toString());
        const extraProps = {
            id,
            hostedBy: 'Bob',
            attendees: [],
            hostPhotoURL: '',
            date,
        }
        const nData = { ...data, extraProps }
        await setDoc(newEventRef, nData);
        return newEventRef;
    }
    const onSubmit = async (data: FieldValues) => {
        try {
            if (event) {
                await updateEvent({ ...event, ...data });
                navigate(`/events/${event.id}`);
            } else {
                const ref = await createEvent(data);
                navigate(`/events/${ref.id}`);
            }
        } catch (error) {
            console.log(error);
        }
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
