require('dotenv').config();
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const UserModel = require("./model/User")

const app = express()
app.use(express.json())
app.use(cors())

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_CONNECTION);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.post("/login", (req, res) => {
    const {email, password} = req.body;
    UserModel.findOne({email : email})
        .then(user => {
            if(user) {
                if(user.password === password){
                    res.json("Success")
                }else{
                    res.json("The password is incorrect")
                }
            }else{
                res.json("No record existed")
            }
        })
})

app.post("/signup", (req, res) => {
    UserModel.create(req.body)
        .then(users => res.json(users))
        .catch(err => res.json(err))
})


app.listen(4000, () => {
    console.log(`Server listening on port 4000`);
})