var http = require("http");
var fs = require("fs");
var path = require("path");
var mime = require("mime");
var template = require("art-template");
var cache = {};
// var dir = 'F:/stsFFF';
var dir = 'F:/stsFFF/vue2-iview2-admin-master/src/pages/text1';

function send404(response){
	response.writeHead(404,{'Content-Type':'text/plain'});
	response.write('Error 404 :resource not found.');
	response.end();
}

function sendFile(response,filePath,fileContents){
    response.writeHead(200,{
        "content-type":mime.lookup(path.basename(filePath))
    });
	response.end(fileContents);
}

function serveStatic(response,absPath){
    fs.exists(absPath,function(exists){
        if(exists) {
            fs.readFile(absPath,function(err,data){
                if(err){ 
                    send404(response);
                }else{
                    sendFile(response,absPath,data);
                }
            });
        }else{
            send404(response);
        }
    });
}

var server = http.createServer(function(request,response){
	// var filePath = false;
	// if(request.url == '/') {
    //     filePath = 'public/index.html';
    // }else{
	// 	filePath = 'public'+request.url;
    // }
	// var absPath = './' + filePath;
    // serveStatic(response,absPath);
    fs.readFile('public/templete.html',function(err,data){
        if(err){
            response.setHeader('Content-Type','text/plain; charset=utf-8');
            response.end("文件读取失败");
        } else{
            // response.setHeader('Content-Type','text/html; charset=utf-8');
            fs.readdir(dir,function(err,files){
                if(err){
                    return response.end("找不到目录");
                }
                var data2 = template.render(data.toString(),{
                    files:files
                });
                response.end(data2);
            })
            
        }
    })
})

server.listen(3000,function(){
    console.log("server listening on port 3000");
})

// var chatServer = require('./lib/chat_server');
// chatServer.listen(server);








