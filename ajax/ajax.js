const http = require('http')
const fs = require('fs')
const url = require('url')

const server = http.createServer((req, res) => {
    //根据请求的路径判断
    let parseUrl = url.parse(req.url, true)
    let path = parseUrl.path
    console.log(path)
    if (path === '/index.html') {
        console.log('建立请求')
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html;charset=utf-8')
        res.setHeader('Access-Control-Allow-Origin','*')
        res.end(`<!DOCTYPE html><html><link href="./pubilc/ajax.css" rel="stylesheet" type="text/css"><body><h1>我是一个h1标签</h1><div class="main">css文件</div><body></html>`)
    }
    if(path === '/pubilc/ajax.css'){
        console.log('css')
        res.statusCode = 200
        res.setHeader('Content-Type','text/css;charset=utf-8')
        console.log(fs.readFileSync('./pubilc/ajax.css'))
        res.end(fs.readFileSync('./pubilc/ajax.css'))
    }
    if(path==="/favicon.ico"){
        res.write('我没有这个文件')
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