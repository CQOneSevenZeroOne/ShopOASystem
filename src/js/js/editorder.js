//功能
//数据库操作
var express = require("express");
var mysql = require("mysql");
var bodyParser = require('body-parser')
var app = express();
var mysql = require("mysql");
var connection = mysql.createConnection({
    host: '10.40.153.231',//10.40.153.231  localhost
    user: 'wy',
    password: '123456',
    database: 'shopinfo'
});
connection.connect();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/orderlist', function(req, res) {
    res.append("Access-Control-Allow-Origin","*");
    var cookId=req.query.cookId;
    //console.log(cookId)
    var sql="SELECT a.* ,b.*,c.* ,d.sellerId from orderinfo AS a,good AS b,userinfo as c,seller AS d  WHERE a.goodId=b.goodId AND a.userId=c.userId AND d.sellerId="+cookId;
    //console.log(sql)
    connection.query(sql, function (error, results, fields) {
        if (error) throw error;
        var data=JSON.stringify(results);
        //console.log(data)
        res.send(data)
    });
});
app.get('/orderlist/searchOrder', function(req, res) {
    res.append("Access-Control-Allow-Origin","*");
    var sql="SELECT a.* ,b.*,c.* ,d.sellerId from orderinfo AS a,good AS b,userinfo as c,seller AS d  WHERE a.goodId=b.goodId AND a.userId=c.userId AND ";
    for(var i in req.query){
        if(i=="cookId" && req.query[i]){
            sql+="d.sellerId="+req.query.cookId+" AND ";
        }
        if(i=="orderidtext" && req.query[i]){
            sql+="a.orderId="+req.query.orderidtext+" AND ";
        }
        if(i=="usernametext" && req.query[i]){
            sql+="c.userName like '%"+req.query.usernametext+"%' AND "
        }
        if(i=="ordertimetext" && req.query[i]){
            sql+="a.orderTime='"+req.query.ordertimetext+"' AND "
        }
        if(i=="quiz1" && req.query[i]){
            sql+="a.reciveAddress like '%"+req.query.quiz1+"%' AND ";
        }
    }
    sql=sql.slice(0,sql.length-5);
    connection.query(sql, function (error, results, fields) {
        if (error) throw error;
        var data=JSON.stringify(results);
        //console.log(data)
        res.send(data)
    });
});
app.get('/orderlist/editOrder', function(req, res) {
    res.append("Access-Control-Allow-Origin","*");
    var orderIdedit=req.query.orderIdedit;
    //console.log(cookId)
    var sql="UPDATE orderinfo SET orderStatus=0 WHERE orderinfo.orderId ="+orderIdedit;
    connection.query(sql, function (error, results, fields) {
        if (error) throw error;
        res.send("success")
    });
});
app.listen(1701)
console.log('开启服务器')
