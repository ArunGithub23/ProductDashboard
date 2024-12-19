const express=require('express')
const { creatProduct, readProduct, deleteProduct, updateProduct } = require('../controller/prodController')



const productrouter=express.Router()


productrouter.post('/createproduct',creatProduct)
productrouter.post('/updateproduct',updateProduct)
productrouter.post('/deleteproduct',deleteProduct)
productrouter.get(`/readproduct/:page/:limit`,readProduct)

module.exports={productrouter}