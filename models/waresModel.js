const Ware = require('../schemas/waresSchema')

//Hänta alla varor genom en .find

exports.getAllWares= (req, res) => {

    Ware.find().select()
     .then(data => res.status(200).json(data))
     .catch(() => res.status(500).json({message: 'Could not retrieve list of fruits'}))
}

// Lägg till en vara

exports.addWare = (req, res) => {

    const {name, price, category, image} = req.body

    if(!name || !price || !category) {
        res.status(400).json({message: 'You need to enter all the fields'})
        return      
    }
    
    Ware.create({ name, price, category, image})
     .then(data => res.status(201).json(data))
     .catch(() => res.status(500).json({message: 'Could not add new ware'}))

}

// Hämta ut specifik vara genom dens ID

exports.getWareById = (req, res) => {

    Ware.findById(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(() => res.status(400).json({message: 'Could not find ware'}))
}


// Hitta vara genom namn och uppdatera pris eller bild. 

exports.updateWare = (req, res) => {
    
    const { name, price, image } = req.body

    Ware.findOne({ name})
     .then(data => {
        if(!data) {
            res.status(404).json({message: 'Could not find ware'})
            return
        }
    Ware.updateOne({_id: data._id }, {$set: { price, image }})
     .then(() => {
        res.status(200).json({ message: 'Ware has been updated'})
     })
     .catch((err) => {
        res.status(500).json({message: err.message})
     })
     })


}

// Hitta alla varor under frukt kategorin

exports.getFruits = (req, res) => {

    Ware.find({ category: 'fruit' })
     .then( data => {
        if(!data) {
            res.status(404).json({message: 'Ware not found'})
            return
        }
        res.status(200).json(data)
     })
}

// Hitta alla varor under grönsaks kategorin

exports.getVegetables = (req, res) => {

    Ware.find({ category: 'vegetable' })
    .then( data => {
        if(!data) {
            res.status(404).json({message: 'Ware not found'})
            return
        }
        res.status(200).json(data)
     })
}


// Ta bort vara permanent

exports.deleteWare = (req, res) => {

    Ware.findByIdAndDelete(req.params.id)
       .then( data => {
        if(!data) {
            res.status(404).json({message: 'Ware not found'})
            return
        }
        res.status(410).json(({message: 'Ware deleted!'}))
       })
}