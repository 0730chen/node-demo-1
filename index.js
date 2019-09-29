var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2] //指定端口

if (!port) {
    console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
    process.exit(1)
}

var server = http.createServer(function(request, response) {
    var parsedUrl = url.parse(request.url, true)
    var pathWithQuery = request.url
    var queryString = ''
    if (pathWithQuery.indexOf('?') >= 0) { queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
    var path = parsedUrl.pathname
    var query = parsedUrl.query
    var method = request.method
    console.log('路径（带查询参数）为：' + pathWithQuery)

    if (path === '/') {
        response.statusCode = 200 //状态码
        response.setHeader('Content-Type', 'text/html;charset=utf-8') //响应的描述信息，
        response.write(`<!DOCTYPE html><html><link href="/css" rel="stylesheet" type="text/css" /><body><h1>我是一个h1标签</h1><body></html>`)
        response.end()
    } else if (path === '/css') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/css;charset=utf-8')
        response.write(`h1{color:red;}`)
        response.end()
    } else {
        response.statusCode = 404
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(`你访问的页面不存在`)
        response.end()
    }

    /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + 'http://localhost:' + port)