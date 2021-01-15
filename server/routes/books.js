const router = require('express').Router();
const authorization = require('../middleware/authorization');
const pool = require('../database/db');
const { route } = require('./users');
module.exports = router

router.get('/get', authorization ,async (req ,res) =>{
try {
    const query = await pool.query("SELECT * FROM books");
    if (query.rowCount === 0 ){
        res.status(404).send('No data found');
    }else{
        res.json(query.rows);
    }
} catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
}
});

router.get('/get/:id', authorization , async(req ,res) =>{
try {
    const query = await pool.query('SELECT * FROM books WHERE book_id = $1',[req.params.id]);
    if(query.rowCount === 0){
        res.status(404).send('nothing matches the given id please try again.');
    }else{
        res.json(query.rows[0]);
    }
} catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
}
});

router.post('/post', authorization ,async (req ,res ) =>{
try {
    const query = await pool.query("INSERT INTO books(book_title,book_categ,book_price) VALUES($1,$2,$3)",
    [req.body.book_title,req.body.book_categ,req.body.book_price]);
    if (query.rowCount === 0){
        res.status(500).send('something went wrong');
    }else{
        res.status(201).send('data was added successfuly');
    }
} catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
}
});


router.delete('/delete/:id', authorization , async(req , res) =>{
try {
    const query = await pool.query("DELETE FROM books WHERE book_id = $1",[req.params.id]);
    if (query.rowCount === 0){
        res.status(404).send('nothing matches the given id');
    }else{
        res.status(200).send('Deleted successfuly');
    }
} catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
}
});

router.put('/update/:id', authorization , async(req ,res) =>{
    try {
        const query =await pool.query('UPDATE books SET book_title = $1 , book_categ = $2 , book_price = $3 WHERE book_id = $4',
        [req.body.book_title,req.body.book_categ,req.body.book_price,req.params.id]);
        if(query.rowCount === 0){
            res.status(400).send('ops something went wrong');
        }else
        {
            res.status(200).send('updated successfully');
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});