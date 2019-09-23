var template = require('art-template')
var fs = require('fs')
var express = require('express')
var bodyParser = require('body-parser')
var router = require('./router.js')



var server = express();

// 在框架express中配置模版引擎
server.engine('html', require('express-art-template'));

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// 如果要修改默认的views目录，则可以
// server.set('views',render函数的默认路径)

server.use('/public/', express.static('./public/'));
// 不加路径参数的时候，默认直接加上/public/
// server.use(express.static('./public/'));

// 把导入的路由挂载上去
server.use(router);

// 用路由方式代替请求的路径代码，更加模块化，方便代码维护
// server.get('/', function (req, res) {
//     res.render('index.html',{
//         comments:comments
//     })
// });
// server.get('/about', function (req, res) {
//     res.render('post.html')
// });
// server.get('/student', function (req, res) {
//   fs.readFile('db.json',function(err,data){
//     if (err) {
//       return res.end('404 Not Found.')
//     }
//     res.render('table.html',JSON.parse(data.toString()))
//   })
// });
// server.post('/pinglun', function (req, res) {
//     var comment = req.body;
//     console.log(comment);
//     comment.dateTime = getCurrenyTime();
//     comments.unshift(comment);
//     // res.redirect(302,'/');
//     res.statusCode = 302
//     res.setHeader('Location', '/')
//     res.end()
// })

function getCurrenyTime() {
  var today = new Date();
  var day = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate();
  var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  return day;
}

server.listen(3000, function () {
  console.log('running...')
})
