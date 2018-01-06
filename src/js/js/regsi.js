// var id_bs = false;
// var name_bs = false;
var name_bs = true;
//从输入框移出光标时，验证用户名是否重复
$("#shop_name").on("blur",function(){
	$.ajax({
		url:"http://localhost:1701/reg/checkuser",
		type:"get",
		data:{
			name:$("#shop_name").val()
		},
		success:function(data){
			console.log(data)
			if(data==0){
				name_bs = true;
			}else{
				$("#shop_name_span").css("display","block")
				setTimeout(function(){
					$("#shop_name_span").css("display","none")
				},2000)
			}
		}
	})
})
//从输入框移出光标时，验证id名是否重复
/*$("#shop_id").on("blur",function(){
	$.ajax({
		url:"http://localhost:1701/reg/checkuser",
		type:"get",
		data:{
			id:$("#shop_id").val()
		},
		success:function(data){
			if(data==1){
				id_bs = true;
			}else{
				$("#shop_id_span").css("display","block")
				setTimeout(function(){
					$("#shop_id_span").css("display","none")
				},2000)
			}
		}
	})
})*/
//点击登录按钮时，将用户信息添加到后台
$("#btn-reg").on("click",function(){
	console.log(1)
	if(/*id_bs&&*/name_bs){
		$.ajax({
			url:"http://localhost:1701/reg/adduser/",
			type:"post",
			data:{
				id:$("#shop_id").val(),
				name:$("#shop_name").val(),
				password:$("#shop_password").val(),
				time:$("#shop_time").val(),
				introduce:$("#shop_introduce").val(),
				place:$("#shop_place").val(),
				tel:$("#shop_tel").val()
			},
			success:function(data){
				// location.herf = url;
				$("mask").css("display","block")
			}
		})
	}else{
		alert("信息填写错误，请检查后再注册")
	}
	
})
//插件
