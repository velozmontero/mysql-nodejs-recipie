var mysql = require('mysql'); //has to be installed with npm

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'fundraising_app'
});
connection.connect();

var port= 5238; 
var express= require('express');

var app= express();

//prupose of this is to enable cross domain requests
app.use(function(req, res, next){
   res.header("Access-Control-Allow-Origin", "*");
   next();
});

app.get('/transactions', function(req,res){
   connection.query('SELECT * FROM transactions', function(err, rows){
        if (!err){
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(rows));
            console.log('The solution is: ', rows);
        }
        else{
            console.log('Error while performing query')
        }
    });  
});

app.post('/transactions', function(req,res){
    connection.query("INSERT INTO transactions (sid, donation) VALUES" + "(15432, 100)", function(err){
        if (err){
            res.end("DB error");
            console.log("DB insertion failed"+ err);
        }
        else{
            res.end("Success");
            console.log("DB insertion success");
        }
    });  
});

app.listen(port);
console.log("Server listening on port "+port);