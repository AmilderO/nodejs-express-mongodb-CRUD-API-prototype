var express = require('express');
var async = require('async');
var Product = require('module/');
var router = express.Router();

/* POST products listing. */
router.post('/', async(req, res) => {
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product);
    } catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

module.exports = router;
