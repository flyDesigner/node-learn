var http = require("http");
var fs = require('fs');




//fs写入文件，第一个参数为路径，第二个参数为写入的内容，第三个为回调参数
// 成功：error为null
// 失败：error为错误对象
// fs.writeFile('./01.txt','11111111111',function(error){
//     console.log()
// })


// fs.readFile('./01.txt',function(err,data){
//     console.log(data.toString())
// });

// ip地址用来定位计算机
// 端口号用来定位定位具体的应用程序
// 所有需要联网通信的应用程序会占用一个端口号

// 使用http.createServer()方法创建一个Web服务器，返回一个server实例



var server = http.createServer();

server.on('request',function(request,response){
    // 在服务端默认发送的数据，其实是utf-8编码格式的
    // 但是浏览器不知道这是utf-8编码的内容，浏览器在不知道服务器响应内容的情况下
    // 会按照当前操作系统的默认编码格式去解析,中文操作系统的默认编码是GBK格式
    // 解决方式就是在发送回复的时候告诉浏览器编码格式
    
    console.log('收到客户端的请求'+ request.url);
    console.log('收到客户端的端口号'+ request.socket.remotePort);
    console.log('收到客户端的地址与端口号是' + request.socket.remoteAddress,request.socket.remotePort);
    let url = request.url;
    if(url == '/'){
        response.setHeader('Content-Type','text/plain; charset=utf-8');
        response.end("index home，测试123");
    }else if(url == '/login'){
        response.end('login end');
    }else if(url == '/html'){
        // 设置编码格式，其为html格式
        response.setHeader('Content-Type','text/html; charset=utf-8');
        response.end('<p>hell <a href="">点我</a><p>');
    }else{
        response.end('404 found');
    }
})

server.listen(3000,function(){
    console.log('服务器启动成功了，通过losthost：3000启动')
})

