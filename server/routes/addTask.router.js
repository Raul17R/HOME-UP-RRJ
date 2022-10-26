const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

//Route to POST /addTask

router.post('/', (req, res) => {
    console.log('/task POST router');
    console.log(req.body);
    console.log('is Authenticated?', req.isAuthenticated());
    console.log('user: ', req.user);
    if(req.isAuthenticated()){
        const addTask = `INSERT INTO "maintenance" ("task", "frecuency", "description","user_id")
        VALUES ($1,$2,$3,$4);`
        pool.query(addTask, [req.body.task, req.body.frequency, req.body.description, req.user.id])
        .then(() => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('Error in POST /addTask', error);
            res.sendStatus(500);
        })
    }else{
        res.sendStatus(403);
    }
})
module.exports = router;