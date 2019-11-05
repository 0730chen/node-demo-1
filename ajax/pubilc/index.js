console.log('ajax')
//ajax四部走

// const xhr = new XMLHttpRequest()//1.创建对象
// xhr.open()//发送请求
// //监听onreadystateChage事件
// xhr.onreadystatechange = () => {

//     if (xhr.readyState === 4 && xhr.status === 200) {
//         console.log(xhr.responseText)
//     }
// }
// xhr.send()
//封装一下这个ajax请求
const ajax = (url, fn) => {
    const xhr = new XMLHttpRequest()//1.创建对象
    xhr.open('get', url)//发送请求
    //监听onreadystateChage事件
    let result = ''
    xhr.onreadystatechange = () => {

        if (xhr.readyState === 4 && xhr.status === 200) {
            fn.call('', xhr.responseText)
        }
    }
    xhr.send()
    return result
}

//原生方法
let main = document.querySelector('.main')
html.onclick = () => {
    console.log('发起请求Html数据')
    let xhr = new XMLHttpRequest()
    xhr.open('get','http://127.0.0.1:8888/index.html')
    xhr.onreadystatechange = ()=>{
        if(xhr.readyState === 4  &&  xhr.status === 200){
            console.log(typeof xhr.responseText)
            
            main.innerHTML = xhr.responseText
        }
    }
    xhr.send()
}
css.onclick = ()=>{
    console.log(`请求Css数据`)
    let xhr = new XMLHttpRequest()
    xhr.open('get','http://127.0.0.1:8888/css')
    xhr.onreadystatechange = ()=>{
        if(xhr.readyState ===4 &&xhr.status ===200){
            console.log(xhr.responseText)
        }
    }
    xhr.send()
}
xml.onclick = ()=>{
    console.log('xml')
    let xhr = new XMLHttpRequest()
    xhr.open('get','http://127.0.0.1:8888/xml')

    xhr.onreadystatechange = ()=>{
        console.log('请求')
        if(xhr.readyState === 4 && xhr.status === 200){
            console.log(xhr.responseXML)
            let res = xhr.responseXML
            let div = res.getElementsByTagName('bookstore')[0].textContent
            console.log(div.trim())
            main.innerHTML = div.trim()
        }
    }
    xhr.send()
}
json.onclick = ()=>{
    console.log('json')
    let xhr = new XMLHttpRequest()//0
    xhr.open('get','http://127.0.0.1:8888/json')
    xhr.onreadystatechange = ()=>{
        if(xhr.readyState ===4 &&xhr.status ===200){
            console.log(xhr.responseText)
        }
    }
    xhr.send()//最重要的一步

}
let i = 1
getpage.onclick = ()=>{
    i = i+1
    if(i===4){
        i = 2
    }
    console.log('下一页')
    let xhr = new XMLHttpRequest()
    xhr.open('get',`http://127.0.0.1:8888/page${i}`)
    xhr.onreadystatechange = ()=>{
        if(xhr.readyState ===4 &&xhr.status ===200){
            console.log(xhr.responseText)
            const array = JSON.parse(xhr.responseText)
            array.forEach(e => {
                let li = document.createElement('li')
                li.innerHTML = e.id
                page.appendChild(li)
                
            });
        }
    }
    xhr.send()

}

//客户端将函数定义好
//服务端执行这个函数
const random = Math.random()
//使用随机数优化
window[random] = (data)=>{
    console.log(data)
}
window.show = (data)=>{
    console.log(data)
}
let script = document.createElement('script')
script.src = `http://127.0.0.1:8888/jsonp.js?functionName=${random}`
script.onload = ()=>{
    script.remove()
}
document.body.appendChild(script)
