import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';

import './UserPage.css';


function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      {/* <p>Your ID is: {user.id}</p> */}
      {/* <button className='btn'>HOME UP!</button> */}
      {/* <LogOutButton className="btn" /> */}
      <h3>Task:</h3>
      <h3>Frecuency:</h3>
      <h3>Description:</h3>

      
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
