import { NavLink } from 'react-router-dom';
import { Button, Container, Menu, MenuItem } from 'semantic-ui-react';
import SignedOutButtons from './SignedOutButtons';
import SignedInMenu from './SignedInMenu';
import { useAppSelector } from '../../store/store';
import { sampleData } from '../../api/sampleData';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

export default function NavBar() {
    const { authenticated: auth } = useAppSelector(state => state.auth);
    const seedData = () => {
        sampleData.forEach(async event => {
            const { id, ...rest } = event;
            await setDoc(doc(db, 'events', id), { ...rest });
        });
    }
    return (
        <Menu inverted={true} fixed='top'>
            <Container>
                <MenuItem header as={NavLink} to='/'>
                    <img src='/logo.png' alt='logo' />
                    Revents
                </MenuItem>

                <MenuItem name='Events' as={NavLink} to='/events' />

                <MenuItem name='Scratch' as={NavLink} to='/scratch' />

                <MenuItem>
                    <Button
                        floated='right'
                        positive={true}
                        inverted={true}
                        content='Create Event'
                        as={NavLink}
                        to='/createEvent'
                    />
                </MenuItem>

                {
                    import.meta.env.DEV && (
                        <MenuItem>
                            <Button inverted={true} color='teal' content='Seed Data' onClick={seedData} />
                        </MenuItem>
                    )
                }

                {
                    auth ? (
                        <SignedInMenu />
                    ) : (
                        <SignedOutButtons />
                    )
                }


            </Container>
        </Menu>
    );
}
