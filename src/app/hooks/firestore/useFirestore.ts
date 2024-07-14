import { useCallback, useEffect, useRef } from 'react';
import { useAppDispatch } from '../../store/store';
import { GenericActions } from '../../store/genericSlice';
import { collection, DocumentData, onSnapshot, QuerySnapshot } from 'firebase/firestore';
import { db } from '../../config/firebase';

type ListenerState = {
    name?: string;
    unsubscribe: () => void;
}

export const useFireStore = <T>(path: string) => {
    const listenersRef = useRef<ListenerState[]>([]);
    const myEffect = () => {
        const listeners = listenersRef.current.length > 0 ? listenersRef.current : null;
        return () => {
            if (listeners) {
                listeners.forEach(listener => listener.unsubscribe());
            }
        }
    }
    useEffect(myEffect, []);
    const dispatch = useAppDispatch();
    const myCallback = (actions: GenericActions<T>) => {
        dispatch(actions.loading());
        const query = collection(db, path);
        const next = (querySnapshot: QuerySnapshot) => {
            const data: DocumentData[] = [];
            if (querySnapshot.empty) {
                dispatch(actions.success([] as unknown as T));
                return;
            }
            querySnapshot.forEach(doc => {
                const obj = { id: doc.id, ...data }
                // console.log(obj);
                // console.log('Data', data);
                console.log('Document', doc);
                data.push(obj);
            });
            dispatch(actions.success(data as unknown as T));
        }
        const error = (error: any) => {
            dispatch(actions.error(error.message));
            console.log('Collection error', error.message);
        }
        const obj = { next, error }
        const listener = onSnapshot(query, obj);
        const listRef = { name: path, unsubscribe: listener }
        listenersRef.current.push(listRef);
    }
    const loadCollection = useCallback(myCallback, [dispatch, path]);
    return { loadCollection }
}
