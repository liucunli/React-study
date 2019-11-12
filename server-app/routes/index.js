const express = require('express');
const router = express.Router();
const {Register} = require('../handle/handle');
const {UserModel} = require('../db/models');
const md5 = require('blueimp-md5');
const filter = {password:0,__v:0};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register',function(req,res){
  let {username,password,type} = req.body;
  //值为空
  if(!username||!password||!type){
    res.send({code:0,message:"用户名或者密码值为空"});
  }
  else {
    //检测用户是否存在
    UserModel.findOne({username},function (err,user) {
      //存在，返回code：0
      if(user){
        res.send({code:0,message:'用户名存在'});
      } else{ //不存在
        new UserModel({username,type,password:md5(password)}).save(function (err,user) {
          let data = {username,type,_id:user._id};
          res.cookie('userid', user._id, {maxAge: 1000*60*60*24*7});//maxAge:保存时间
          res.send({code:1,data:data});
        });
      }
    })
  }
});

router.post('/login',function (req,res) {
  //获取username，password
  let {username,password} = req.body;

  //验证username，password的合法性
  if(!username||!password){
    res.send({code:0,message:'用户名或者密码值为空'});
  }

  //验证用户名与密码是否正确
  UserModel.findOne({username:username,password:md5(password)},filter,function (err,user) {
    console.log(err,user);
    if(user){
      res.cookie('userid', user._id, {maxAge: 1000*60*60*24*7});//maxAge:保存时间
      res.send({code:1,data:user});
    } else{
      res.send({code:0,message:'用户名或者密码错误'});
    }
  })

})

//更新数据
router.post('/update',function (req,res) {
  //从cookie获取id
  const userid = req.cookies.userid;
  //获取更新后的数据
  const user = req.body;

  //判断是否取出数据，cookie可能已过期
  if(!userid){
    return res.send({code:-1,msg:'请登录'});
  }

  //更新数据
  UserModel.findByIdAndUpdate({_id: userid},user,function (err,oldUser) {
    console.log(err,oldUser);
    if(!oldUser){
      return res.send({code:0,msg:'请登录'});
    }
    else{
      const {_id,username,type} = oldUser;
      const data = Object.assign({_id,username,type},user);
      return res.send({code:1,data});
    }
  })
})

//通过userid获取数据
router.post('/user',function (req,res) {
  //从cookie获取id
  const userid = req.cookies.userid;
  if(!userid){
    res.send({code:0,msg:'请登录'});
  }

  UserModel.findOne({_id:userid},filter,function (err,user) {
    if(!user){
      res.clearCookie('userid');
      res.send({code:0,msg:'请登录'});
    } else {
      res.send({code:1,data:user});
    }
  })
})

module.exports = router;
