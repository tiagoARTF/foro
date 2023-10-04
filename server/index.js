const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const EmployeeModel  = require('./models/Employee')


const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/employee");

app.post("/login", (req, res) => {
    const {email, password} = req.body;
    EmployeeModel.findOne({email: email})
    .then(user => {
        if(user){
            if(user.password === password) {
                res.json("Exitoso")
            } else {
                res.json("La contraseña es incorrecta")
            }   
        } else{
            res.json("No existe ningún registro")
        }
    })
})


app.post('/registro', (req, res) => {
    EmployeeModel.create(req.body)
        .then(employess => res.json(employess))
        .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log("server is running")
})