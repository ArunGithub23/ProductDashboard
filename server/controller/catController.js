const { query } = require("express")
const { client } = require("../db/dbcon")
const CustomError = require("../Exceptions/customerror")


const createcategory = async (req, res) => {
    const { categoryName } = req.body;
    console.log("Category Name:", categoryName);

    // Validate request
    if (!categoryName || categoryName.trim() === "") {
        return res.status(400).send({ msg: "Bad Request", statuscode: 400 });
    }

    try {
        // Check if the category already exists
        const findCategoryQuery = `SELECT * FROM category WHERE category = $1`;
        const findResult = await client.query(findCategoryQuery, [categoryName]);

        if (findResult.rows.length > 0) {
            // Category already exists
            return res.status(409).send({ msg: "Category already exists", statuscode: 409 });
        }

        // Insert new category if it doesn't exist
        const insertQuery = `INSERT INTO category (category) VALUES ($1) RETURNING *`;
        const insertResult = await client.query(insertQuery, [categoryName]);

        const newCategory = insertResult.rows[0];
        res.status(200).send({ newCategory, statuscode: 200 });

    } catch (err) {
        console.error("Error during category creation:", err);
        res.status(500).send({ msg: "Internal Server Error", statuscode: 500, error: err });
    }
};

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
       
        const readquery=`select * from category order by id`
        client.query(readquery).then((result) => {
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