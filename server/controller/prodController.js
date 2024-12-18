
const {client}=require('../db/dbcon')

const creatProduct=(req,res)=>{

    const {productName}=req.body
    console.log("req is",productName)   

    if(!productName || productName== ''|| productName==null){
        res.send({msg:'Bad Request', statuscode:400})


    }
    else{
    
    try {
       
        const insertquery=`insert into product (productname) values('${productName}') returning *`

        console.log('abc');
        
        client.query(insertquery).then((result) => {
            console.log("okk1");
            
            const res1=result.rows[0]
            res.send({res1,statuscode:200})
        }).catch((err) => {
            console.log("okk2");

            res.send({msg:'erro in insert product', statuscode:500,err})
        });

    } catch (err) {
        console.log("okk3");

        res.send({msg:'erro in insert product1',statuscode:500})

    }
}
}



const updateProduct=(req,res)=>{


}

const deleteProduct=(req,res)=>{


}

const readProduct=(req,res)=>{


}

module.exports={creatProduct,updateProduct,deleteProduct,readProduct}