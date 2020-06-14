<template>
  <el-container>
  <el-header>
    <Header></Header>
  </el-header>
  <el-container>
    <el-aside :width="widthkey.zhi">
      <Aside :widtth="widthkey"/>
    </el-aside>
    <el-main>
      <Main/>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import Header from '@/components/Header'
import Aside from '@/components/Aside'
import Main from '@/components/Main'
import './../mockjs/list'
  export default {
    name:"Home",
    data(){
      return {
        widthkey:{
          zhi:"200px"
        }
      }
    },
    components:{
      Header,
      Aside,
      Main
    }
  }
</script>

<style lang="less" scoped>
  .el-header {
    background-color: #373d41;
    color: #333;
    line-height: 60px;
    padding:0px 20px 0px 0px;
  }
  
  .el-aside {
    background-color: #373d41;
    // background-color: #ff0;
    color: #333;
    line-height: 200px;
    height:calc(565px);
    
  }
  .el-main {
    background-color: #eaedf1;
    color: #333;
  }
  
</style>