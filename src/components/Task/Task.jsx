import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

function Task() {
    const taskList = useSelector (store => store.taskList);
    const [taskName, setTaskName] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        fetchTask();
    }, []);

    const fetchTask = () => {
        axios.get('/api/task').then((response) => {
            dispatch({ type:'SET_TASK', payload: response.data})
        }).catch((error) => {
            console.log(error);
            alert('Something went wrong in fetch task, task.jsx');
        });
    }


    return(
        <div>
            <h2>Tasks: </h2>
            <pre>{JSON.stringify=(taskList)}</pre>
            {
                taskList.map(task => {
                    return <div key={task.id}>{task.name}</div>
                })
            }
        </div>
    )
}
export default Task;