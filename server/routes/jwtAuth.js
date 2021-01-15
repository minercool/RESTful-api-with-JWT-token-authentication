const router = require('express').Router();
const pool = require('../database/db');
const jwtGenerator = require('../utils/jwtGenerator');
const bcrypt = require('bcrypt');

module.exports = router;

router.post('/register', async (req , res) =>{
try {
    const query = await pool.query("SELECT * FROM users WHERE user_email = $1",[req.body.user_email]);
    if(query.rowCount === 0){
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const cryptedPassword = await bcrypt.hash(req.body.user_password,salt);
        const query =await  pool.query("INSERT INTO users(user_name,user_email,user_password) VALUES($1,$2,$3)",[req.body.user_name,req.body.user_email,cryptedPassword]);
        res.status(200).send('user added succesfully');
    }else{
        res.status(409).send('User already exists');
    }
} catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
}
});

router.post('/login', async (req , res) =>{
try {
    const query = await pool.query("SELECT * FROM users WHERE user_email = $1",[req.body.user_email]);
    if (query.rowCount > 0){
        validPassword = await bcrypt.compare(req.body.user_password,query.rows[0].user_password);
        if(validPassword)
        {
            const token = jwtGenerator(query.rows[0].user_id);
            res.json({ token });
        }else{
            res.status(401).send('Wrong user or password');
        }
    }else{
        res.status(401).send('Wrong user or password');
    }
} catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
}
});