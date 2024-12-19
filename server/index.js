const express=require('express')
const client=require('./db/dbcon')
const multer=require('multer')
const { catrouter } = require('./routes/categoryroute')
const { productrouter } = require('./routes/productRoute')
const dotenv=require('dotenv')
const cors=require('cors')
require('./db/Entity')
dotenv.config()


const port=process.env.port

const app=express()
const upload=multer()

app.use(cors({allowedHeaders:'*'}))



app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(upload.none())



app.use('/category',catrouter)
app.use('/product',productrouter)


app.get('/',(req,res)=>{
    res.send({msg:'hello'})
})


app.listen(port,function(err){

    if(err){
        console.log("got an error while listening at ",port);
        
    }
    else{
        console.log("server is listening at port",port);
        
    }
})