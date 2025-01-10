import React, { useState } from 'react';
import styled from 'styled-components';
import { Todo } from '../models/todo-model';
import { Checkbox, Button, TextField, Box, Typography } from '@mui/material';

interface TodoProps {
    todo: Todo;
    onDelete: (id: string) => void;
    onToggle: (id: string) => void;
    onEdit: (id: string, newTitle: string) => void;
}

// Styled-components для контейнера и текста
const TodoContainer = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
    background-color: #f9f9f9;
    max-width: 500px;
    width: 100%;
`;

const TodoText = styled(Typography)<{ completed: boolean }>`
    flex-grow: 1;
    font-size: 14px;
    text-decoration: ${props => (props.completed ? 'line-through' : 'none')};
    color: ${props => (props.completed ? '#888' : '#333')};
    margin-right: 8px;
`;

const TodoButtons = styled(Box)`
    display: flex;
    gap: 8px;
`;

const TodoComponent: React.FC<TodoProps> = ({ todo, onDelete, onToggle, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(todo.title);

    const handleSave = () => {
        if (newTitle.trim()) {
            onEdit(todo.id, newTitle);
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setNewTitle(todo.title);
        setIsEditing(false);
    };

    return (
        <TodoContainer>
            <Checkbox checked={todo.completed} onChange={() => onToggle(todo.id)} color='primary' size='small' />
            {isEditing ? (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexGrow: 1,
                        justifyContent: 'space-between', // Это выравнивает кнопки
                    }}
                >
                    <TextField
                        variant='outlined'
                        value={newTitle}
                        onChange={e => setNewTitle(e.target.value)}
                        size='small'
                        fullWidth
                        sx={{ marginRight: 1 }}
                    />
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button variant='contained' color='success' size='small' onClick={handleSave}>
                            Save
                        </Button>
                        <Button variant='outlined' color='error' size='small' onClick={handleCancel}>
                            Cancel
                        </Button>
                    </Box>
                </Box>
            ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                    <TodoText variant='body2' completed={todo.completed}>
                        {todo.title}
                    </TodoText>
                    <TodoButtons>
                        <Button variant='outlined' color='primary' size='small' onClick={() => setIsEditing(true)}>
                            Edit
                        </Button>
                        <Button variant='outlined' color='error' size='small' onClick={() => onDelete(todo.id)}>
                            Delete
                        </Button>
                    </TodoButtons>
                </Box>
            )}
        </TodoContainer>
    );
};

export default TodoComponent;
