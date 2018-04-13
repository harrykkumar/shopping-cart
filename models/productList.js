const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt-nodejs');


const productSchema = new Schema({
    name: { type: String, required: true  },
    description: { type: String, required: true  },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    price: { type: Number },
    image_path: {type: String}

})


module.exports = mongoose.model('product', productSchema);