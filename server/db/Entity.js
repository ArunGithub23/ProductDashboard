const { client } = require("./dbcon");


try {
    const categorytable = `CREATE TABLE IF NOT EXISTS category (
        id SERIAL PRIMARY KEY,
        category VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   )`;

const producttable = `CREATE TABLE IF NOT EXISTS product (
        id SERIAL PRIMARY KEY,
        productname VARCHAR(200),
        categoryid INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (categoryid) REFERENCES category(id) ON DELETE CASCADE
  )`;




           
client.query(categorytable).then((result) => {
    console.log('category table created')

}).catch((err) => {
    console.log('error while creating category table',err);
    
});

client.query(producttable).then((result) => {
    console.log('product table created')

}).catch((err) => {
    console.log('error while creating product table ',err)

});



} catch (error) {
    console.log('error while creating category table',err);

}

