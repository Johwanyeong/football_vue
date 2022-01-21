<template>
  <div id="nav">
    <router-link to="/">home</router-link>|
    <router-link v-if="!logged" to="/Join">Join</router-link>|
    <router-link v-if="!logged" to="/Login">Login</router-link>|
    <router-link v-if="logged" to="/Logout">Logout</router-link>|
    <router-link v-if="adminLogged" to="/Registration">Registration</router-link>|
    <router-link to="/PlayerList">PlayerList</router-link>|

    <hr />
    <el-menu
    :default-active="activeIndex" class="el-menu-demo" mode="horizontal" 
    @select="handleSelect">
    <el-menu-item v-if="logged" index="1">Processing Center</el-menu-item>
    </el-menu>
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    this.changeLogged();
  },
  methods: {
    changeLogged() {
      const token  = sessionStorage.getItem("TOKEN");
      const role = sessionStorage.getItem("ROLE");
      if(token != null) { // 로그인 되었을 경우
        this.logged =true;
        if(role === "ADMIN"){ // 로그인 후 role이 admin일 경우
          this.adminLogged = true;
        }
        else{ //로그인 후 role이 admin이 아닐 경우
          this.adminLogged = false;
        }
      }
      else{ // 로그인 되지 않았을 경우
        this.logged = false;
      }
    },

  }
}
</script>

<style>
</style>
