import Mock from 'mockjs'
Mock.mock("userlist.php","get",function(){
    return Mock.mock({
        "data|9":[
            {
                "userId|+1":0,
                "userName|1":["admin1","admin2","tom","susan","jarry","funy","zong","qing"],
                "email|1":["111","dsjsf","sahdjkU","SAQ"],
                "phone":"11111111",
                "juese":"超级管理员",
                "status|1":[true,false]
            }
        ]
    })
})