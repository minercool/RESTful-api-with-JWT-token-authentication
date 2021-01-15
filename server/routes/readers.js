const router = require('express').Router();
const authorization = require('../middleware/authorization');
const pool = require('../database/db');

module.exports = router;


router.post('/post', authorization , async (req , res ) =>{
try {
    const query =await pool.query('INSERT INTO readers(reader_fullname,reader_CIN,reader_address,book_id) VALUES($1,$2,$3,$4)',
    [req.body.reader_fullname,req.body.reader_CIN,req.body.reader_address,req.body.book_id]);
    if (query.rowCount === 0){
        res.status(400).send('something went wrong');
    }else{
        res.status(201).send('New value added successfuly');
    }
} catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
}
});

router.delete('/delete/:id', authorization , async (req , res) =>{
try {
    const query = await pool.query('DELETE FROM readers WHERE reader_id = $1',[req.params.id]);
    if (query.rowCount === 0){
        res.status(400).send('something went wrong');
    }else{ 
        res.status(201).send('reader was deleted successfuly');
    }
} catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
}
});


router.put('/update/:id', authorization , async(req , res) =>{
    try {
        const query =await pool.query('UPDATE readers SET reader_fullname = $1 WHERE reader_id = $2',[req.body.reader_fullname,req.params.id]);
        if (query.rowCount === 0){
            res.send(400).send('something went wrong');
        }else{
            res.status(200).send('value was updated successfuly');
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send('server error');
    }
})

router.get('/get', authorization , async(req ,res) =>{
    try {
        const query = await pool.query('SELECT * FROM readers');
        if(query.rowCount === 0 ){
            res.status(404).send('database is empty');
        }else{
            res.json(query.rows);
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send('server error');
    }
})