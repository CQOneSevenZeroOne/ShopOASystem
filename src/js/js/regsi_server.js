var express = require("express");
var mysql = require("mysql");
var bodyParser = require('body-parser');
var querystring = require("querystring");
var connection = mysql.createConnection({
    host: '10.40.153.133',
    user: 'huchong',
    password: '12345678',
    database: 'cq1701'
});
connection.connect();
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/reg/checkuser', function(req, res) {
    res.append("Access-Control-Allow-Origin","*");
    // console.log(req.query)
    connection.query(`SELECT * FROM seller where name = '${req.query.name}'`, function (error, results, fields) {
            if (error) throw error;
                //返回一个数据
                // console.log(results)
            if(results==''){
                //表示没有找到
                res.send("0")
            }else{
            	res.send("1")
            }
            
        });
});
//向数据库里面添加数据
app.post('/reg/adduser/', function(req, res) {
    res.append("Access-Control-Allow-Origin","*");
    // console.log(req.body.name)
    connection.query(`INSERT INTO seller(name, password,time,introduce,place,tel) VALUES ('${req.body.name}','${req.body.password}','${req.body.time}','${req.body.introduce}','${req.body.place}','${req.body.tel}',)`, function (error, results, fields) {
    	if (error) throw error;
    		console.log(results)
    		res.send('1');
        });
    
});
app.listen(1701)
console.log('开启服务器成功')
