// import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom';
import * as React from 'react';
import Button from '@mui/material/Button';


 


function AddTask() {
  const user = useSelector((store) => store.user);
  const [newTask, setNewTask] = useState("");
  const [newFrequency, setNewFrecuency] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const taskList = useSelector((store) => store.taskList);
  const history = useHistory();
  const { id } = useParams();
  // console.log(id);




  const editTask = (id) => {
    history.push(`/editTask/${ id }`);
    // console.log(id);
  };

  const fetchTask = () => {
    axios
      .get(`/api/task/`)
      .then((response) => {
        dispatch({ type: "SET_TASK", payload: response.data });
      })
      .catch((error) => {
        console.log(error);
        // alert("Something went wrong in fetch task, userPage.jsx");
      });
  };
  const dispatch = useDispatch();

  

  const addNewTask = () => {
    // e.preventDefault();
    console.log(newTask);
    axios
      .post("/api/addTask", {
        task: newTask,
        frequency: newFrequency,
        description: newDescription,
      })
      .then(() => {
        fetchTask();
      })
      .catch((e) => {
        console.log("error in addnewtask.jsx", e);
        alert("something went  in");
      });
  };

  return (
    
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <h2>ADDING TASKS</h2>
      <form onSubmit={addNewTask}>
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Task"
          type="text"
        />
        <input
          value={newFrequency}
          onChange={(e) => setNewFrecuency(e.target.value)}
          placeholder="Last Completed"
          type="text"
        />
        <input
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Description"
          type="text"
        />
        <Button variant="contained" type="submit" >Submit</Button>

        <table className="simpleTable">
          <thead>
            <tr>
              <th>Task: </th>
              <th>Last Completed: </th>
              <th>Description: </th>
              <th>Edit</th>
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
                    <Button variant="outlined" onClick={() => editTask(task.id)}>Edit Task</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </form>
    </div>
  );
}
export default AddTask;
