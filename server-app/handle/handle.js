const {UserModel} = require('../db/models');
const md5 = require('blueimp-md5')

function Register(req,res) {
    let {username,password,type} = req.body;
    //值为空
    if(!username||!password||!type){
        res.send({code:0,message:"用户名或者密码值为空"});
    }
    //检测用户是否存在
    UserModel.findOne({username},function (err,user) {
        //存在，返回code：0
        if(user){
            res.send({code:0,message:'用户名存在'});
        } else{ //不存在
            new UserModel({username,type,password:md5(password)}).save(function (err,user) {
                let data = {username,type,_id:user._id};
                res.send({code:1,data:data});
            });

        }
    })
}

exports.Register = Register;