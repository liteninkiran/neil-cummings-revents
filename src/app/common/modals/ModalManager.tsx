/* eslint-disable @typescript-eslint/no-explicit-any */
import TestModal from '../../scratch/TestModal';

import { useAppSelector } from '../../store/store'

export default function ModalManager() {
    const modalLookup = { TestModal }
    const {type, data, open} = useAppSelector(state => state.modals);
    let renderedModal;

    if (open && type) {
        const ModalComponent = (modalLookup as any)[type];
        renderedModal = <ModalComponent data={data} />
    }

    return (
        <span>{renderedModal}</span>
    )
}
