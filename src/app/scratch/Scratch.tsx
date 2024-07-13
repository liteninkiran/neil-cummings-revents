import { useAppSelector } from "../store/store";

export const Scratch = () => {

    const { data } = useAppSelector(state => state.test);

    return (
        <div>
            <h1>Scratch Page</h1>
            <h3>Data: {data}</h3>
        </div>
    );
};
