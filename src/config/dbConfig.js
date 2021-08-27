const mysql = require("mysql");
//local mysql db connection
const dbConn = mysql.createConnection({
    host     : "localhost",
    user     : "shamal",
    password : "Shamal@2000",
    database : "point_of_sale"
});
dbConn.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!");
});
module.exports = dbConn;