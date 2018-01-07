var express = require("express");
var mysql = require("mysql");
var bodyParser = require('body-parser');
var querystring = require("querystring");
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'huchong',
    password: '123456',
    database: 'shopinfo'
});
connection.connect();
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//获取自己的个人信息
app.get('/sellerinfoUpdata/getdata', function(req, res) {
    console.log("QWER")
    res.append("Access-Control-Allow-Origin","*");
    // console.log(req.query)
    // var str12 = `SELECT * FROM seller where sellerId = '${req.query.id}'`;
    connection.query(`SELECT * FROM seller where sellerId = '${req.query.id}'`, function (error, results, fields) {

        // console.log(str12)
            if (error) throw error;
                //返回一个数据
                console.log(results)
            if(results==''){
                //表示没有找到
                res.send("1")
            }else{
            	res.send(results)
            }
            
        });
});
//修改数据库里面的数据
app.post('/sellerinfoUpdata/senddata', function(req, res) {
    res.append("Access-Control-Allow-Origin","*");
    console.log(req.body)

       var str11 = `UPDATE seller SET sellerInfo = '${req.body.sellerInfo}',sellerAddress = '${req.body.sellerAddress}',sellerPhone=${req.body.sellerPhone},sellerPass= '${req.body.sellerPass}' WHERE sellerName = '${req.body.sellerName}'`
        console.log(str11)
        connection.query(str11, function (error, results, fields) {

        	if (error) throw error;

        		res.send('1');
            });
    
});
app.listen(1701)
console.log('开启服务器成功')
