<template>
    <div class="login">
        <div class="login_box">
            <div class="img_box">
                <img src="./../assets/logo.png" alt="">
            </div>
            <div class="form_box">
                <el-form ref="form" :model="form"  :rules="rules">
                    <el-form-item prop="name">
                        <el-input v-model="form.name"  prefix-icon="el-icon-user-solid"></el-input>
                    </el-form-item>
                     <el-form-item prop="pass">
                        <el-input v-model="form.pass" show-password prefix-icon="el-icon-lock"></el-input>
                    </el-form-item>
                    <el-form-item class="btn">
                        <el-button type="primary" @click="onSubmit">登录</el-button>
                        <el-button type="info"  @click="resetForm('form')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:"Login",
        data(){
            return {
                form:{
                    name:"admin",
                    pass:'123456'
                },
                rules: {
                    name: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    pass: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
                    ]
                  }
            }
        },
         methods: {
            onSubmit() {
                this.$axios.post("login",{
                        username:this.form.name,
                        password:this.form.pass
                })
                .then(data=>{                   
                    var data1=data.data; 
                    console.log("请求到的数据",data1)
                    if(data1.meta.status=="200"){
                        this.$message.success(data1.meta.msg);
                        sessionStorage.setItem("iflogin",data1.data.token)
                        //路由跳转
                        this.$router.push('/home')
                    }else{
                        this.$message.error(data1.meta.msg);
                    }
                })
            },
            resetForm(formName){
               console.log(this.$refs[formName])
                 this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style lang="less" scoped>
   .login{
       position: absolute;
       left:0;
       top:0;
       bottom:0;
       right:0;
       background:#2b4b6b;
   }
   .login_box{
       width:450px;
       height: 304px;
       background:#fff;
       border-radius: 4px;
       position: absolute;
       left:50%;
       top:50%;
       transform: translate(-50%,-50%);
       
       .img_box{
           width: 130px;
           height:130px;
           background:#fff;
           border-radius: 50%; 
           padding:8px;
           border:1px solid #eee;
           position:absolute;
           left:50%;
           transform: translate(-50%,-50%);
           img{
               width:100%;
               height:100%;
               background:#eee;
               border-radius: 50%; 
           }
       }
   }
   .form_box{
       position: absolute;
       top:102px;
       padding: 0px 20px;
       width:410px;
       .btn{
           float:right
       }
   }
</style>