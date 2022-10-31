import React from "react";
// import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

import "./UserPage.css";

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

  const completeTask = () => {
    history.push('/completeTask');
  }

  const fetchTask = () => {
    axios
      .get("/api/task")
      .then((response) => {
        dispatch({ type: "SET_TASK", payload: response.data });
      })
      .catch((error) => {
        console.log(error);
        alert("Something went wrong in fetch task, userPage.jsx");
      });
  };

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <button onClick={addTaskButton}>Add New Task</button>
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
                  <button onClick={completeTask}>Complete</button>
                  <button onClick={() => editTask(task.id)}> Edit</button>
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
