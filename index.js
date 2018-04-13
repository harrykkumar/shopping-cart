const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
//const config = require('./config/database');
const path = require('path');
const authentication  = require('./routes/authentication')(router);
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');




mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/meanDB",(err)=>{
	if(err){
		console.log('  Could not connect to database');
	}
	else{
		console.log(' Connected with database');
	}
});


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  
  next();
});



app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());


app.use(express.static(__dirname + '/dist/'));
app.use('/authentication',authentication);
// app.use('/blog',blog);


 app.get('*',(req,res)=>{
res.sendFile(path.join(__dirname + '/dist/index.html'));
 });
 app.listen(port,()=>{
 	console.log('Listing on port ' + port)
 });


