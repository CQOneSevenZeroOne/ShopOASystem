//页面效果
layui.use(['form', 'layedit', 'laydate'], function(){
  var form = layui.form
  ,layer = layui.layer
  ,layedit = layui.layedit
  ,laydate = layui.laydate;
  
  //日期
  laydate.render({
    elem: '#date'
  });
  laydate.render({
    elem: '#date1'
  });
  
  //监听提交
  /*form.on('submit(demo1)', function(data){
    layer.alert(JSON.stringify(data.field),{
      title: '最终的提交信息'
    })
    return false;
  });*/
});

//功能
var obj={'id':1,'type':"seller"};
$.cookie("statuscookie",JSON.stringify(obj));
//console.log(JSON.parse($.cookie("statuscookie")).id);
//无条件显示所有信息
$.ajax({
    url:"http://localhost:1701/orderlist",
    type:"GET",
    data:{
      "cookId":JSON.parse($.cookie("statuscookie")).id
    },
    success:function(data){
        data=JSON.parse(data);
        showOrder(data);

    }
})
  //条件查询
  if($("#orderidtext").val()=='' && $("#usernametext").val()=='' && $("#usernametext").val()=='' && $('#ordertimetext').html()=='' && $("#quiz1").val()=='' && $("#quiz2").val()){
      //无条件显示所有信息
      $.ajax({
          url:"http://localhost:1701/orderlist",
          type:"GET",
          data:{
            "cookId":JSON.parse($.cookie("statuscookie")).id
          },
          success:function(data){
              data=JSON.parse(data);
              showOrder(data);
          }
      })
  }else{
    $("#orderListbtn").click(function(){
      $.ajax({
        url:"http://localhost:1701/orderlist/search",
        type:"GET",
        data:{
          "cookId":JSON.parse($.cookie("statuscookie")).id,
          "orderidtext":$("#orderidtext").val(),
          "usernametext":$("#usernametext").val(),
          "ordertimetext":$('#date1').val(),
          "quiz1":$("#quiz1").val()//,
          //"quiz2":$("#quiz2").val()
        },
        success:function(data){
          if(JSON.parse(data).length==0){
            layui.use(['layer'], function(){
              layer.msg("未找到相关信息");
            })
          }else{
            data=JSON.parse(data);
            var str='';
            showOrder(data);
          }
        }
      })
  })
}
//页面显示数据函数
function showOrder(data){
  var str='';
  var address1='';
  var addressorder=[];
  //var address2='';
  //var address3='';
  for(var i=0;i<data.length;i++){
    if(data[i].orderStatus==0){
      data[i].orderStatus="已完成"
    }
    if(data[i].orderStatus==1){
      data[i].orderStatus="待处理";
    }
    addressorder.push('<option value="'+data[i].reciveAddress.slice(0, 2)+'" >'+data[i].reciveAddress.slice(0, 2)+'</option>');
    //address2+='<option value="'+data[i].reciveAddress.slice(3, 6)+'" >'+data[i].reciveAddress.slice(3, 6)+'</option>';
    //address3+='<option value="'+data[i].reciveAddress.slice(7)+'" >'+data[i].reciveAddress.slice(7)+'</option>';
    str+='<tr><td>'+data[i].orderId+'</td><td>'+data[i].userName+'</td><td>'+data[i].goodId+'</td><td>'+data[i].goodName+'</td><td>'+data[i].goodSize+'</td><td>'+data[i].goodColor+'</td><td>'+data[i].goodCount+'</td><td>'+data[i].orderStatus+'</td><td>'+data[i].orderTime+'</td><td>'+data[i].reciveAddress+'</td><td class="recevicebtn">接单</td></tr>';
  }
  $(".layui-table>tbody").html(str);
  addressorder=norepeatorder(addressorder);
  for(var j=0;j<addressorder.length;j++){
    address1+=addressorder[j];
  }
  $("#quiz1").html($("#quiz1").html()+address1);
  /*$("#quiz2").html($("#quiz2").html()+address2);
  $("#quiz3").html($("#quiz3").html()+address3);*/

  //接单事件
  for(var k=0;k<$(".recevicebtn").length;k++){
    $(this).click(function(){
      var orderIdedit=$(this).parent().children().eq(0).html();
      console.log(orderIdedit)
    });
  }
}

function norepeatorder(arr){
  var newArr = [];
  for(var i in arr){
    if(!has(newArr,arr[i])){
      newArr.push(arr[i])
    }
  }
  return newArr;
}
//判断某个值是否在数组中
function has(arr,n){
  for(var i in arr){
    if(arr[i]==n){
      return true;
    }
  }
  return false;
}
