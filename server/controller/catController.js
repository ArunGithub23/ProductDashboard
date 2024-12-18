const { query } = require("express")
const { client } = require("../db/dbcon")
const CustomError = require("../Exceptions/customerror")


const createcategory=(req,res)=>{

    const {categoryName}=req.body
    console.log("req is",categoryName)   

    if(!categoryName || categoryName== ''|| categoryName==null){
        res.send({msg:'Bad Request', statuscode:400})


    }
     
   

    
    
    else{
    
       
    try {
        let categoryexist=false;
        const findcategory=`select * from category where category='${categoryName}';`
        client.query(findcategory)
        .then((result)=>{
            if(result.rows[0]!=null){
                categoryexist=true;
                console.log('res is',result)
                res.send({msg:'category already exists', statuscode:409})
                throw new CustomError('error1',409)

            }
        }).catch((err)=>{

            res.send({msg:'erro in findcategory block', statuscode:500,err})
        })


        if(!categoryexist){
        const insertquery=`insert into category (category) values('${categoryName}') returning *`;
        
        client.query(insertquery).then((result) => {
            console.log("okk1");
            
            const res1=result.rows[0]
            res.send({res1,statuscode:200})
        }).catch((err) => {
            console.log("okk2");

            res.send({msg:'erro in insert', statuscode:500,err})
        });
    }
    } catch (err) {
        console.log("okk3");

        // res.send({msg:'erro in insert',statuscode:500})

    }

}

}



const updatecategory=(req,res)=>{

    const {categoryName,categoryid}=req.body
    console.log("req is gg",categoryName,categoryid)   

    if(!categoryName || categoryName== ''|| categoryName==null||!categoryid||categoryid==''){
        res.send({msg:'Bad Request for update', statuscode:400})


    }
    else{
    
    try {
       
        const updatequery=`update category  set category='${categoryName}' where id='${categoryid}' returning *`
        client.query(updatequery).then((result) => {
            // console.log('res is ',result)
            const res1=result.rows[0]
            res.send({res1,statuscode:200})
        }).catch((err) => {

            res.send({msg:'erro in update', statuscode:500,err})
        });
    } catch (err) {
        console.log("okk3");

        res.send({msg:'erro in update',statuscode:500})

    }
}

}

const deletecategory=(req,res)=>{

    const {categoryName,categoryid}=req.body
    console.log("req is gg",categoryName,categoryid)   

    if(!categoryid||categoryid==''){
        res.send({msg:'Bad Request for update', statuscode:400})


    }
    else{
    
    try {
       
        const updatequery=`delete from category   where id='${categoryid}' returning *`
        client.query(updatequery).then((result) => {
            // console.log('res is ',result)
            const res1=result.rows[0]
            res.send({res1,statuscode:200})
        }).catch((err) => {

            res.send({msg:'erro in update', statuscode:500,err})
        });
    } catch (err) {
        console.log("okk3");

        res.send({msg:'erro in update',statuscode:500})

    }
}


}

const readcategory=(req,res)=>{
    // const {categoryName,categoryid}=req.body
    // console.log("req is gg",categoryName,categoryid)   

    // if(!categoryid||categoryid==''){
    //     res.send({msg:'Bad Request for update', statuscode:400})


    // }
    // else{
    
    try {
       
        const updatequery=`select * from category`
        client.query(updatequery).then((result) => {
            // console.log('res is ',result)
            const res1=result.rows
            res.send({res1,statuscode:200})
        }).catch((err) => {

            res.send({msg:'erro in finding', statuscode:500,err})
        });
    } catch (err) {
        console.log("okk3");

        res.send({msg:'erro in finding',statuscode:500})

    }


}

module.exports={createcategory,readcategory,deletecategory,updatecategory}