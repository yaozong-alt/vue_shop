import Mock from 'mockjs'
Mock.mock("login.php","post",(option)=>{
    var url=JSON.parse(option.body);
    var username=url["username"];
    var password=url["password"];
    if(username=="admin" && password=="123456"){
        return Mock.mock({
            status:"10001",
            info:"登录成功"
        })
    }else{
        return Mock.mock({
            status:"10002",
            info:"用户名或者密码错误"
        })
    }
  
})