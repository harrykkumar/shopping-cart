const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema  = mongoose.Schema;
// const bcrypt = require('bcrypt-nodejs');



const userSchema = new Schema({
	email:{type:String ,required : true},
	username:{type:String ,required : true},
	password:{type:String ,required : true}

});

module.exports = mongoose.model('user',userSchema);