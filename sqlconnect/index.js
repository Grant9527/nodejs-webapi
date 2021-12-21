var mysql = require("mysql");
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "test"
})
db.connect((err) => {
  if (err) throw err;
  console.log("连接成功");
})

module.exports = db;