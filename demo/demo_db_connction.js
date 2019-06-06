const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "qinzhao11"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
