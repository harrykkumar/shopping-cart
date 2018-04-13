const User = require('../models/login');
const ProductList = require('../models/productList')
const AddCartlist = require('../models/addCart')
const orders = require('../models/orderItem');

const config = require('../config/database');
const jwt = require('jsonwebtoken');

module.exports = (router) => {
    //User Login 
    router.post('/login', (req, res) => {
        if (!req.body.email) {
            res.json({ success: false, message: 'No  email was provided!' })
        } else {
            if (!req.body.password) {
                res.json({ success: false, message: 'No password was provided!' })
            } else {
                User.findOne({ email: req.body.email }, (err, user) => {
                    if (err) {
                        res.json({ success: false, message: err });
                    } else {
                        if (!user) {
                            res.json({ success: false, message: "your email is not registred!" })
                        } else {
                            if (req.body.password !== user.password) {
                                res.json({ success: false, message: 'Password invalid!' })
                            } else {
                                var token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: '20h' });
                                res.json({ success: true, message: ' You are Login Success!', token: token, user: { email: user.email } });
                            }
                        }
                    }

                });
            }
        }
    });
    //This is  get all product items from Database

    router.get('/getAllProduct', (req, res) => {
        ProductList.find({}, (err, carts) => {
            if (err) {
                res.json({ success: false, message: err })
            } else {
                if (!carts) {
                    res.json({ success: false, message: 'No Product Found!' })
                } else {
                    res.json({ success: true, carts: carts })
                }
            }
        }).sort({ '_id': -1 })

    });

    //This is  post  item in cart for add items to Database

    router.post('/addToCart', (req, res) => {
        if (!req.body) {
            res.json({ success: false, message: ' There is not any Item' })
        } else {
            const cartItem = new AddCartlist({
                name: req.body.name,
                description: req.body.description,
                image_path: req.body.image_path,
                price: req.body.price,
                pid: req.body._id
            });
            cartItem.save((err) => {
                if (err) {
                    if (err.errors) {
                        if (err.errors.name) {
                            res.json({ success: false, message: err.errors.name.message })
                        } else {
                            if (err.errors.description) {
                                res.json({ success: false, message: err.errors.description.message })

                            } else {
                                if (err.errors.image_path) {
                                    res.json({ success: false, message: err.errors.image_path.message })

                                } else {
                                    res.json({
                                        success: false,
                                        message: err.errmsg
                                    })
                                }

                            }
                        }
                    } else {
                        res.json({ success: false, message: err })
                    }

                } else {
                    res.json({ success: true, message: 'Item added to cart !' })

                }
            });
        }
    });

    // get addes cart items

    router.get('/getAddedCartItem', (req, res) => {

        AddCartlist.find({}, (err, items) => {
            if (err) {
                res.json({ success: false, message: err })
            } else {
                if (!items) {
                    res.json({ success: false, message: 'No Product Found!' })
                } else {
                    res.json({ success: true, items: items })
                }
            }
        }).sort({ '_id': -1 })

    });

    //For delete item from AddToCart collection 

    router.delete('/deleteItem/:id', (req, res) => {
        if (!req.params.id) {
            res.json({ success: false, message: 'ID is not provided' })
        } else {
            AddCartlist.remove({ 'pid': req.params.id }, (err, items) => {
                if (err) {
                    res.json({ success: false, message: 'Invalalid ID' })
                } else {
                    if (!items) {
                        res.json({ success: false, message: ' item not found!' })
                    } else {
                        res.json({ success: true, message: ' Item removed!' })

                    }
                }
            })
        }
    })
    // save payment data in database

    router.post('/paymentItem', (req, res) => {
        if (!req.body) {
            res.json({ success: false, message: ' There is not any Item' })
        } else {
            // console.log(req.body, "pay")

            const order = new orders({
                created: new Date(),
                ids: req.body.join(',')
            });
            order.save((err) => {
                if (err) {
                    if (err.errors) {
                        if (err.errors.name) {
                            res.json({ success: false, message: err.errors.name.message })
                        } else {
                            if (err.errors.description) {
                                res.json({ success: false, message: err.errors.description.message })

                            } else {
                                if (err.errors.image_path) {
                                    res.json({ success: false, message: err.errors.image_path.message })

                                } else {
                                    res.json({
                                        success: false,
                                        message: err.errmsg
                                    })
                                }

                            }
                        }
                    } else {
                        res.json({ success: false, message: err })
                    }

                } else {
                    res.json({ success: true, message: 'Thanks for Shopping !' })

                }
            });
        }
    });

    return router;
}