const router = require('express').Router();
const pool = require('../database/db');
const authorization = require('../middleware/authorization');
const bcrypt = require('bcrypt');
module.exports = router;

router.get('/get', authorization , async(req, res) =>{
try {
    const query = await pool.query("SELECT user_name,user_email FROM users");
    res.json(query.rows);
} catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
}
});

router.get('/get/:id', authorization , async (req , res) =>{
try {
    const query = await pool.query("SELECT * FROM users WHERE user_id = $1",[req.params.id]);
    if(query.rowCount === 0){
        res.status(404).send('Nothing matches that id in the database');
    }else{
        res.json(query.rows[0]);
    }
} catch (error) {
    console.error(error.message)
    res.status(500).send('server error');
}
});

router.delete('/delete/:id', authorization , async (req , res) =>{
try {
    const query = await pool.query("DELETE FROM users WHERE user_id = $1",[req.params.id]);
    if (query.rowCount > 0){
        res.status(200).send('user was deleted');
    }else{
        res.send(404).send('user not found');
    }
} catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
}
});

router.put('/update/:id', authorization , async(req , res) =>{
try {
    const salt = 10;
    const saltRound = await bcrypt.genSalt(salt);
    const cryptedPassword = await bcrypt.hash(req.body.user_password,saltRound);
    const query =await pool.query("UPDATE users SET user_name = $1, user_password = $2 WHERE user_id = $3",[req.body.user_name,cryptedPassword,req.params.id]);
    if(query.rowCount >0)
    {
        res.status(200).send('succesfully updated');
    }else
    {
        res.status(404).send('user not found');
    }
} catch (error) {
    console.error(error.message)
    res.status(500).send('server error')
}
});