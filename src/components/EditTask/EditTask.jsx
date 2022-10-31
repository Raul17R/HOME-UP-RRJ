import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';


function EditTask() {
    const user = useSelector((store) => store.user);
    const { id } = useParams();
    const dispatch = useDispatch();
    const [task, setTask] = useState("");
    const [frecuency, setFrecuency] = useState("");
    const [description, setDescription] = useState("");


    useEffect(() => {
        if(id) {
        axios.get(`/api/task/${ id }`)
        .then (response => {
            const task = response.data;
            setTask(task.task);
            setFrecuency(task.frecuency);
            setDescription(task.description)
        }).catch(error => {
            console.log(error);
            alert('Something went wrong')
        })
    }
    },[id]);

    const submitForm = (e) => {
        e.preventDefault();
        dispatch({type: 'EDIT_TASK', payload: {task, frecuency, description, id}, history})
    }

    return (
        <div className="container">
            <h2>Edit Task</h2>
            {/* <h1>{user}</h1>
            <h2>{id}</h2> */}

            <form onSubmit={submitForm}>
                <input value={task} onChange={(e) => setTask(e.target.value)}/>
                <input value={frecuency} onChange={(e) => setFrecuency(e.target.value)}/>
                <input value={description} onChange={(e) => setDescription(e.target.value)}></input>

                <input type="submit" />
            </form>
        </div>
    )
}

export default EditTask;