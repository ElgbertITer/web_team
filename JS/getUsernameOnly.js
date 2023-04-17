// 获取本地存储中的记住用户名  
var rememberedUsername = localStorage.getItem("username");
var login = document.querySelector('.login');

// 检查浏览器是否支持本地存储
if (typeof(Storage) !== "undefined") {

    if (rememberedUsername !== null) {
        // 显示记住的用户名
        console.log("Remembered username is: " + rememberedUsername);//测试
        correct();
    } else {    
        console.log("No remembered username found.");  //测试
        nullUser();
    }
} else {  
    console.log("Browser does not support web storage.");
}
function correct() {
    login.innerHTML = rememberedUsername + '，欢迎您！';
    login.href = './profile.html';
}
function nullUser() {
    login.innerHTML = '登录/注册';
    login.href = './login.html';
}