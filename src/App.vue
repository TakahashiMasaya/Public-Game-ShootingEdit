<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="scss">
article, aside, dialog, figure, footer, header, hgroup, menu, nav, section, ul, li{
  display: block;
}
h1, h2, h3, p, ul, li{margin:0px;padding:0px;}
*,*::after,*::before,*:hover{
  box-sizing:border-box;
}
input:focus {
  outline: none;
}

html,body{
  background-color:rgba(0,0,0,1);
  font-family: HiraKakuProN-W3,"ヒラギノ角ゴ ProN W3",Helvetica,sans-serif;
  margin:0px;
  padding:0px;
  position:relative;
  width:100%;
  word-break: break-all;
  z-index:0;
}

body{
  height: 100%;
  min-width: 1000px;
  min-height: 500px;
  opacity: 1;
  &:before{
    background:url(./assets/images/shooting_background.jpg);
    background-size:cover;
    content: '';
    height: 100%;
    left: 0px;
    opacity: 0.2;
    position: absolute;
    top: 0px;
    width: 100%;
    transition:1s opacity;
    z-index: 0;
  }
}

html.vue-login, body.vue-login {
  height: 100%;
}
</style>
