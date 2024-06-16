import { Outlet } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import NavBar from './nav/NavBar';

function App() {
    return (
        <>
            <NavBar />
            <Container className='main'>
                <Outlet />
            </Container>
        </>
    );
}

export default App;
