var username = document.querySelector('#username');
var password = document.querySelector('#password');
var sub = document.querySelector('#submit');
var err = document.querySelector('#errorMsg');

var regUsername = /^1[3-9]\d{9}$/;
var regPassword = /^[a-zA-Z_]\w{5,15}$/;

var emsg_U = '请输入国内手机号';
var emsg_P = '请输入正确的密码格式：密码为6-16位英文、数字、下划线的组合，第一个字符不能为数字';
var emsg_B = '用户名和密码不能为空';

username.addEventListener('input',checkUsername);
username.addEventListener('focus',checkUsername);
password.addEventListener('input',checkPassword);
password.addEventListener('focus',checkPassword);

// 设置用户名和密码格式
function checkUsername() {
    // 用户名为国内手机号格式
    if(!regUsername.test(username.value.trim())) {
        err.innerHTML = emsg_U;
        set();
        console.log(err.innerHTML);//测试
    }else {
        correct();
        move();
    }

}
function checkPassword() {
    // 密码为6-16位英文、数字、下划线的组合，第一个字符不能为数字
    if(!regPassword.test(password.value.trim())) {
        err.innerHTML = emsg_P;
        set();
        console.log(err.innerHTML);
    }else {
        correct();
        move();
    }
}
function correct() {
    err.innerHTML = '';
}

function set() {
    sub.setAttribute('disabled',true);
}
function move() {
    sub.removeAttribute('disabled');
}