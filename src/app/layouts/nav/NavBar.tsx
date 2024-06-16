import { NavLink } from "react-router-dom";
import { Button, Container, Menu, MenuItem } from "semantic-ui-react";

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

                <MenuItem position='right'>
                    <Button basic inverted={true} content='Login' />
                    <Button basic inverted={true} content='Register' style={{ marginLeft: '0.5em' }} />
                </MenuItem>

            </Container>
        </Menu>
    );
}
