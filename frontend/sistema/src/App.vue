<script setup>

import { RouterView } from 'vue-router';

</script>

<template>
    <div class="bg">
        <RouterView></RouterView>
        <div class="ellipse-1"></div>
    </div>


</template>

<style >

body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    
}
.bg,
.bg {
  background: #050a24;
  height: 900px;
  overflow: hidden;
}
.ellipse-1 {
  background: #0032ff;
  border-radius: 50%;
  width: 379px;
  height: 379px;
  position: absolute;
  left: 0px;
  top: 898px;
  filter: blur(275px);
}
</style>