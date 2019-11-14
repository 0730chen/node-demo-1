var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2] //指定端口

if (!port) {
    console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
    process.exit(1)
}

var server = http.createServer(function (request, response) {
    var parsedUrl = url.parse(request.url, true)
    var pathWithQuery = request.url
    var queryString = ''
    if (pathWithQuery.indexOf('?') >= 0) { queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
    var path = parsedUrl.pathname
    var query = parsedUrl.query
    var method = request.method
    console.log('路径（带查询参数）为：' + pathWithQuery)
    response.statusCode = 200 //状态码
    response.setHeader('Content-Type', ';charset=utf-8') //响应的描述信息，
    //pathWithQuery是查询参数
    //如果是根路径就是index.html
    const filePath = path ==='/'?'/index.html':path
    const index  = filePath.lastIndexOf('.')
    const suffix = filePath.substring(index)
    //获取路径的后.后面的数据判断

    //hash表  选择相匹配的文件类型 使用hash表来匹配动态参数
    const fileType={
        '.html':'text/html',
        '.css':'text/css',
        '.js':'text/javascript',
        '.png':'image/png',
        '.jpg':'image/jpeg',
    }
    response.setHeader('Content-Type',`${fileType[suffix]||`text/html`}`,';charset=utf-8') 
    let content
    try {
        content = fs.readFileSync(`./public/${filePath}`)
    } catch (error) {
        content = `文件不存在`
        response.statusCode = 404
    }
    response.write(content)

   response.end()

    /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + 'http://localhost:' + port)