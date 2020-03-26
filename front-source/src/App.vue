<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
// import "../static/js/config.js";
console.log('%c front vision 1.0.0','color:#f00')
export default {
  name: 'App',
  data : function(){
      return {
      	// loading : true
      }
  }
}
</script>
<style>
    /* @import "../static/css/main.less"; */
    /*@import "../static/css/color-dark.css";    深色主题*/
    /* @import "../static/css/override-element-ui.less";  */
    /*@import "../static/css/theme-green/color-green.css";   浅绿色主题*/
</style>