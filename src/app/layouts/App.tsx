import { Button } from 'semantic-ui-react';

function App() {
    return (
        <div>
            <h1>
                Welcome to Revents
            </h1>
            <button className='ui icon red button'><i className='user icon'></i> CSS Button</button>
            <Button icon='smile' content='React Button' color='green' label='Label' />
        </div>
    );
}

export default App;
