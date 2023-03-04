const fs = require("fs/promises");
const express = require("express");
const cors = require("cors");
const _ = require("lodash");
const {v4 : uuid} = require("uuid");
const mongoose = require('mongoose');



var dbState = [{
    value: 0,
    label: "disconnected"
},
{
    value: 1,
    label: "connected"
},
{
    value: 2,
    label: "connecting"
},
{
    value: 3,
    label: "disconnecting"
}];
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB_URI);


const Contact = new mongoose.Schema({
    id: String ,
    firstName: String,
    lastName: String,
    phoneNumber: String,
    email: String,
});
const Contacts = new mongoose.model('Contact', Contact);








const app = express();

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
 
 app.use(cors(corsOptions))
app.use(express.json());


require('dotenv').config();

app.get('/', (req, res)=>{
    res.json({msg: "hello world"});
    const person = new Contacts({
        id: uuid(),
        firstName: "John",
        lastName: "Doe",
        phoneNumber: "1234567890",
        email: "ben@ben.com",
    });
    person.save((err, result)=>{
        err ? console.log(err) : console.log(result);
    });
});
app.get('/get-contactList', (req, res)=>{
    
    Contacts.find({}, (err, result)=>{
        err ? res.json({error: err}) : res.json({contactList: result});
    });
});

app.post('/add-contact', (req, res)=>{
    const {firstName, lastName, phoneNumber, email} = req.body;
    const person = new Contacts({
        id: uuid(),
        firstName,
        lastName,
        phoneNumber,
        email,
    });
    person.save((err, result)=>{
        err ? res.json({error: err}) : res.json({contactList: result});
    });
});

app.post('/delete-contact', (req, res)=>{
    const {id} = req.body;
    Contacts.deleteOne({id}, (err, result)=>{
        err ? res.json({error: err}) : res.json({contactList: result});
    });
})

app.post('/modify-contact', (req, res)=>{
    const {person} = req.body;
    Contacts.findOneAndUpdate({id: person.id},
        {
            firstName: person.firstName,
            lastName: person.lastName,
            phoneNumber: person.phoneNumber,
            email: person.email,

        }, 
        {new: true}, (err, res)=>{
            err ? console.log(err) : console.log(res);
        });
    console.log(person);
});
app.get("/search", (req, res)=>{
    const {q} = req.query;
    Contacts.find({$or: [
        {firstName: {$regex: q, $options: "i"}},
        {lastName: {$regex: q, $options: "i"}},
        {phoneNumber: {$regex: q, $options: "i"}},
        {email: {$regex: q, $options: "i"}},
    ]}, (err, result)=>{
        err ? res.json({error: err}) : res.json({contactList: result});
    });
})

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})