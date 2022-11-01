// import  from "react";
// import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import swal from 'sweetalert';
import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

// import Avatar from '@mui/material/Avatar';



import "./UserPage.css";
import { element } from "prop-types";

function UserPage() {
  const taskList = useSelector((store) => store.taskList);
  // const [taskName, setTaskName] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const {id} = useParams(); 

  useEffect(() => {
    fetchTask();
    // dispatch({type: ''})
  }, []);

  const addTaskButton = () =>{
    history.push('/addTask');
  }

  const editTask = (id) => {
    history.push(`/editTask/${id}`);
  }

  const completeTask = (taskId) => {
    // history.push('/completeTask');
   
    const elem = document.getElementById(taskId);
    console.log(elem);
    taskId === document.getElementById('id')
      elem.parentNode.removeChild(elem);
    
    swal({
      title: "Are you sure?",
      text: "Are you sure you're done with this task?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      // button:"Done",
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Your Task has been completed!", {
          icon: "success",
        });
      } else {
        swal("Cancelled");
      }
    });
  //  taskDone();
  }
  
  // const taskDone = () => {
  //   const green = document.getElementById("taskDone");
  //   element.className = "myClass";
  // }

  const fetchTask = () => {
    axios
      .get("/api/task")
      .then((response) => {
        dispatch({ type: "SET_TASK", payload: response.data });
      })
      .catch((error) => {
        console.log(error);
        // alert("Something went wrong in fetch task, userPage.jsx");
      });
  };

  return (
    <div className="container">
      {/* <Avatar src="/broken-image.jpg" />{user.name} */}
      <h2>Welcome, {user.username}!</h2>
      <Button variant="contained" onClick={addTaskButton}>Add New Task</Button>
      <table className="simpleTable">
        <thead>
          <tr>
            <th>Task: </th>
            <th>Last Completed: </th>
            <th>Description: </th>
            <th>Log Completed Task</th>
          </tr>
        </thead>
        <tbody>
          {taskList.map((task) => {
            return (
              <tr key={task.id}>
                <td>{task.task}</td>
                <td>{task.frecuency}</td>
                <td>{task.description}</td>
                <td>
                  

                  <Button variant="contained" id={task.id} onClick={() => completeTask (task.id)}>Complete</Button>
                  <Button variant="outlined" onClick={() => editTask(task.id)}> Edit</Button> 
                  {/* <p>Completed</p> */}
          
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
