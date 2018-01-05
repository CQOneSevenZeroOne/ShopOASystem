var express =require("express");
var mysql = require("mysql");
var url = require("url");
var querystring  = require("querystring");
//实例化
var app = express();
var connection = mysql.createConnection({
	host:"10.40.153.231",
	user:"liusong",
	password:"123456",
	database:"shopinfo"
})
connection.connect();
//处理post请求的请求体模块
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

//获取所有的商品信息
app.get('/', function(req, res) {
    res.append("Access-Control-Allow-Origin","*");
   var query = url.parse(req.url).query;
	var obj = querystring.parse(query);
	connection.query(`select * from good where sellerId = 1`,function(error,result){
		if(error) throw error;
		
		var str = restr(result);
		res.send(str);
	})
});

//根据名字查找对应的商品
app.post('/search', function(req, res) {
    res.append("Access-Control-Allow-Origin","*");
	/*console.log(req.body);*/
	connection.query(`select * from good where goodName like '%${req.body.name}%' and sellerId=1`,function(error,result){
		if(error) throw error;
		if(result.length==0){
			res.send("未查询到");
		}else{
			var str = restr(result);
			res.send(str);
		}
	});
});

//根据id查找对应商品
app.post('/searchId', function(req, res) {
    res.append("Access-Control-Allow-Origin","*");
	/*console.log(req.body);*/
	connection.query(`select * from good where goodId = ${req.body.name} and sellerId=1 `,function(error,result){
		if(error) throw error;
		if(result.length==0){
			res.send("未查询到");
		}else{
			var str = "";
			for (var i in result){
						str+=`
								<tr>
							  		<td>${result[i].goodId}</td>
							  		<td>${result[i].goodName}</td>
							  		<td>${result[i].goodType}</td>
							  		<td>${result[i].goodStatus}</td>
							  		<td>${result[i].pubDate}</td>
							  		<td>${result[i].goodPrice}</td>
							  		<td>${result[i].stock}</td>
							  		<td>${result[i].saleNum}</td>
							  		<td>${result[i].goodinfo}</td>
							  		<td><img src=${result[i].goodImg}></td>
							  		<td>${result[i].goodSize}</td>
							  		<td>${result[i].goodColor}</td>
							  		<td>${result[i].goodFare}</td>
							  		<td>${result[i].sellerId}</td>
							  		<td id="update">更改</td>
							  	</tr>
					`
					}
			res.send(str);
		}
	});
});
//下架商品
app.post("/down",function(req,res){
	 res.append("Access-Control-Allow-Origin","*");
	 connection.query(`update good set goodStatus = '0' where goodId='${req.body.id}'`,function(error,result){
	 	if(error) throw error;
	 	res.send('0');
	 })
})

//更改信息
app.post("/update",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	if(req.body.status!=0&&req.body.status!=1){
		req.body.status=1;
	}
	connection.query(`update good set goodName = '${req.body.name}',goodType='${req.body.type}',goodStatus='${req.body.status}',goodPrice='${req.body.price}',stock='${req.body.stock}',saleNum='${req.body.salenum}',goodInfo='${req.body.message}',goodSize='${req.body.size}',goodColor='${req.body.color}',goodFare='${req.body.fare}' where goodId='${req.body.id}' and sellerId='${req.body.seller}'`);
	res.send("success");
})
app.listen(1701);
console.log("开启服务器");

function restr(result){
	var str = "";
	for (var i in result){
				str+=`
						<tr>
					  		<td>${result[i].goodId}</td>
					  		<td>${result[i].goodName}</td>
					  		<td>${result[i].goodType}</td>
					  		<td>${result[i].goodStatus}</td>
					  		<td>${result[i].pubDate}</td>
					  		<td>${result[i].goodPrice}</td>
					  		<td>${result[i].stock}</td>
					  		<td>${result[i].saleNum}</td>
					  		<td>${result[i].goodinfo}</td>
					  		<td><img src=${result[i].goodImg}></td>
					  		<td>${result[i].goodSize}</td>
					  		<td>${result[i].goodColor}</td>
					  		<td>${result[i].goodFare}</td>
					  		<td>${result[i].sellerId}</td>
					  		<td id="down">下架</td>
					  	</tr>
			`
			}
	return str;
}