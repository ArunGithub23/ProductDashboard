
const {Client}=require('pg')
const { user, password, port, database, host } = require('pg/lib/defaults')


const client=new Client({

    user:'postgres',
    password:'arun123',
    host:'localhost',
    port:'5432',
    database:'nimap'
})

client.connect().then((res)=>{
    console.log('connected to db')
}).catch((err)=>{
    console.log("error while connecting to db",err);
    
})

module.exports={client}