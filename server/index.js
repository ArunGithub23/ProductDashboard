const express=require('express')
const client=require('./db/dbcon')
const multer=require('multer')
const { catrouter } = require('./routes/categoryroute')
const { productrouter } = require('./routes/productRoute')
require('./db/Entity')

const app=express()
const upload=multer()




app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(upload.none())



app.use('/category',catrouter)
app.use('/product',productrouter)


app.get('/',(req,res)=>{
    res.send({msg:'hello'})
})


app.listen('4000',function(err){

    if(err){
        console.log("got an error while listening at 4000");
        
    }
    else{
        console.log("server is listening at port 4000");
        
    }
})