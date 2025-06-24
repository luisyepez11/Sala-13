<script setup>
const props = defineProps({
    poster:String,
    title:String,
    Id:Number
}) 
</script>
<template>
    <div class="movie-poster">
                <img :src="props.poster" :alt="props.title" class="poster-image">

                <div v-if="props.Id === 5" class="movie-overlay">
                  <svg class="overlay-x" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </div>
              </div>
</template>
<style>
.movies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
}

.movie-card {
  position: relative;
  cursor: pointer;
}

.movie-poster {
  aspect-ratio: 2/3;
  background: #374151;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  min-width:  100px;
}

.poster-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.2s;
}

.movie-card:hover .poster-image {
  transform: scale(1.05);
}

.movie-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlay-x {
  width: 64px;
  height: 64px;
  color: #ef4444;
}
</style>