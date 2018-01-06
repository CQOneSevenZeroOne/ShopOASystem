var express = require("express");
var mysql = require("mysql");
var bodyParser = require('body-parser');
var querystring = require("querystring");
var connection = mysql.createConnection({
    host: '10.40.153.231',
    user: 'huchong',
    password: '123456',
    database: 'shopinfo'
});
connection.connect();
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/reg/checkuser', function(req, res) {
    console.log("QWER")
    res.append("Access-Control-Allow-Origin","*");
    // console.log(req.query)
    var str12 = `SELECT * FROM seller where sellerName = '${req.query.name}'`;
    connection.query(str12, function (error, results, fields) {

        console.log(str12)
            if (error) throw error;
                //返回一个数据
                // console.log(results)
            if(results==''){
                //表示没有找到
                res.send("1")
            }else{
            	res.send("0")
            }
            
        });
});
//向数据库里面添加数据
app.post('/reg/adduser/', function(req, res) {
    res.append("Access-Control-Allow-Origin","*");
    // console.log(req.body.name)
    // connection.query(`INSERT INTO stuendt4(name, password,time,introduce,place,tel) VALUES ('${req.body.name}','${req.body.password}','${req.body.time}','${req.body.introduce}','${req.body.place}','${req.body.tel}',)`, function (error, results, fields) {
        var str11 = `INSERT INTO seller (sellerName, sellerPass,regTime,sellerInfo,sellerAddress,sellerPhone,sellerStatus,sellerImg) VALUES ('${req.body.name}',${req.body.password},'${req.body.time}','${req.body.introduce}','${req.body.place}',${req.body.tel},0,'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1018364764,1223529536&fm=27&gp=0.jpg')`;
        // var str11 =`INSERT INTO student4 (name, id) VALUES ('${req.body.name}',${req.body.password})`

        connection.query(str11, function (error, results, fields) {
            console.log(str11)
        	if (error) throw error;
        		console.log(results)
        		res.send('1');
            });
    
});
app.listen(1701)
console.log('开启服务器成功')
