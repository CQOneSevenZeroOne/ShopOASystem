$("#addls").click(function(){
	var t = $(".text");
	//调用判断是否为空的方法
	var tag = isNull(t);
	/*console.log(tag);*/
	if(tag){
		$.ajax({
			type:"POST",
			url:"http://localhost:1701/goodaddls",
			data:{
				name:t.eq(0).val(),
				type:t.eq(1).val(),
				price:t.eq(2).val(),
				stock:t.eq(3).val(),
				info:t.eq(4).val(),
				size:t.eq(5).val(),
				color:t.eq(6).val(),
				fare:t.eq(7).val(),
				seller:getCookie().id
			},
			success:function(data){
				alert(data);
			}
		})
	}
})

//判断是否有空值
function isNull(t){
	var flag = true;
	for (var i = 0;i<t.length;i++){
		if(t.eq(i).val()==""){
			flag = false;
		}
	}
	return flag;
}

function getCookie(){
	var str = $.cookie("seller");
	return JSON.parse(str);
}