import React from 'react';
import  TodoList  from './components/TodoList';
import { Container } from '@mui/material';

const App: React.FC = () => {
    return (
        <Container maxWidth='md'>
            <TodoList />
        </Container>
    );
};

export default App;
