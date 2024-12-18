const express=require('express')
const { creatProduct } = require('../controller/prodController')



const productrouter=express.Router()


productrouter.post('/creatProduct',creatProduct)
// productrouter.post('/updatecategory',updatecategory)
// productrouter.post('/deletecategory',deletecategory)
// productrouters.post('/readcategory',readcategory)

module.exports={productrouter}