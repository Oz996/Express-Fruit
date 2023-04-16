const User = require('../schemas/userSchema')
const Order = require('../schemas/orderSchema')
const authMiddleware = require('../middleware/authMiddleware')

const secretKey = process.env.SECRET_KEY

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { default: mongoose } = require('mongoose')

// Registrera en användare

exports.registerUser =(req, res) => {

    const { email, password } = req.body

    const hashedPassword = bcrypt.hashSync(password,7)
    const user = new User({ email, password: hashedPassword})

    user.save()
     .then(()=> {
         
             const token = jwt.sign({ email: user.email, userId: user._id }, secretKey)
             res.status(201).json({message: 'User created', token})
         })
         .catch((err) => {
            console.log(err.message)
            res.status(500).json({message: 'Could not create user'})
         })
     

    
}

// Logga in

exports.loginUser =(req, res) => {

    const { email, password} = req.body
    
    User.findOne({ email: email})
     .then((data)=> {
         if(!data || !bcrypt.compareSync(password, data.password)) {
             return res.status(401).json({message: 'Invalid email or password'})
         }
         const token = jwt.sign({ email: data.email, dataId: data._id }, secretKey)
         res.json({message: 'User logged in', token})
    })

}

exports.getAllUsers =(req,res) => {

   User.find()
     .then(data => res.status(200).json(data))
     .catch(()=> res.status(500).json({message: 'lol'}))
}

exports.createOrder = [authMiddleware, (req,res) => {

try{

   const { orderItems } = req.body
    const user = req.body.user

    const formattedOrderItems = orderItems.map(item =>({
      ware: new mongoose.Types.ObjectId(item.ware),
      quantity: item.quantity,
    }))

    const order = new Order({ user, orderItems: formattedOrderItems })

    order.save()
     .then(()=> {
        res.status(201).json({message: 'Order created'})
     })
} catch (error) {

   console.log(error);
   res.status(500).json({ message: "Could not create order" });
 }
}]

exports.getOrders =[authMiddleware, (req, res) =>{

   console.log(req.user)
   const userId = req.user.dataId
   console.log('userId:', userId)

    Order.find({ user: userId})
    .populate('orderItems.ware')
    .select('-orderItems.image')
     .then((data) =>{
        res.status(200).json(data)
     })
     .catch(() =>{
        res.status(500).json({message: 'Could not retrieve orders'})
     })
}]

