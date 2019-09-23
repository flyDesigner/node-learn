var fs = require('fs')
var express = require('express')
var student = require('./student')


// 创建路由
var router = express.Router();

var comments = [
    {
      name: '张三',
      message: '今天天气不错！',
      dateTime: '2015-10-16'
    },
    {
      name: '张三2',
      message: '今天天气不错！',
      dateTime: '2015-10-16'
    },
    {
      name: '张三3',
      message: '今天天气不错！',
      dateTime: '2015-10-16'
    },
    {
      name: '张三4',
      message: '今天天气不错！',
      dateTime: '2015-10-16'
    },
    {
      name: '张三5',
      message: '今天天气不错！',
      dateTime: '2015-10-16'
    }
  ]

// 设计不同的路由，实现不同的功能

router.get('/', function (req, res) {
    res.render('index.html',{
        comments:comments
    })
});
router.get('/about', function (req, res) {
    res.render('post.html')
});
router.get('/student', function (req, res) {
//   fs.readFile('db.json',function(err,data){
//     if (err) {
//       return res.end('404 Not Found.')
//     }
//     res.render('student.html',JSON.parse(data.toString()))
//   })
    student.find(function(err,data){
        if(err){
            return res.status(500).sendStatus('server error')
        }
        res.render('student.html',data)
    })
});
router.get('/student/new', function (req, res) {
    res.render('new.html')
});
router.post('/student/new', function (req, res) {
    var comment = req.body;
    student.save(comment,function(err){
        if(err){
            return res.status(500).sendStatus('server error')
        }
        res.redirect(302,'/student')
    })
});
router.get('/student/edit', function (req, res) {
    var comment = req.query;
    student.findById(comment,function(err,data){
        if(err){
            return res.status(500).sendStatus('server error')
        }
        res.render('edit.html',{student:data})
    })
    
});
router.get('/student/delete', function (req, res) {
    var comment = req.query;
    student.delete(comment,function(err){
        if(err){
            return res.status(500).sendStatus('server error')
        }
        res.redirect(302,'/student')
    })
});
router.post('/pinglun', function (req, res) {
    var comment = req.body;
    console.log(comment);
    comment.dateTime = getCurrenyTime();
    comments.unshift(comment);
    // res.redirect(302,'/');
    res.statusCode = 302
    res.setHeader('Location', '/')
    res.end()
})

module.exports = router;