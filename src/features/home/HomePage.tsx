import { Link } from 'react-router-dom';
import { Button, Container, Header, Icon, Segment, Image } from 'semantic-ui-react';

export default function HomePage() {
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container>
                <Header as='h1' inverted>
                    <Image size='massive' src='/logo.png' alt='Logo' style={{ marginBottom: '12px' }} />
                    Revents
                </Header>
                <Button size='huge' inverted as={Link} to='/events'>
                    Get Started
                    <Icon name='caret right' />
                </Button>
            </Container>
        </Segment>
    );
}
