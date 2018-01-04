var express = require("express");
var mysql = require("mysql");
//实例化express
var app = express();
var connection = mysql.createConnection({
		host:"10.40.153.231",
		user:"jian",
		password:"123456",
		database:"shopinfo"
	});
connection.connect();
//对seller表的所有数据提取
app.get("/sellerinfo_admin",function(req,res){
	 res.append("Access-Control-Allow-Origin","*");
	 connection.query(`select * from seller`,function(error,results,fields){
				if (error) throw error;
				res.send(JSON.stringify(results));
		})
})
//对seller表进行查询操作
app.get("/sellerinfo_admin/find",function(req,res){
	 res.append("Access-Control-Allow-Origin","*");
	var sql="select * from seller where ";
		for(var i in req.query){
			if(i=="sellerId"  ||  i=="sellerStatus"){
				sql+=i+"="+req.query[i]+" and ";
			}else if(i=="sellerName"  ||  i=="sellerAddress"){
				sql+=i+" like '%"+req.query[i]+"%' and ";
			}else{
				sql+=i+"='"+req.query[i]+"' and ";
			}
		}
		var sql = sql.substr(0,sql.length-4);
			connection.query(sql,function(error,results,fields){
				if (error) throw error;
				res.send(JSON.stringify(results));
			})
})
//对seller表进行删除操作
app.get("/sellerinfo_admin/delete",function(req,res){
	 res.append("Access-Control-Allow-Origin","*");
	 var id = req.query.sellerId;
	 var sql = "delete from seller where sellerId="+id;
	 connection.query(sql,function(error,results,fields){
				if (error) throw error;
				res.send("success");
				
		})
})
/*//post请求体模块
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post("/post",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	//req.body是post传输的数据
	res.send(JSON.stringify(req.body));
})*/
app.listen(1701);
