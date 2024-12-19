const express=require('express')
const { createcategory, updatecategory, deletecategory, readcategory } = require('../controller/catController')



const catrouter=express.Router()


catrouter.post('/createcategory',createcategory)
catrouter.post('/updatecategory',updatecategory)
catrouter.post('/deletecategory',deletecategory)
catrouter.get('/readcategory',readcategory)

module.exports={catrouter}