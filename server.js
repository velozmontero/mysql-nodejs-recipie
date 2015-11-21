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
var bodyParser= require("body-parser");

//prupose of this is to enable cross domain requests
app.use(function(req, res, next){
   res.header("Access-Control-Allow-Origin", "*");
   next();
});
app.use(bodyParser.urlencoded({extended: true}));

app.get('/transactions/:grade', function(req,res){
   var grade= req.params.grade;    
   var query= 'SELECT sid, fname, lname, SUM(donation) AS donation, grade FROM transactions NATURAL JOIN(SELECT sid, fname, lname, grade FROM studentTable NATURAL JOIN sections) AS INFO WHERE grade="'+grade+'" GROUP BY sid ORDER BY grade DESC';
    
   if (grade=="all")
       query= 'SELECT sid, fname, lname, SUM(donation) AS donation, grade FROM transactions NATURAL JOIN(SELECT sid, fname, lname, grade FROM studentTable NATURAL JOIN sections) AS INFO GROUP BY sid ORDER BY grade DESC';
       connection.query(query, function(err, rows){
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

app.post('/transactions/:sid/:donation', function(req,res){
    var sid= req.params.sid;
    var donation= req.params.donation;
    console.log(sid+donation);
    connection.query("INSERT INTO transactions (sid, donation) VALUES " + 
                     "("+sid+", "+donation+")", function(err){
        if (err){
            res.end("DB error"+err);
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