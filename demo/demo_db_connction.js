const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "your-user-name",
  password: "your-password"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
