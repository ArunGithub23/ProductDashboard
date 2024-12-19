const { client } = require("../db/dbcon");

const creatProduct = (req, res) => {
  const { productName, categoryId } = req.body;
  console.log("req is", productName, categoryId);

  if (
    !productName ||
    productName == "" ||
    productName == null ||
    !categoryId ||
    categoryId == "" ||
    categoryId == null
  ) {
    res.send({ msg: "Bad Request", statuscode: 400 });
  } else {
    try {
      const insertquery = `insert into product (productname,categoryid) values('${productName}','${categoryId}') returning *`;

      console.log("abc");

      client
        .query(insertquery)
        .then((result) => {
          console.log("okk1");

          const res1 = result.rows[0];
          res.send({ res1, statuscode: 200 });
        })
        .catch((err) => {
          console.log("okk2");

          res.send({ msg: "erro in insert product", statuscode: 500, err });
        });
    } catch (err) {
      console.log("okk3");

      res.send({ msg: "erro in insert product1", statuscode: 500 });
    }
  }
};

const updateProduct = (req, res) => {
  const { productName, productid } = req.body;
  console.log("req is gg", productName, productid);

  if (
    !productid ||
    productid == "" ||
    productid == null ||
    !productName ||
    productName == ""
  ) {
    res.send({ msg: "Bad Request for update", statuscode: 400 });
  } else {
    try {
      const updatequery = `update product  set productname='${productName}' where id='${productid}' returning *`;
      client
        .query(updatequery)
        .then((result) => {
          // console.log('res is ',result)
          const res1 = result.rows[0];
          res.send({ res1, statuscode: 200 });
        })
        .catch((err) => {
          res.send({ msg: "erro in update product", statuscode: 500, err });
        });
    } catch (err) {
      console.log("okk3");

      res.send({ msg: "erro in update product", statuscode: 500 });
    }
  }
};

const deleteProduct = async (req, res) => {
  const { productid } = req.body;
  console.log("req is gg", productid);

  if (!productid || productid == "" || productid == 0) {
    res.send({ msg: "Bad Request for update", statuscode: 400 });
  } else {
    try {
      const updatequery = `delete from category   where id='${productid}' returning *`;
      client
        .query(updatequery)
        .then((result) => {
          // console.log('res is ',result)
          const res1 = result.rows[0];
          res.send({ res1, statuscode: 200 });
        })
        .catch((err) => {
          res.send({ msg: "erro in update", statuscode: 500, err });
        });
    } catch (err) {
      console.log("okk3");

      res.send({ msg: "erro in update", statuscode: 500 });
    }
  }
};


// read 
const readProduct = async (req, res) => {
  const { page, limit } = req.params;
  console.log("params are", req.params);

  let offset = (page - 1) * 10;
  const totalquery=`SELECT 
  COUNT(*) AS totalcount 
FROM 
  product;`

  const totalrows=(await client.query(totalquery)).rows[0].totalcount


  try {
    const readquery = ` SELECT 
    product.id, 
    product.productname, 
    product.categoryid, 
    category.category 
FROM 
    product 
JOIN 
    category 
ON 
    product.categoryid = category.id 
ORDER BY 
    product.id ASC 
LIMIT 
    ${limit} OFFSET ${offset}; `;


   
    client
      .query(readquery)
      .then((result) => {
        // console.log('res is ',result)
        const res1 = result.rows;
        res.send({ res1,totalrows, statuscode: 200 });
      })
      .catch((err) => {
        res.send({ msg: "erro in finding product", statuscode: 500, err });
      });
  } catch (err) {
    console.log("okk3");

    res.send({ msg: "erro in finding product", statuscode: 500 });
  }
};

module.exports = { creatProduct, updateProduct, deleteProduct, readProduct };
