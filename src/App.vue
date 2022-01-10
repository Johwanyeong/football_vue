<template>
  <div id="nav">
    <router-link to="/">home</router-link>|
    <router-link to="/Join">Join</router-link>|
    <router-link to="/Login">Login</router-link>|
    <router-link to="/Logout">Logout</router-link>|
    <hr />
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
      if(token != null) {
        this.logged =true;
      }
      else{
        this.logged = false;
      }
    },

  }
}
</script>

<style>
</style>
