import { Button, Form } from 'semantic-ui-react';
import { FieldValues, useForm, UseFormProps } from 'react-hook-form';
import { useAppDispatch } from '../../app/store/store';
import { closeModal } from '../../app/common/modals/modalSlice';
import { signIn } from './authSlice';
import ModalWrapper from '../../app/common/modals/ModalWrapper';

export default function LoginForm() {
    const formOptions: UseFormProps = {
        mode: 'onTouched',
    }
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, isValid, isDirty, errors },
    } = useForm(formOptions);
    const dispatch = useAppDispatch();
    const onSubmit = (data: FieldValues) => {
        dispatch(signIn(data));
        dispatch(closeModal());
    }
    const email = {
        options: {
            required: true,
            // eslint-disable-next-line no-useless-escape
            pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        },
        errors: {
            required: (errors.email?.type === 'required' && 'Email is required'),
            type: (errors.email?.type === 'pattern' && 'Email is invalid'),
        }
    }
    const password = {
        options: { required: true },
        errors: errors.password && 'Password is required',
    }

    return (
        <ModalWrapper header='Sign into re-vents'>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Input
                    defaultValue=''
                    placeholder='Email address'
                    {...register('email', email.options)}
                    error={email.errors.required || email.errors.type}
                />
                <Form.Input
                    type='password'
                    defaultValue=''
                    placeholder='Password'
                    {...register('password', password.options)}
                    error={password.errors}
                />
                <Button
                    loading={isSubmitting}
                    disabled={!isValid || !isDirty || isSubmitting}
                    type='submit'
                    size='large'
                    color='teal'
                    content='Login'
                    fluid
                />
            </Form>
        </ModalWrapper>
    );
}
