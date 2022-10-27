import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function AddTask() {
  const user = useSelector((store) => store.user);
  const [newTask, setNewTask] = useState("");
  const [newFrequency, setNewFrecuency] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const taskList = useSelector((store) => store.taskList);
  const history = useHistory();

  const editTask = () => {
    history.push('/editTask');
  };

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
  const dispatch = useDispatch();

  const addNewTask = (e) => {
    // e.preventDefault();
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
        alert("something went wrong");
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
        <input type="submit" />

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
                    <button onClick={editTask}>Edit Task</button>
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
