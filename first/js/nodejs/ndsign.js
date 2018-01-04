var http = require("http");
var url = require("url");
var querystring = require("querystring");
var mysql = require("mysql");
var connection = mysql.createConnection({
    host: '10.40.153.133',
    user: 'huchong',
    password: '12345678',
    database: 'cq1701'
});
connection.connect();
http.createServer(function(req,res){
    res.setHeader("Access-Control-Allow-Origin","*")
    var post = '';
    req.on('data', function (chunk) {
        post += chunk;
    });
    req.on('end', function () {
        //当数据加载成功时开始向数据库中请求数据
        param = querystring.parse(post);
        connection.query(`SELECT * FROM student4 where name = '${param.user}'`, function (error, results, fields) {
            if (error) throw error;
                //返回一个数据
            if(results==''){
                //表示没有找到
                res.end("2")
            }else{
                if(results[0].name==param.user&&results[0].id==param.password){
                    // 表示成功登陆
                    res.end("1")
                }else{
                    // 表示密码错误
                    res.end("0")
                }
            }
            
        });    
    });
   
}).listen(6789);
console.log("开启服务器")