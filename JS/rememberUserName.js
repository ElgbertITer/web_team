var username = document.querySelector('#username');
var password = document.querySelector('#password');
var remember = document.querySelector('#remember');
var sub = document.querySelector('#submit');
var err = document.querySelector('#errorMsg');


if (localStorage.getItem('username') && localStorage.getItem('password')){
    username.value = localStorage.getItem('username');
    password.value = localStorage.getItem('password');
    remember.checked = true;
}
username.addEventListener('input',check);
username.addEventListener('blur',Blur)
password.addEventListener('input',check);
password.addEventListener('blur',Blur);
remember.addEventListener('change',storageUserInfos);
sub.addEventListener('click',storageUsernameOnly); 

function check() {
    if(username.value.trim() === "" || password.value.trim() === ""){
        console.log("用户名或密码为空");//测试
        var errmsg = "用户名和密码不能为空";
        remember.setAttribute('disabled',true);    
        err.innerHTML = errmsg;
       
    }else if(username.value.trim().length > 0 || password.value.trim().length > 0){
        console.log("用户名和密码不为空");//测试
        var msg = '';
        remember.removeAttribute('disabled');
        err.innerHTML = msg;
    }
}
function Blur() {
    err.innerHTML = '';
}
// 可能是因为Firefox和Chrome对于localStorage存储数据的限制不同所导致的。
// 在Firefox中，如果您正在使用file://协议打开页面，则localStorage将不会生效。
// 这是因为Firefox将此视为本地文件系统上的页面，并禁用了某些JavaScript功能。
// 如果您在Firefox中使用http://或https://协议打开页面，则应该能够正常使用localStorage。

// 此外，如果您已经在Firefox中禁用了cookie，则localStorage也将被禁用。请确保在Firefox的隐私设置中启用cookie
function storageUserInfos() {
    if (this.checked) {
        localStorage.setItem('username',username.value);
        localStorage.setItem('password',password.value);
    }else {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
    }
}
function storageUsernameOnly() {
    localStorage.setItem('username',username.value);
    console.log('usernameOnly');
}