import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


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
        swal({
            title: "Succesful!",
            icon: "success",
            button: "Done",
          });
    }

    return (
        <div className="container">
            <h2>Edit Task</h2>
            {/* <h1>{user}</h1>
            <h2>{id}</h2> */}
       
            <form onSubmit={submitForm}>
                <TextField variant="filled" value={task} onChange={(e) => setTask(e.target.value)}/>
                <br />
                <TextField variant="filled" value={frecuency} onChange={(e) => setFrecuency(e.target.value)}/>
                <br />
                <TextField variant="filled" value={description} onChange={(e) => setDescription(e.target.value)}/>

                <Button variant="contained" type="submit" >Submit</Button>
            </form>
    
        </div>
    )
}

export default EditTask;