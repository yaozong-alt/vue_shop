import Mock from 'mockjs'
Mock.mock("list.php","get",function(){
    return Mock.mock({
        "data":[
            {
                id:"101",
                authName:"用户管理",
                iclass:"el-icon-user-solid",
                urlPath:"1",
                children:[{
                    id:"1011",
                    authName:"用户列表",
                    urlPath:"/home/userlist",
                    children:[]
                }]
            },
            {
                id:"201",
                authName:"权限管理",
                urlPath:"2",
                iclass:"el-icon-s-management",
                children:[{
                    id:"2011",
                    authName:"角色列表",
                    urlPath:"/home/jueselist",
                    children:[]
                },{
                    id:"2012",
                    authName:"权限列表",
                    urlPath:"/home/quanxianlist",
                    children:[]
                }]
            },
            {
                id:"301",
                authName:"商品管理",
                urlPath:"3",
                iclass:"el-icon-s-goods",
                children:[
                    {
                        id:"3011",
                        authName:"商品列表",
                        urlPath:"/home/shoplist",
                        children:[]
                    },
                    {
                        id:"3012",
                        authName:"分类参数",
                        urlPath:"/home/fenlei",
                        children:[]
                    },
                    {
                        id:"3013",
                        authName:"商品分类",
                        urlPath:"/home/shangpinfenlei",
                        children:[]
                    }
                ]
            },
            {
                id:"401",
                authName:"订单管理",
                urlPath:"4",
                iclass:"el-icon-s-order",
                children:[{
                    id:"4011",
                    authName:"订单列表",
                    urlPath:"/home/dingdanlist",
                    children:[]
                }]
            },
            {
                id:"501",
                urlPath:"5",
                authName:"数据统计",
                iclass:"el-icon-s-platform",
                children:[{
                    id:"5011",
                    authName:"数据报表",
                    urlPath:"/home/shujv",
                    children:[]
                }]
            },
        ]
    })
})