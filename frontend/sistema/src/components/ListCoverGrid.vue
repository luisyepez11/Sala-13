<script setup>
defineProps({
  posters: {
    type: Array,
    default: () => []
  }
});
</script>

<template>
  <div class="list-cover-container">
    <img v-if="posters.length === 1" :src="posters[0]" alt="Portada de la lista" class="cover-image full">
    
    <div v-else-if="posters.length === 2" class="cover-grid cover-2">
      <img :src="posters[0]" alt="Película 1" class="cover-half left">
      <img :src="posters[1]" alt="Película 2" class="cover-half right">
    </div>
    
    <div v-else-if="posters.length === 3" class="cover-grid cover-3">
      <img :src="posters[0]" alt="Película 1" class="cover-third top-left">
      <img :src="posters[1]" alt="Película 2" class="cover-third top-right">
      <img :src="posters[2]" alt="Película 3" class="cover-third bottom">
    </div>
    
    <div v-else-if="posters.length >= 4" class="cover-grid cover-4">
      <img :src="posters[0]" alt="Película 1" class="cover-quarter top-left">
      <img :src="posters[1]" alt="Película 2" class="cover-quarter top-right">
      <img :src="posters[2]" alt="Película 3" class="cover-quarter bottom-left">
      <img :src="posters[3]" alt="Película 4" class="cover-quarter bottom-right">
    </div>
    
    <div v-else class="cover-placeholder">
      <img src="https://cdn-icons-png.flaticon.com/512/833/833472.png" alt="Portada por defecto de la lista">
    </div>
  </div>
</template>

<style scoped>
.list-cover-container {
  flex-shrink: 0;
  width: 300px;
  height: 450px;
  border-radius: 12px;
  overflow: hidden;
  background-color: #222;
}

.cover-image.full, .cover-placeholder, .cover-grid {
  width: 100%;
  height: 100%;
}

.cover-placeholder img {
    width: 100%;
    height: 100%;
    object-fit: scale-down;
    padding: 20%;
    opacity: 0.5;
}

.cover-grid {
  position: relative;
  display: flex;
  flex-wrap: wrap;
}

.cover-2 .cover-half {
  position: absolute;
  width: 50%;
  height: 100%;
  object-fit: cover;
}
.cover-2 .left { left: 0; top: 0; }
.cover-2 .right { right: 0; top: 0; }

.cover-3 .cover-third {
  position: absolute;
  height: 50%;
  object-fit: cover;
}
.cover-3 .top-left { left: 0; top: 0; width: 50%; }
.cover-3 .top-right { right: 0; top: 0; width: 50%; }
.cover-3 .bottom { left: 0; bottom: 0; width: 100%; }

.cover-4 .cover-quarter {
  position: absolute;
  width: 50%;
  height: 50%;
  object-fit: cover;
}
.cover-4 .top-left { left: 0; top: 0; }
.cover-4 .top-right { right: 0; top: 0; }
.cover-4 .bottom-left { left: 0; bottom: 0; }
.cover-4 .bottom-right { right: 0; bottom: 0; }
</style>
