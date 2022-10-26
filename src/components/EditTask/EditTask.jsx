import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";

function EditTask() {
    const user = useSelector((store) => store.user);

    return (
        <div className="container">
            <h2>Edit Task</h2>
        </div>
    )
}

export default EditTask;