const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// Route to return the logged in user task
router.get('/', (req, res) => {
    console.log('/task GET route');
    console.log('is authenticated?', req.isAuthenticated());
    console.log('User: ', req.user);
    if(req.isAuthenticated()) {
        let queryText = `SELECT * FROM maintenance WHERE "user_id" = $1;`;
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
router.get('/:id', (req, res) => {
    const query = `SELECT * FROM maintenance WHERE "id" = $1`;
    pool.query(query, [req.params.id])
    .then(results => {
        res.send(results.rows[0]);
    }).catch(err => {
        console.log('ERROR', err);
        res.sendStatus(500)
    })
})


router.put('/:id', (req, res) =>{
    if(req.isAuthenticated()) {
    const queryText = `UPDATE maintenance SET "task" = $1, "frecuency" = $2, "description" = $3
    WHERE "id" = $4 AND "user_id" = $5`;
    pool.query(queryText, [req.body.task, req.body.frecuency, req.body.description, req.params.id, req.user.id])
    .then(results => {
        res.sendStatus(200);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    })
}else{
    res.sendStatus(403)
}
})



module.exports = router;