var fs = require('fs')
var dbPath = './db.json'

// 数据处理层，对数据的逻辑处理


// 对数据的增删改查的操作处理,要注意的是fs的操作都是异步的，
// 不能用return来获取异步API的数据
// 我们使用封装自己的回调函数来获取异步操作的结果

// 查找所有的学生对象

exports.find = function (callback) {
    fs.readFile(dbPath,'utf-8',function(err,data){
        if(err){
            return callback(err)
        }
        callback(null,JSON.parse(data))
    })
}


// 保存学生对象

exports.save = function (student,callback) {
    fs.readFile(dbPath,'utf-8',function(err,data){
        if(err){
            return callback(err)
        }
        var students = JSON.parse(data).students;
        student.id = students[students.length - 1].id + 1;
        students.push(student);
        var fileData = JSON.stringify({
            students:students
        });
        fs.writeFile(dbPath,fileData,function(err){
            if(err){
                return callback(err)
            }
            callback(null)
        })
    })
}


// 更新单条学生对象信息

exports.findById = function (comment,callback) {
    fs.readFile(dbPath,'utf-8',function(err,data){
        if(err){
            return callback(err)
        }
        var students = JSON.parse(data).students;
        var id = parseInt(comment.id);
        var student = students.find(function(item) {
            return item.id === id;
        })
        callback(null,student)
    })
}

// 更新单条学生对象信息

exports.update = function (callback) {
    fs.readFile(dbPath,'utf-8',function(err,data){
        if(err){
            return callback(err)
        }
        callback(null,JSON.parse(data))
    })
}


// 删除单条学生对象

exports.delete = function (comment,callback) {
    fs.readFile(dbPath,'utf-8',function(err,data){
        if(err){
            return callback(err)
        }
        var students = JSON.parse(data).students;
        var deleteIndex = students.findIndex(function(value, index, arr) {
            return value.id === comment.id;
        })
        students.splice(deleteIndex,1);
        var fileData = JSON.stringify({
            students:students
        });
        fs.writeFile(dbPath,fileData,function(err){
            if(err){
                return callback(err)
            }
            callback(null)
        })
    })
}
