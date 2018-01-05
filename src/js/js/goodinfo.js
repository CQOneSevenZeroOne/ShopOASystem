$.ajax({
	type:"GET",
	url:"http://localhost:1701/",
	success:function(data){
		$("tbody").html(data);
	}
})

$("#searchls").click(function(e){
	e.preventDefault();
	$.ajax({
		type:"POST",
		url:"http://localhost:1701/search",
		data:{
			name:$("#txt").val()
		},
		success:function(data){
			$("tbody").html(data);
		}
	})
})

$("tbody").on("click","#down",function(){
	var status = $(this).parent().children().eq(3).html();
	/*console.log(status);*/
	var _this = this;
	if(status==1){
		$.ajax({
			type:"POST",
			url:"http://localhost:1701/down",
			data:{
				id:$(this).parent().children().eq(0).html(),
			},
			success:function(data){
				$(_this).parent().children().eq(3).html(parseInt(data));
			}
	})
	}else{
		alert("此商品已下架");
	}
		
})
