// 服务类型导航盒子
var serviceList = document.getElementById('service');
// 寄件盒子
var ji = document.querySelector(".jijian");
// 查件盒子
var cha = document.querySelector('.chajian');
// 运费说明盒子
var ct = document.querySelector('.content');
// 获取#serviceSelect上所有的li和a元素
var lis = document.querySelectorAll('#serviceSelect li');
var as = document.querySelectorAll('#serviceSelect li a');
// 获取订单类型导航#cjNav上的所有li元素
var cjNavLis = document.querySelectorAll('#cjNav li');
// 空包裹盒子
var cjNull = document.querySelector('.cjNullPack');
// 包裹盒子 & 当前订单盒子
var cjPack = document.querySelector('.cjPack');
// 获取盒子中的table元素
var table = cjPack.querySelector('table tbody');
// 获取table元素中的所有tr元素
var trList = table.querySelectorAll('tr');
// 获取tr元素的个数
var trCount = trList.length;
// 历史订单盒子
var historyOrder = document.querySelector('.historyPack');
// 空历史订单
var historyOrderNull = document.querySelector('.historyPack .Null');
// 非空历史订单
var historyOrderNotNull = document.querySelector('.historyPack .notNull');
// Get the reference to all the input fields
var inputs = document.querySelectorAll('#sender input[type="text"], #receiver input[type="text"]'); 
// 提交订单按钮
var submitBtn = document.getElementById('okSend');


// 1.提交订单
function submitOrder() {
    submitBtn.addEventListener('click', function(event) {
        // Prevent the default form submission behavior
        event.preventDefault();
        checkNull();
        pay();
        toSearch();
        toCurrentOrder();
        getPackInfo();
        trCount++;
        console.log('tr的数量为:'+trCount);

    });
    
    // 1.1 获取订单信息
    function getPackInfo() {
               
        var time = orderTime();
        var num = createOrderNum();

        table.innerHTML += '<tr>'+'<td>'+num+'</td>'+'<td>'+'国内普通快递'+'</td>'+'<td>'+'未完成'+'</td>'+'<td>'+'货到付款'+'</td>'+'<td>'+time+'</td>'+'<td>'+'<a href="./mapBaidu2.html" target="_blank">'+'查看物流状态'+'</a>'+'</td>'+'</tr>';

        for (var i = 0; i < inputs.length; i++) {
            // Clear the input fields
            inputs[i].value = '';
        }    
    }
    
    // 1.2 模拟支付
    function pay() {
        // 1.2.1 弹出支付二维码
        const paymentQrCode = prompt("请输入支付二维码");
            
        // 1.2.2 模拟支付（假设支付成功）
        const isPaymentSuccess = confirm("模拟支付成功？");
    
        if (isPaymentSuccess) {
            // 1.2.3 支付成功，跳转到查件页面
            ji.style.display = "none";
            ct.style.display = "none";
            cjNull.style.display = "none";
            cha.style.display = "inline-block";
            cjPack.style.display = "inline-block";
        } else {
            // 1.2.4 支付失败，用户可以选择重新支付或者取消
            const isRetry = confirm("支付失败，是否重新支付？");
            if (isRetry) {
                // 重新支付
                submitBtn.click();
            }else {
                ji.style.display = "inline-block";
                cha.style.display = "none";
            }
        }
    }

    // 1.3 跳转到“我要查件”
    function toSearch() {
        lis[0].style.borderBottom = 'none';
        lis[1].style.borderBottom = '2px solid #fff';
    }

    // 1.4 跳转到“当前订单”
    function toCurrentOrder() {
        cjNavLis[0].classList.add('selected');
        cjNavLis[1].classList.remove('selected');
    }

    // 1.5 生成下单时间
    function orderTime() {
        // 返回当前日期和时间
        var currentDate = new Date();
        // 返回当前日期和时间的本地字符串格式，如"2023-03-26 13:30:00"
        var dateString = currentDate.toLocaleString(); 
        return dateString;
    }

    // 1.6 生成订单号——以下单日期为前缀
    function createOrderNum() {
        var currentDate = new Date();
        var year = currentDate.getFullYear().toString();
        var month = (currentDate.getUTCMonth()+1).toString();
        // 随机生成一个4位数
        var randomNum = Math.floor(Math.random() * 9000) + 1000;
        // 不足4位在前面添加 0
        var randomNumStr = randomNum.toString().padStart(4, '0');

        // 订单号
        var orderNum = year + month + randomNumStr;
        return orderNum;
    }

    // 1.7 设置标*号的 寄方信息 和 收方信息 的输入框不能为空
    function checkNull() {
        for(let i=0;i<inputs.length;i++) {
            // 为每一个input添加required属性
            inputs[i].setAttribute('required',true);
        }
        // 移除没有*的输入框的required属性
        inputs[4].removeAttribute('required');
        inputs[10].removeAttribute('required');

        // 空内容提示
        const inputRequireds = document.querySelectorAll('input[required]');
        for(let i=0;i<inputRequireds.length;i++) {
            const requireContent = inputRequireds[i].value.trim();
            if(requireContent.length === 0) {
                submitBtn.setAttribute('disabled',true);
                inputRequireds[i].classList.add('setBorderBottomColor');
                console.log('信息未填写完整！');
            }else {
                submitBtn.removeAttribute('disabled');
                inputRequireds[i].classList.remove('setBorderBottomColor');
            }
        }
    }
}
submitOrder();

// 3.服务导航栏的点击事件——更改背景色及文字颜色,展示“寄件”页
// 3.1 寄件、查件选择的点击事件——添加下边框
function addBorderBottom() {
    lis.forEach((li) => {
        li.addEventListener('click', (event) => {
          // 遍历每个 li 元素并给其添加点击事件
          // 移除所有 li 元素的下边框
          lis.forEach((li) => {
            li.style.borderBottom = 'none';
          });

          // 为当前点击的 li 元素添加下边框
          event.currentTarget.style.borderBottom = '2px solid #fff';
        });
      });
}
addBorderBottom();

// 3.2 寄件、查件选择的点击事件——转换寄件、查件页面
function exchange_J_and_C() {
    // 为每个li和a元素添加一个点击事件监听器
    for (let i = 0; i < lis.length; i++) {
        lis[i].addEventListener('click', function(event) {
            // 阻止链接的默认行为
            event.preventDefault();

            // 检查被点击的元素是第一个还是第二个
            if (event.target === as[0] || event.target === lis[0]) {
                ji.style.display = "inline-block";
                ct.style.display = "inline-block";
                cha.style.display = "none";
            } else if (event.target === as[1] || event.target === lis[1]) {
                ji.style.display = "none";
                ct.style.display = "none";
                cha.style.display = "inline-block";
            }
        });
    }
}
exchange_J_and_C();

// 4.选择服务类型
function chooseServiceType() {
    const liElements = document.querySelectorAll('#service li');

    // 监听ul元素上的点击事件
    serviceList.addEventListener('click', function(event) {
        // 确定用户单击的是哪个a元素
        const clickedElement = event.target;
        // 触发寄件的点击事件
        lis[0].click();

        // 遍历所有li元素
        for (let i = 0; i < liElements.length; i++) {
            const liElement = liElements[i];
            const aElement = liElement.querySelector('a');

            // 检查li元素是否包含目标a元素
            if (aElement === clickedElement) {
                // 更改目标a元素和其父li元素的颜色
                aElement.style.color = '#fff';
                liElement.style.backgroundColor = 'red';
            } else {
                // 更改其他a元素和其父li元素的颜色
                aElement.style.color = '#bfb8b4';
                liElement.style.backgroundColor = '#f2f2f2';
            }
        }
        for (let i = liElements.length-1; i >= 0; i--) {
            const liElement = liElements[i];
            const aElement = liElement.querySelector('a');

            // 检查li元素是否包含目标a元素
            if (aElement === clickedElement) {
                // 更改目标a元素和其父li元素的颜色
                aElement.style.color = '#fff';
                liElement.style.backgroundColor = 'red';
            } else {
                // 更改其他a元素和其父li元素的颜色
                aElement.style.color = '#bfb8b4';
                liElement.style.backgroundColor = '#f2f2f2';
            }
        }
    });
}
chooseServiceType();

// 5.我的包裹点击事件——选择当前订单或历史订单
function choodeOderType() {
    // 循环遍历 li 元素
    for (let i = 0; i < cjNavLis.length; i++) {
        // 为每个 li 元素添加点击事件
        cjNavLis[i].addEventListener('click', function() {
            // 移除之前被选中的 li 元素的样式
            for (let j = 0; j < cjNavLis.length; j++) {
                cjNavLis[j].classList.remove('selected');
            }

            // 给当前选中的 li 元素添加样式
            this.classList.add('selected');
        });
    }
    // 点击“当前订单”——展示.cjPack；点击“历史订单”——展示.historyPack
    cjNavLis[0].addEventListener('click',() => {
        if(trCount>1) {
            cjPack.style.display = 'inline-block';
            cjNull.style.display = 'none';
        }else {
            cjNull.style.display = 'inline-block';
            cjPack.style.display = 'none';
        }
        historyOrder.style.display = 'none';
    })
    cjNavLis[1].addEventListener('click',() => {
        cjPack.style.display = 'none';
        cjNull.style.display = 'none';
        historyOrder.style.display = 'inline-block';
        alert('您还没有历史订单');
    })
}
choodeOderType();

// 6.添加关联事件——服务类型与其相应复选框
function service_to_CheckBox() {
    const svlis = document.querySelectorAll("#service li");
    const checkBox = document.querySelectorAll("#sender form input")

    for(let i = 0; i < svlis.length-1; i++){
        svlis[i].addEventListener('click', checkBoxChange);
    }

    function checkBoxChange(event) {
        event.preventDefault();
        // 遍历所有input元素并将它们的checked属性设置为false
        for (let j = 0; j < checkBox.length; j++) {
            checkBox[j].checked = false;
        }

        // 将被点击的li元素对应的input元素的checked属性设置为true
        const index = Array.from(svlis).indexOf(event.target.parentNode);
        checkBox[index].checked = true;
    }

    // 设置国际服务点击事件
    svlis[3].addEventListener('click',function(event){
        event.preventDefault();
        alert('东封暂不提供国际服务，请选择其他服务');
    })
}
service_to_CheckBox();

