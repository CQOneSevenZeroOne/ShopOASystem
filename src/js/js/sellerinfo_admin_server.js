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
//对user表的所有数据提取
app.get("/userinfo_admin",function(req,res){
	 res.append("Access-Control-Allow-Origin","*");
	 connection.query(`select * from userinfo`,function(error,results,fields){
				if (error) throw error;
				res.send(JSON.stringify(results));
		})
})
//对user表的所有数据提取
app.get("/goodinfo_admin",function(req,res){
	 res.append("Access-Control-Allow-Origin","*");
	 connection.query(`select * from good`,function(error,results,fields){
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
		sql = sql.substr(0,sql.length-4);
			connection.query(sql,function(error,results,fields){
				if (error) throw error;
				res.send(JSON.stringify(results));
			})
})
//对userinfo表进行查询操作
app.get("/userinfo_admin/find",function(req,res){
	 res.append("Access-Control-Allow-Origin","*");
	var sql="select * from userinfo where ";
		for(var i in req.query){
			if(i=="userId"  ||  i=="sex"){
				sql+=i+"="+req.query[i]+" and ";
			}else if(i=="userName"  ||  i=="userAddress"){
				sql+=i+" like '%"+req.query[i]+"%' and ";
			}else{
				sql+=i+"='"+req.query[i]+"' and ";
			}
		}
		sql = sql.substr(0,sql.length-4);
			connection.query(sql,function(error,results,fields){
				if (error) throw error;
				res.send(JSON.stringify(results));
			})
})
//对userinfo表进行查询操作
app.get("/goodinfo_admin/find",function(req,res){
	 res.append("Access-Control-Allow-Origin","*");
	var sql="select * from good where ";
		for(var i in req.query){
			if(i=="goodId"  ||  i=="goodSatus" || i=="stock" || i=="saleNum" || i=="sellerId"){
				sql+=i+"="+req.query[i]+" and ";
			}else if(i=="goodName"){
				sql+=i+" like '%"+req.query[i]+"%' and ";
			}else{
				sql+=i+"='"+req.query[i]+"' and ";
			}
		}
		sql = sql.substr(0,sql.length-4);
			connection.query(sql,function(error,results,fields){
				if (error) throw error;
				res.send(JSON.stringify(results));
			})
})
//对seller表进行状态修改操作
app.get("/sellerinfo_admin/delete",function(req,res){
	 res.append("Access-Control-Allow-Origin","*");
	 var id = req.query.sellerId;
	 var sql = "update seller set sellerStatus=2 where sellerId="+id;
	 connection.query(sql,function(error,results,fields){
				if (error) throw error;
				res.send("success");
				
		})
})
//对seller表进行审核操作的同意
app.get("/sellerinfo_admin/exam/agree",function(req,res){
	 res.append("Access-Control-Allow-Origin","*");
	 var id = req.query.sellerId;
	 var sql = "update seller set sellerStatus=1 where sellerId="+id;
	 connection.query(sql,function(error,results,fields){
				if (error) throw error;
				res.send("success");
				
		})
})
//对seller表进行审核操作的拒绝
app.get("/sellerinfo_admin/exam/regect",function(req,res){
	 res.append("Access-Control-Allow-Origin","*");
	 var id = req.query.sellerId;
	 var sql = "delete from seller where sellerId="+id;
	 connection.query(sql,function(error,results,fields){
				if (error) throw error;
				res.send("success");
				
		})
})
//post请求体模块
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//管理员的登录
app.post("/reg_admin",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	//req.body是post传输的数据
	var sql="select adminName from admininfo where "
	for(var i in req.body){
		sql+=i+"='"+req.body[i] +"'and ";
	}
	sql = sql.substr(0,sql.length-4);
	 connection.query(sql,function(error,results,fields){
				if (error) throw error;
				res.send(JSON.stringify(results));
				
		})
})

//电商的登录
app.post("/reg_seller",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	//req.body是post传输的数据
	var sql="select sellerId,sellerName from seller where "
	for(var i in req.body){
		sql+=i+"='"+req.body[i] +"'and ";
	}
	sql = sql.substr(0,sql.length-4);
	 connection.query(sql,function(error,results,fields){
				if (error) throw error;
				res.send(JSON.stringify(results));
				
		})
})
app.listen(1701);
