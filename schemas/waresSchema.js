const mongoose = require('mongoose')

const waresSchema = new mongoose.Schema({

    name:       {type: String, required: true},
    price:      {type: String, required: true},
    category:   {type: String, required: true, enum: ['fruit', 'vegetable']},
    image:      {type: String}
})

module.exports = mongoose.model('Ware', waresSchema)