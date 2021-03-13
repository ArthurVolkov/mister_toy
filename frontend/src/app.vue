<template>
  <div id="app" class="main-layout">
    <user-msg />
    <app-nav />
    <router-view />
  </div>
</template>

 

<script>
import appNav from './cmps/app-nav'
import userMsg from './cmps/user-msg'

export default {
  name: "app-vue",
  created() {
    console.log("Vue App was created!!!");
    this.$store.dispatch({ type: "loadToys" });
  },
  components: {
    appNav,
    userMsg
  }
};
</script>
