<template>
 <el-col width="210px">
    <div @click="haddlecollapse" class="isCollapse">|||</div>
     <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#373d41"
      text-color="#fff"
      active-text-color="#42a1ff"
      unique-opened
      :collapse="isCollapse"
      :collapse-transition="false"
      :router="true">
      <el-submenu v-for="value in dataList" :index="'/'+value.path"  :key="value.id">
         <template slot="title">
            <i :class="value.iclass"></i>
            <span>{{value.authName}}</span>
        </template>
         <el-menu-item  v-for="value1 in value.children" :index="'/'+value.path" :key="value1.id"><i class="el-icon-menu"></i>{{value1.authName}}</el-menu-item>     
      </el-submenu>
     </el-menu>
 </el-col>
</template>

<script>
    export default {
        name:"Aside",
        props:["widtth"],
        data(){
            return {
                dataList:[],
                isCollapse: false,
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            haddlecollapse(){
                this.isCollapse=!this.isCollapse;
                console.log(this.widtth)
                this.widtth.zhi=this.isCollapse?"64px":"200px";
                console.log(this.widtth.zhi)
            } 
           
        },
        mounted:function(){
            this.$axios.get("menus")
            .then(data=>{
                console.log("请求到的左侧列表",data);
                this.dataList=data.data.data;
            })
        }
    }
</script>

<style lang="less" scoped>
     ul.el-menu{
      border-right:solid 0px #ff0;
    }
    .isCollapse{
        height:20px;
        background:#4a5064;
        line-height: 20px;
        text-align: center;
    }
</style>