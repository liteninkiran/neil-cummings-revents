import { Button, MenuItem } from 'semantic-ui-react';

export default function SignedOutButtons() {
    return (
        <MenuItem position='right'>
            <Button basic inverted={true} content='Login' />
            <Button basic inverted={true} content='Register' style={{ marginLeft: '0.5em' }} />
        </MenuItem>
    );
}
