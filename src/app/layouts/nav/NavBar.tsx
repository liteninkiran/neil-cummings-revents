import { NavLink } from "react-router-dom";
import { Button, Container, Menu, MenuItem } from "semantic-ui-react";
import SignedOutButtons from "./SignedOutButtons";
import SignedInMenu from "./SignedInMenu";

export default function NavBar() {
    return (
        <Menu inverted={true} fixed='top'>
            <Container>
                <MenuItem header as={NavLink} to='/'>
                    <img src='/logo.png' alt='logo' />
                    Revents
                </MenuItem>

                <MenuItem name='Events' as={NavLink} to='/events' />

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

                <SignedOutButtons />
                <SignedInMenu />

            </Container>
        </Menu>
    );
}
