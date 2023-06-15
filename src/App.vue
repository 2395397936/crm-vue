<template>

  <div id="app">

    <div class="c">
      <router-view  style="height: 100%;width: 100%;overflow: hidden"></router-view>
    </div>
  </div>
</template>

<script>
import Home from "@/pages/Home";

export default {
  name: 'App',
  components: {
    Home,
  },
  mounted() {
    // this.$router.push({path:'/home'})
  },


}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

html, body, #app {
  height: 100%;
  width: 100%;
  background-color: #f4f4f4;
}

#app {
  display: flex;
  height: 100%;
  width: 100%;
}

.c{
  flex: 1;
  overflow: hidden;
  height: 100%;
  width: 100%;
  min-width: 1316px;
  min-height: 700px;
}

</style>
