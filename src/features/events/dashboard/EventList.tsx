import EventListItem from './EventListItem';

type Props = {
    events: object[];
}

export default function EventList(props: Props) {
    return (
        <>
            {
                props.events.map((event: any) => 
                    <EventListItem key={event.id} event={event} />
                )
            }
        </>
    );
}
