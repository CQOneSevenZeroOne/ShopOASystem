//页面最开始对ajax的请求
$.ajax({
			url:"http://localhost:1701/sellerinfo_admin",
			type:"GET",
			data:{
			},
           	success: function (data) {
                    var arr = JSON.parse(data);
					getList(arr);
                }
})
//对radius进行判断
var status=-1;
$("input[type='radio']").on("click",function(){
	$(this).prop("checked",true).siblings().prop("checked",false);
	status=$(this).val();
})
//提交查询信息
$(".butt").on("click",function(){
	var obj={};
	if($("#sellerName").val()!=""){
		obj.sellerName=$("#sellerName").val();
	}
	if($("#sellerId").val()!=""){
		obj.sellerId=$("#sellerId").val();
	}
	if($("#sellerPhone").val()!=""){
		obj.sellerPhone=$("#sellerPhone").val();
	}
	if($("#sellerAddress").val()!=""){
		obj.sellerAddress=$("#sellerAddress").val();
	}
		if(status!=-1){
		obj.sellerStatus=status;
	}
	$.ajax({
			url:"http://localhost:1701/sellerinfo_admin/find",
			type:"GET",
			data:{
				sellerId:obj.sellerId,
				sellerName:obj.sellerName,
				sellerPhone:obj.sellerPhone,
				sellerAddress:obj.sellerAddress,
				sellerStatus:obj.sellerStatus
			},
           	success: function (data) {
                 var arr = JSON.parse(data);
					getList(arr);
                }
	})
	$("input[type='text']").val("");
	$("input[type='radio']").eq(0).prop("checked",true).siblings().prop("checked",false);
	status=-1;
})
//对注销的点击事件
function clickdel(){
	$("td strong").on("click",function(){
	var id = $(this).parent().parent().children("td:eq(0)").html();
	$(this).parent().parent().remove();
	$.ajax({
			url:"http://localhost:1701/sellerinfo_admin/delete",
			type:"GET",
			data:{
				sellerId:id
			},
           	success: function (data) {
				console.log(data);
            }
	})
})
}

//将数据库中的信息插入到页面中
function getList(arr){
	if(arr.length==0){
		$("#table_list").html("<div>没有用户</div>");
	}else{
		var src="";
		for(var i in arr){
			var status="";
			if(arr[i].sellerStatus==0){
				status="审核中";
			}else if(arr[i].sellerStatus==1){
				status="已注册";
			}else{
				status="已注销";
			}
			src+='<tr><td data-id='+arr[i].sellerId+'>'+arr[i].sellerId+'</td><td><img src='+arr[i].sellerImg+'/></td><td>'+arr[i].sellerName+'</td><td>'+status+'</td><td>'+arr[i].regTime+'</td><td>'+arr[i].sellerAddress+'</td><td>'+arr[i].sellerPhone+'</td><td><strong>注销</strong></td></tr>';
		}
		$("#table_list").html(src);
	}
	clickdel();
}
