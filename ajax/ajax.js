const http = require('http')
const fs = require('fs')
const url = require('url')

const server = http.createServer((req, res) => {
    //根据请求的路径判断
    let parseUrl = url.parse(req.url, true)
    var pathWithQuery = req.url
    var queryString = ''
    if (pathWithQuery.indexOf('?') >= 0) { queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
    var query = parseUrl.query
    var method = req.method
    let path = parseUrl.pathname
    console.log(query)
    console.log(path)
    if (path === '/index.html') {
        console.log('建立请求')
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html;charset=utf-8')
        res.setHeader('Access-Control-Allow-Origin', '*')
        let String = fs.readFileSync('./pubilc/index.html').toString()
        let page1 = fs.readFileSync('./pubilc/db/page1.json').toString()
        const array = JSON.parse(page1)
        let result = array.map(item => {
            return `<li>${item.id}</li>`
        }).join('')
        String = String.replace("{{page1}}", `<ul id="page">${result}</ul>`)
        res.write(String)
        res.end()
    } else if (path === '/index.js') {
        console.log('js')
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/javascript;charset=utf-8')
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.write(fs.readFileSync('./pubilc/index.js'))
        res.end()
    } else if (path === '/pubilc/ajax.css') {
        console.log('css')
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/css;charset=utf-8')
        res.write(fs.readFileSync('./pubilc/ajax.css'))
        res.end()
    } else if (path === "/favicon.ico") {
        res.write('我没有这个文件')
        res.end()
    } else if (path === '/css') {
        console.log('请求我')
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/css;charset=utf-8')
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.write(fs.readFileSync('./pubilc/ajax.css'))
        res.end()
    } else if (path === '/xml') {
        console.log('xml')
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/xml;charset=utf-8')
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.write(fs.readFileSync('./pubilc/index.xml'))
        res.end()
    } else if (path === '/json') {
        console.log('json')
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/json;charset=utf-8')
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.write(fs.readFileSync('./pubilc/index.json'))
        res.end()
    } else if (path === "/page2") {
        console.log(`page2`)
        res.statusCode = 200
        res.setHeader('Content-Type', "text/json;charset=utf-8")
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.write(fs.readFileSync('./pubilc/db/page2.json'))
        res.end()
    } else if (path === "/page3") {
        console.log(`page3`)
        res.statusCode = 200
        res.setHeader('Content-Type', "text/json;charset=utf-8")
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.write(fs.readFileSync('./pubilc/db/page3.json'))
        res.end()
    } else if (path === "/jsonp.js") {
        //使用检查referer检查，防止别人进行访问这个js文件
        
        console.log(`jsonp.js`)
        console.log(path)
        console.log(query.functionName)
        res.statusCode = 200
        res.setHeader('Content-Type', "text/javascript;charset=utf-8")
        let string = fs.readFileSync('./pubilc/jsonp.js').toString()
        let data = fs.readFileSync('./pubilc/data.json').toString()
        let string2 = string.replace('{{data}}', data).replace(`{{functionName}}`,query.functionName)
        res.write(string2)
        res.end()
    } else {
        res.statusCode = 404
        res.write('not found')
        res.end()
    }
    // if(path ==='/public/ajax.css'){
    //     console.log(`css`)
    //     res.statusCode = 200
    //     res.setHeader('Content-Type','text/css;charset=utf-8')
    //     fs.readFileSync('./pubilc/ajax.css')
    //     res.end('css请求')
    // }
}).listen('8888', () => { console.log(8888) })