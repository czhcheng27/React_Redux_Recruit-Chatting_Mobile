const md5 = require('blueimp-md5')
/* 
Connect to database
*/
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/db_test')
const conn = mongoose.connection
conn.on('connected', function (){
    console.log('database connected');
})

/* create Model */
//1. define Schema
const userSchema =new mongoose.Schema({
    username:{type:String, required:true},
    password:{type:String, required:true},
    type:{type:String, required:true},
    header:{type:String},
})
//2. define Model
const UserModel = mongoose.model('user', userSchema)//collecton: users


/* CRUD test */
//create
function create(){
    const userModel = new UserModel({
        username:'Bob', password:md5('123'), type:'employee'
    })
    userModel.save(function (err, doc){
        console.log('create()', err, doc);
    })
}
// create()

//read
function read(){
    UserModel.find(function (err, docs){
        console.log('find()', err, docs);
    })
    UserModel.find({username:'Tom'}, function (err, doc){
        console.log('find()', err, doc);
    })
    UserModel.findOne({username:'Bob'}, function (err, doc){
        console.log('findOne()', err, doc);
    })
}
// read()

//update
function update(){
    UserModel.findByIdAndUpdate({_id:'5f416cb1a477ba1894069a63'}, {username:'Jack', type:'boss'}, function (err, oldDoc){
        console.log('findByIdAndUpdate()', err, oldDoc);
    })
}
// update()

//delete
function testDelete(){
    UserModel.remove({_id:'5f416cb1a477ba1894069a63'}, function (err, doc){
        console.log('remove()', err, doc);
    })
}
// testDelete()