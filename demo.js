// 导入
var mongoose = require('mongoose');

// 设置文档模型
var Schema = mongoose.Schema;


// 连接数据库
mongoose.connect('mongodb://localhost/local');

// 创建文档模型
var blogSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
    }
});

// 将文档结构发布为模型
// mongoose.model方法就是将一个架构发布为model
// 第一个参数：传入一个大写名词单数字符串用来表示你的数据库名称
//            mongoose会自动将大写名词单数的字符串生成小写复数的集合名称
//            例如这里的Student最终会变成 students 集合名称
// 第二个参数：架构schema
// 返回值为模型构造函数
var studentModel = mongoose.model('Student',blogSchema);

// 使用方法：


// 新增的时候
var admin = new studentModel({
    username:"admin",
    password:"123456",
    email:"admin@admin.com",
})

admin.save(function(err,ret){
    if(err){
        console.log("保存失败")
    }else{
        console.log(ret)
    }
})

// 条件查询
Student.find(function(err,res){
    if(err){
        console.log("查询失败")
    }else{
        console.log(ret)
    }
})

// 条件查询首个
Student.findOne({
    username:"za"
},function(err,res){
    if(err){
        console.log("查询失败")
    }else{
        console.log(ret)
    }
})


// 条件删除
Student.deleteMany({
    username:"za"
},function(err,res){
    if(err){
        console.log("删除失败")
    }else{
        console.log(ret)
    }
})

// 条件删除
Student.deleteOne({
    username:"za"
},function(err,res){
    if(err){
        console.log("删除失败")
    }else{
        console.log(ret)
    }
})

