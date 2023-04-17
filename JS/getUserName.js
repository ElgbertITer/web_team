        // console.log(location.search);
        // 1.获取参数  去掉 ?
        var params = location.search.substr(1);
        //substr(indexStart,indexEnd)，可以只写一个参数，此时默认为起始位置，且默认取到最后一个
        console.log(params);
        // 2.获取对象，去掉 u_name
        var info = params.split('=')[1];
        // split('string') 以string为分隔符，将参数转换为数组，获取下标为 1 的项
        var result = info.split('&')[0]
        console.log(result);
        // 3.添加到HTML中
        var login = document.querySelector('.login');
        login.innerHTML = result + '，欢迎您！';