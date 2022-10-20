const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// Route to return the logged in user task

router.get('/', (req, res) => {
    console.log('/task GET route');
    console.log('is authenticated?', req.isAuthenticated());
    console.log('User: ', req.user);
    if(req.isAuthenticated()) {
        let queryText = `SELECT * FROM "maintenance" WHERE "user_id" = $1;`;
        pool.query(queryText, [req.user.id]).then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
    }else{
        res.sendStatus(403);//Forbiden, must log in
    }
});

module.exports = router;