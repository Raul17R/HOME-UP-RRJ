import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';



import './UserPage.css';


function UserPage() {
  const taskList = useSelector (store => store.taskList);
  const [taskName, setTaskName] = useState('');
  const dispatch = useDispatch();
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);

  useEffect(() => {
    fetchTask();
}, []);


const fetchTask = () => {
  axios.get('/api/task').then((response) => {
      dispatch({ type:'SET_TASK', payload: response.data})
  }).catch((error) => {
      console.log(error);
      alert('Something went wrong in fetch task, userPage.jsx');
  });
}


  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      {/* <p>Your ID is: {user.id}</p> */}
      {/* <button className='btn'>HOME UP!</button> */}
      {/* <LogOutButton className="btn" /> */}
      {/* <h3>Task:</h3>
      <h3>Frecuency:</h3>
      <h3>Description:</h3> */}
      {/* <h2>Tasks: </h2> */}
      {/* <pre>{JSON.stringify=(taskList)}</pre> */}


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
            {

                taskList.map(task => {
                    return <tr key={task.id}>
                      <td>{task.task}</td>
                      <td>{task.frecuency}</td>
                      <td>{task.description}</td>
                      <td><button>Complete</button>
                          <button>Edit</button>
                      </td>
                      </tr>
                })
                
            }
            </tbody>
            </table>

      
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
