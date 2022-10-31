const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

//Route to EDIT /editTask

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