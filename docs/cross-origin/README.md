# 跨域

## 测试使用的后端（nodejs）接口

server.js

```
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');

var app = express();

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var server = app.listen(9091, function () {
    console.log('Server is running at http://192.168.1.127:9091');
});

var userHandler = new (require('./userHandler'));

app.get('/', function (request, response) {
    response.send('Welcome to this server.');
});

app.get('/users', function (request, response) {
    var cb = request.query.cb;
    var result = userHandler.getAllUsers();
    response.send(cb + '(' + JSON.stringify(result) + ')'); // jsonp接口返回形式
});

app.get('/getUserById', function (request, response) {
    var id = request.query.id;
    var result = userHandler.getUserById(id);
    response.send(JSON.stringify(result));
});

app.post('/getUserById', function (request, response) {
    var id = request.body.id;
    var result = userHandler.getUserById(id);
    response.send(JSON.stringify(result));
});
```

userHandler.js

```
var data = require('./data');

function UserHandler () {
    this.getAllUsers = function () {
        var result = {
            code: -1,
            users: null
        };

        if (data.users) {
            result.code = 200;
            result.users = data.users;
        }

        return result;
    }
    this.getUserById = function (id) {
        var result = {
            code: -1,
            user: null
        };

        for (var i = 0; i < data.users.length; i++) {
            if (data.users[i].id == id) {
                result.code = 200;
                result.user = data.users[i];
                break;
            }
        }

        return result;
    }
}

module.exports = UserHandler;
```

data.js

```
exports.users = [
    {
        id: 1,
        name: 'Alina',
        sex: 'female',
        age: 18,
        height: 162
    }, {
        id: 2,
        name: 'Bruce',
        sex: 'male',
        age: 23,
        height: 178
    }, {
        id: 3,
        name: 'Cindy',
        sex: 'female',
        age: 19,
        height: 158
    }, {
        id: 4,
        name: 'David',
        sex: 'male',
        age: 22,
        height: 175
    }, {
        id: 5,
        name: 'Edward',
        sex: 'male',
        age: 23,
        height: 178
    }
];
```

## JSONP（仅支持 GET 请求）

前端：使用 js 创建 script 标签，src 属性值为 api 地址

后端：接口返回用回调函数包裹数据的 js -> callback(json)

js

```
jsonp('http://192.168.1.127:9090/test/test.json', 'showData', { userName: 'John' });

function jsonp (url, callback, data) {
    var s = document.createElement('script');

    s.src = url + '?cb=' + callback;
    if (data && typeof data === 'object') {
        for (var key in data) {
            s.src += '&' + key + '=' + data[key];
        }
    }

    document.getElementsByTagName('head')[0].appendChild(s);
}

function showData (data) {
    console.log(data);
}
```

jquery

```
$.ajax({
    url: 'http://192.168.1.127:9090/test/test.json', // http://192.168.1.127:9090/test/test.json?cb=showData&userName=John
    type: 'GET',
    data: {
        userName: 'John'
    },
    dataType: 'jsonp',
    jsonp: 'cb', // 记录回调函数名的变量名 默认为callback
    jsonpCallback: 'showData' // 回调函数名 使用success回调则可不写 jquery会随机生成函数名对应success回调
});

function showData (data) {
    console.log(data);
}
```

```
$.getJSON('http://192.168.1.127:9090/test/test.json?cb=?', { userName: 'John' }, function (data) {
    console.log(data);
});
```

## CORS

请求头与响应头

后端：服务端设置 Access-Control-Allow-Origin: \* | domain，带 cookie：Access-Control-Allow-Credentials: true

前端带 cookie：xhr.withCredentials = true 读取的为请求接口所在域的 cookie

- 如果需要当前页 cookie 的写入：1.nginx 反向代理设置 proxy_cookie_domain，2.nodejs 中间件代理中设置 cookieDomainRewrite 参数

## nginx 反向代理

原理：同源策略是浏览器的安全策略，不是 HTTP 协议的一部分。服务器端调用 HTTP 接口只是使用 HTTP 协议，不会执行 JS 脚本，不需要同源策略，也就不存在跨越问题

通过 nginx 配置一个代理服务器 proxy，反向代理访问 server 接口，并且可以顺便修改 cookie 中 domain 信息，方便当前域 cookie 写入，实现跨域登录

```
server {
    listen       9093;
    server_name  http://192.168.1.127;

    # /api/ 匹配 /api/xxx    对应 ^/api/(.*)$
    # /api  匹配 /apixxx/xxx 对应 ^/api[^/]*/(.*)$
    location ^~ /api/ {
        proxy_pass http://192.168.1.127:9091;
        # proxy_cookie_domain www.domain2.com www.domain1.com;
        rewrite ^/api/(.*)$ /$1 break;

        add_header Access-Control-Allow-Origin http://192.168.1.127:9090;
        add_header Access_Control-Allow-Credentials true;
    }
}
```

## nodejs 中间件

```
var express = require('express');
var proxy = require('http-proxy-middleware');
var app = express();

app.use('/api/', proxy({
    target: 'http://192.168.1.127:9091',
    pathRewrite: {
        '/api/' : '/'
    },
    changeOrigin: true,
    onProxyRes: function (proxyRes, request, response) {
        response.header('Access-Control-Allow-Origin', 'http://192.168.1.127:9090');
        response.header('Access-Control-Allow-Credentials', 'true');
    },

    cookieDomainRewrite: 'www.domain1.com'; // 可以为false，表示不修改
}));

var server = app.listen(9092, function (request, response) {
    console.log('Proxy server is running at http://192.168.1.127:9092');
});
```
