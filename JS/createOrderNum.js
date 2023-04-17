var sp = document.querySelector('span');
// 返回当前时间戳，单位为毫秒
var timestamp = new Date().getTime();
// 返回当前日期和时间
var currentDate = new Date();
// 返回当前日期和时间的本地字符串格式，如"2023-03-26 13:30:00"
var dateString = currentDate.toLocaleString(); 
sp.innerText = dateString;