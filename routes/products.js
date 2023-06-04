var express = require('express');
var async = require('async');
var Product = require('../models/productModel');
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

/* GET products listing. */
router.get('/', async(req, res) => {
    try{
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error){
        res.status(500).json({message: error.message})
    }
});

/* GET product by ID. */
router.get('/:id', async(req, res) =>{
   try {
       const {id} = req.params;
       const product = await Product.findById(id);
       res.status(200).json(product)
   } catch (error) {
       res.status(500).json({message: error.message})
   }
});

/* UPDATE product by ID. */
router.put('/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message: "No se puede encontrar un producto con ID = " + id})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

/* DELETE product by ID. */
router.delete('/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: "No se puede encontrar un producto con ID = " + id})
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});


module.exports = router;
