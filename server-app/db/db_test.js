//1-引入mongoose
const mongoose = require('mongoose');
//加密库
const md5 = require('blueimp-md5');
//2-连接指定数据库，url：('mongodb://localhost:27017/gzhipin_test2')
mongoose.connect('mongodb://localhost:27017/test',{ useNewUrlParser: true, useUnifiedTopology: true });
//3.获取数据库对象
let conn = mongoose.connection;
//4.绑定连接完成的监听
conn.then( () => {console.log('localhost:test success');}).catch((err) => console.log(err.message));

//5.创建数据库集合(表)的约束
const userSchema = mongoose.Schema({
    user:{type:String,required:true},
    password:{type:String,required:true},
    type:{type:String,required:true},
    header:{type:String}
});

//6.定义Model(构造方法)
const UserModel = mongoose.model('user',userSchema);//users集合(表)

//crud增删改查
//存数据,model的save()方法
function testSave() {
    const userModel = new UserModel({user:'zs',password:md5('14'),type:'user'});
    
    userModel.save(function (err,user) {
        console.log('save()',err,user)
    })
}
//testSave();

//查数据，model的find()和findOne()方法
function testFind() {
    UserModel.find({user:'zs'},function (err,user) {
        console.log('find()',err,user);
    })

    //只会返回一条数据，第一条匹配的数据
    UserModel.findOne({user:'zs'},function (err,user) {
        console.log('findOne()',err,user);
    })
}
testFind();

//改数据，model的findByIdAndUpdate()
function testUpdate() {
    UserModel.updateOne({_id:'5db9962cb0ed69377ce4197e'},
        {user:'lsss'},function (err,user) {
            console.log('update()',err,user);
        })
}
//testUpdate();

//删除数据，model的remove()
function testDetele() {
    UserModel.deleteOne({user:'zs'},function (err,user) {
        console.log("remove()",err,user);
    })
}
testDetele();