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
