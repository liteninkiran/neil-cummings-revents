import { Button } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { increment, decrement, incrementBy } from './testSlice';

export const Scratch = () => {

    const { data } = useAppSelector(state => state.test);
    const dispatch = useAppDispatch();

    return (
        <div>
            <h1>Scratch Page</h1>
            <h3>Data: {data}</h3>
            <Button onClick={() => dispatch(increment())} color='green' content='Increment' />
            <Button onClick={() => dispatch(decrement())} color='red' content='Decrement' />
            <Button onClick={() => dispatch(incrementBy(5))} color='teal' content='Increment By 5' />
        </div>
    );
};
