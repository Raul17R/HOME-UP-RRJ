import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

function Task () {
    const taskList = useSelector (store => store.taskList);
    const [taskName, setTaskName] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        fetchTask();
    }, []);

    const fetchTask = () => {
        axios.get('/api/task').then((response) = >{
            dispatch({ type:'SET_TASK', payload: response.data})
        })
    }
}