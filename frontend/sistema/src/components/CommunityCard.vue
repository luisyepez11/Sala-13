<script setup>
defineProps({
  titulo: String,
  descripcion: String,
  imagen: String,
  usuarios: Number
});
</script>

<template>
  <div class="community-card">
    <div class="community-image-wrapper">
      <img :src="imagen" alt="Imagen de la comunidad" class="community-image" />
    </div>
    <div class="community-info">
      <h2 class="community-title">{{ titulo }}</h2>
      <p class="community-description">{{ descripcion }}</p> 
      <div class="usuarios-info">
      <span>{{ usuarios }}</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="-2 -2 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icono-usuarios">
      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
      <path d="M2 14s-1 0-1-1 1-4 7-4 7 3 7 4-1 1-1 1H2z"/>
      </svg>
  
</div>
    </div>
  </div>
</template>

<style scoped>
.community-card {
  background: #1f2937;
  border-radius: 12px;
  overflow: hidden;
  height: 565px;
  width: 300px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.community-card:hover {
  transform: translateY(-5px);
}

.community-image-wrapper {
  width: 100%;
  height: 400px;
  overflow: hidden;
  background-color: #111;
}

.community-image {
  width: 100%;
  height: 200 px;
  object-fit: cover;
}

.community-info {
  padding: 1rem;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.community-title {
  font-size: 1.2rem;
  font-weight: bold;
}

.community-description {
  font-size: 0.9rem;
  color: #9ca3af;
}

.community-users {
  font-size: 0.85rem;
  color: #d1d5db;
}
.usuarios-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #9ca3af;
}
.icono-usuarios {
  width: 20px;
  height: 16px;
  stroke: currentColor;
  display: inline-block;
  vertical-align: text-bottom;
}

</style>