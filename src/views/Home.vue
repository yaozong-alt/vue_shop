<template>
  <div>
    Home组件
    <span @click ="loginout">退出</span>
  </div>
</template>

<script>
  export default {
    name:"Home",
    methods:{
      loginout:function(){
        sessionStorage.clear();
        this.$router.push("/login")
      }
    }
  }
</script>

<style lang="less" scoped>

</style>