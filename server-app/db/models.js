const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/zhaopin',{useNewUrlParser: true,
    useUnifiedTopology: true});

const conn = mongoose.connection;

conn.then(function () {
    console.log('success');
}).catch(function (err) {
    console.log(err.message);
})

//定义集合约束
const UserSchema = mongoose.Schema({
    username: {type: String, required: true}, // 用户名
    password: {type: String, required: true}, // 密码
    type: {type: String, required: true}, // 用户类型: dashen/laoban
    header: {type: String}, // 头像名称
    post: {type: String}, // 职位
    info: {type: String}, // 个人或职位简介
    company: {type: String}, // 公司名称
    salary: {type: Number} // 工资
});

//定义Model
const UserModel = mongoose.model('user',UserSchema);//users集合的构造方法

//暴露UserModel
exports.UserModel = UserModel;
