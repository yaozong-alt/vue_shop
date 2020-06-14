<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
         <el-card shadow="never" class="card">
             <el-row :gutter="20">
                <el-col :span="8">
                    <el-input placeholder="请输入内容" clearable v-model="queryInfo.query" @change="haddlefun" @clear="clearhaddle">
                        <el-button slot="append" icon="el-icon-search" @click="haddleClick"></el-button>
                    </el-input>
                </el-col>
                <!-- 添加用户 -->
                <el-col :span="8">
                    <el-button type="primary" @click="addFormVisible = true">添加用户</el-button>
                    <el-dialog title="添加用户" :visible.sync="addFormVisible" @close="closeDialog">
                    <el-form :model="addForm" :rules="addFormrules" ref="dialogForm">
                            <el-form-item label="用户名" :label-width="addformLabelWidth" prop="username">
                                <el-input v-model="addForm.username" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" :label-width="addformLabelWidth" prop="userpass">
                                <el-input v-model="addForm.password" autocomplete="off"></el-input>
                            </el-form-item> 
                            <el-form-item label="邮箱" :label-width="addformLabelWidth" prop="email">
                                <el-input v-model="addForm.email" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="手机" :label-width="addformLabelWidth" prop="mobel">
                                <el-input v-model="addForm.mobile" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="addFormVisible = false">取 消</el-button>
                            <el-button type="primary" @click="addUserTrue">确 定</el-button>
                        </div>
                    </el-dialog>

                </el-col>
            </el-row>
            <!-- 表格 -->
            <el-table
            :data="tableData"
            border
            style="width: 100%"
            class="table">
                <el-table-column type="index" width="50" label="#"></el-table-column>
                <el-table-column prop="username" label="姓名" width="180"></el-table-column>
                <el-table-column prop="email" label="邮箱"></el-table-column>
                <el-table-column prop="mobile" label="手机号"></el-table-column>
                <el-table-column prop="role_name" label="角色"></el-table-column>
                <el-table-column prop="status" label="状态">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.status"></el-switch>
                    </template>
                </el-table-column>
                 <el-table-column
                    label="操作"
                    width="200px">
                    <!-- 通过作用域插槽渲染列 -->
                    <template slot-scope="scope">
                        <!-- 编辑按钮 -->
                        <el-button  icon="el-icon-edit"
                         type="primary"  size="small"
                        @click="editForm(scope)"
                        ></el-button>
                        <!-- 编辑对话框 -->
                        <el-dialog title="收货地址" :visible.sync="editFormVisible" @close="editFormClose">
                            <el-form :model="editform" :rules="addFormrules" ref="editformref" >
                                <el-form-item label="姓名" :label-width="formLabelWidth">
                                    <el-input v-model="editform.username" disabled></el-input>
                                </el-form-item>
                                <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
                                    <el-input v-model="editform.email" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="手机号" :label-width="formLabelWidth" prop="mobile">
                                    <el-input v-model="editform.mobile" autocomplete="off"></el-input>
                                </el-form-item>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="editFormVisible = false">取 消</el-button>
                                <el-button type="primary" @click="editFormTrue">确 定</el-button>
                            </div>
                            </el-dialog>
                            <!-- 删除按钮 -->
                         <el-button
                            @click.native.prevent="deleteRow(scope.row.id)"
                            type="danger"
                            icon="el-icon-delete"
                            size="small">
                        </el-button>
                        <el-button @click="handleClick(scope)"  size="small" type="warning" icon="el-icon-s-tools"></el-button>
                    </template>
                </el-table-column>
            </el-table>
             <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="queryInfo.pagenum"
                :page-sizes="[2, 5, 10, 15]"
                :page-size="queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalpage">
                </el-pagination>
        </el-card>
    </div>
</template>

<script>
    export default {
        name:"Userlist",
        data(){
            //验证邮箱
             var validateEmail = (rule, value, callback) => {
               const regEmail=/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
               if(regEmail.test(value))
               return callback()
               callback("请输入合法的邮箱")
            };
            //验证手机号
             var validateMobel = (rule, value, callback) => {
               const regEmail=/^[1][3,4,5,7,8][0-9]{9}$/
               if(regEmail.test(value))
               return callback()
               callback("请输入合法的手机号")
            };
            return {
                //获取用户列表的参数对象
                queryInfo:{
                    query:'',
                    pagenum:1,
                    pagesize:2
                },
                tableData:[],
                totalpage:0,
                //编辑用户
                editform: {
                    username: '',
                    email: '',
                    mobile: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: '',
                    id:0
                },
                //添加用户绑定的表单
                addForm:{
                    username:'',
                    password:"",
                    email:"",
                    mobile:""
                },
                addformLabelWidth: '120px',
                formLabelWidth: '120px',
                addFormVisible: false,
                editFormVisible: false,
                //添加用户表单校验规则
                addFormrules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    email: [
                        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                     { validator: validateEmail, trigger: 'blur' }
                    ],
                    mobile: [
                        { required: true, message: '请输入手机号码', trigger: 'blur' },
                        { validator: validateMobel, trigger: 'blur' }
                    ],
                }
                //编辑用户校验规则
            }
        },
        methods:{
           haddlefun(){
               console.log("aha");
           },
            handleClick(row) {
                console.log(row);
            },
            deleteRow(id) {
                this.$messageBox('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(async () => {
                    console.log("用户id",id);
                    const {data}=await this.$axios.delete("users/"+id)
                    console.log("asdk",data)
                    if(data.meta.status===200){
                        this.getuserlist()
                         this.$message({
                            type: 'success',
                            message: data.meta.msg
                        });
                    }else{
                           this.$message({
                            type: 'error',
                            message: data.meta.msg
                        });
                    }          
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
            //点击编辑按钮，填充表格数据
            editForm(scope){
                this.editFormVisible = true;
                console.log("scope",scope);
                this.editform.username=scope.row.username;
                this.editform.email=scope.row.email;
                this.editform.mobile=scope.row.mobile;
                this.editform.id=scope.row.id;
                
            },
            //编辑用户的按钮重置
            editFormClose(){
                this.$refs.editformref.resetFields()
            },
            //点击编辑的确定按钮
            editFormTrue(){
                this.$refs.editformref.validate(async key=>{
                    if(!key) return ;
                    console.log(this.editForm.id);
                    const {data}=await this.$axios.put("users/"+this.editform.id,{
                        email:this.editform.email,
                        mobile:this.editform.mobile
                    });
                    console.log("修改用户的请求",data)
                    if(data.meta.status===200){
                        this.$message.success(data.meta.msg);
                        this.editFormVisible =false;
                         this.getuserlist()
                    }else{
                         this.$message.error(data.meta.msg);
                    }
                })
                
            },
            haddleClick(){
                this.getuserlist()
            },
            clearhaddle(){
                this.getuserlist()
            },
           async getuserlist(){
                const {data}=await this.$axios.get("users",{
                    params:this.queryInfo
                });
                console.log("userlist",data);
                this.tableData=data.data.users;
                this.totalpage=data.data.total;
                console.log("tableData",this.tableData);
           },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.queryInfo.pagesize=val;
               
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
             
                this.queryInfo.pagenum=val;
                this.getuserlist();
            },
            //添加用户表格的重置
            closeDialog(){
                this.$refs.dialogForm.resetFields();
            },
            //添加新用户，点击确定按钮
            addUserTrue(){
                this.$refs.dialogForm.validate( async (key)=>{
                   if(!key) return ;
                   const {data}=await this.$axios.post("users",this.addForm)
                   console.log("添加用户",data)
                   if(data.meta.status===201){
                       console.log("ahdhd")
                       this.$message.success(data.meta.msg);
                       this.addFormVisible=false;
                       this.getuserlist()
                   }
                })
            }
            //编辑用户
        },
         mounted(){
           this.getuserlist();
           
        },
    }
</script>

<style lang="less" scoped>
    .card{
        margin-top:10px;
        .table{
            margin-top:10px
        }
        max-height: 460px;
        overflow: auto;
    }
    
</style>