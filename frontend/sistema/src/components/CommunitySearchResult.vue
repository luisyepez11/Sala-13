<script setup>
import { ref } from 'vue';

const mockCommunities = ref([
  { id: 1, name: 'Amantes del Cine Clásico', description: 'Un espacio para discutir y apreciar las joyas del cine de la edad de oro.', members: 1250, avatar: 'https://placehold.co/80x80/3b82f6/ffffff?text=Clasicos' },
  { id: 2, name: 'Terror en la Noche', description: 'Solo para valientes. Aquí hablamos de las películas más aterradoras.', members: 890, avatar: 'https://placehold.co/80x80/3b82f6/ffffff?text=Terror' },
  { id: 3, name: 'Sci-Fi Universe', description: 'Desde Star Wars hasta Blade Runner, todo sobre la ciencia ficción.', members: 2300, avatar: 'https://placehold.co/80x80/3b82f6/ffffff?text=Sci-Fi' },
  { id: 4, name: 'Comedias para Reír', description: 'El club de los que creen que una buena carcajada lo cura todo.', members: 1500, avatar: 'https://placehold.co/80x80/3b82f6/ffffff?text=Comedia' },
]);

function joinCommunity(communityId) {
  console.log(`Uniéndose a la comunidad con ID: ${communityId}`);
}
</script>

<template>
  <div class="community-results-container">
    <div v-if="mockCommunities.length > 0" class="community-grid">
      <div v-for="community in mockCommunities" :key="community.id" class="community-card">
        
        <img :src="community.avatar" alt="Avatar de la comunidad" class="community-avatar">
        
        <div class="community-info">
          <h3 class="community-name">{{ community.name }}</h3>
          <p class="community-description">{{ community.description }}</p>
        </div>
        <div class="community-footer">
          <span class="community-members">{{ community.members.toLocaleString() }} miembros</span>
          <button class="join-button" @click.stop="joinCommunity(community.id)">Unirse</button>
        </div>
      </div>
    </div>
    <div v-else class="no-results-message">
      <p>No se encontraron comunidades.</p>
    </div>
  </div>
</template>

<style scoped>
.community-results-container {
  padding-top: 2rem;
}
.community-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}
.community-card {
  background-color: #1f2937;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #374151;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}
.community-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
.community-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 1rem;
    border: 2px solid #3b82f6;
}
.community-info {
    text-align: center;
}
.community-name {
  color: #ffffff;
  font-weight: 600;
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
}
.community-description {
  color: #9ca3af;
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 1rem;
}
.community-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  width: 100%;
}
.community-members {
  color: #d1d5db;
  font-size: 0.875rem;
  font-weight: 500;
}
.join-button {
  background-color: #3b82f6;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}
.join-button:hover {
  background-color: #2563eb;
}
.no-results-message {
	text-align: center;
	padding: 3rem;
	color: #9ca3af;
	font-size: 1.2rem;
}
</style>

