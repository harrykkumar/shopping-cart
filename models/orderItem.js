const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt-nodejs');


const orders = new Schema({
    created: { type: Date, required: true  },
    ids: { type: String, required: true  }
})



module.exports = mongoose.model('orders', orders);