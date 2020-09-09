var express = require('express');
const { route } = require('./users');
const md5 = require('blueimp-md5')
const { UserModel, ChatModel } = require('../db/models');
const filter = {password:0, __v:0}
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//register
router.post('/register', function (req, res){
  const {username, password, type} = req.body
  UserModel.findOne({username}, function (err, doc){
    if(doc){
      res.send({code:1, msg:'this username has already registed'})
    }else{
      const userModel = new UserModel({username, type, password:md5(password)})
      userModel.save(function (err, doc){
        res.cookie('userid', doc._id, {maxAge:1000*60*60*24})
        const data = {username, type, _id: doc._id}
          res.send({code:0, data})
      })
    }
  })
})

//login
router.post('/login', function (req, res){
  const {username, password} = req.body
  UserModel.findOne({username, password:md5(password)}, filter, function (err, doc){
    if(doc){
      res.cookie('userid', doc._id, {maxAge:1000*60*60*24})
      res.send({code:0, data:doc})
    }else{
      res.send({code:1, msg:'username and password doesn\'t match'})
    }
  })
})

//update
router.post('/update', function (req, res){
  const user = req.body
  const userid = req.cookies.userid
  if(!userid){//if user clear cookies, ask them to login page
    return res.send({code:1, msg:'Please login first'})
  }
  UserModel.findByIdAndUpdate({_id:userid}, user, function (err, oldUser){
    if(!oldUser){
      res.send({code:1, msg:'Please login first'})
      res.clearCookie('userid')
    }else{
      const {_id, username, type} = oldUser
      const data = Object.assign({_id, username, type}, user)//es6
      res.send({code:0, data})
    }
  })
})

//get user based on the userid in cookie
router.get('/user', function (req, res){
  const userid = req.cookies.userid
  if(!userid){//if user clear cookies, ask them to login page
    return res.send({code:1, msg:'Please login first'})
  }
  //read user baased on userid
  UserModel.findOne({_id:userid}, filter, function (err, user){
    res.send({code:0, data:user})
  })
})

//get userlist
router.get('/userlist', function (req, res){
  const {type} = req.query
  UserModel.find({type}, filter, function (err, users){
      res.send({code:0, data:users})
  })
})

//get current user's chatting message list
router.get('/msglist', function (req, res){
  const userid = req.cookies.userid
  //search all users
  UserModel.find(function (err, userDocs){
    const users = {} //object container
    userDocs.forEach(doc =>{
      users[doc._id] = {username: doc.username, header: doc.header}
    })
    //search all chat message that related to userid
    ChatModel.find({'$or': [{from: userid}, {to: userid}]}, filter, function (err, chatMsgs){
      res.send({code:0, data: {users, chatMsgs}})
    })
  })
})

//change {read} to true
router.post('/readmsg', function (req, res){
  const to = req.body.from
  const from = req.cookies.userid
  ChatModel.update({from, to, read: false}, {read: true}, {multi: true}, function (err, doc){
    console.log('/readmsg', doc);
    res.send({code:0, data: doc.nModified})
  })
})

module.exports = router;
