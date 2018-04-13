const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt-nodejs');


const addCartSchema = new Schema({
    name: { type: String, required: true  },
    description: { type: String, required: true  },
    price: { type: Number },
    pid: { type: String, required: true  },
    image_path: {type: String}

})


module.exports = mongoose.model('addCart', addCartSchema);