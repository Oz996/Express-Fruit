const mongoose = require('mongoose')

const orderItemSchema = new mongoose.Schema({

    ware:     {type: mongoose.Schema.Types.ObjectId, ref: 'Ware', required: true},
    quantity: {type: Number, required: true}
})

const orderSchema = new mongoose.Schema({

    user:       {type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true},
    orderItems: [orderItemSchema]
}, {timestamps:true})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order