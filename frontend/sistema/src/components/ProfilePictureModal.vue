<script setup>
import { ref } from 'vue';
import axios from 'axios';

axios.defaults.withCredentials = true;

defineProps({
  isOpen: Boolean
});

const emit = defineEmits(['close', 'poster-selected']);

const searchQuery = ref('');
const searchResults = ref([]);
const isLoading = ref(false)


const performSearch = async () => {
  if (searchQuery.value.trim().length === 0) {
    searchResults.value = [];
    return;
  }

  isLoading.value = true; // ⏳ empieza la carga

  try {
    const formattedQuery = searchQuery.value.trim().replace(/\s+/g, '+');
    const res = await axios.get(`https://sala-13.onrender.com/api/pelicula/busqueda/${formattedQuery}`);

    const moviesWithPosters = res.data.results.filter(movie => movie.poster_path);

    const newMovies = moviesWithPosters.map(movie => ({
      id: movie.id,
      title: movie.title,
      poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    }));

    searchResults.value = newMovies;
  } catch (err) {
    console.error("Error al buscar películas:", err);
    searchResults.value = [];
  } finally {
    isLoading.value = false; // ✅ termina la carga
  }
};
const buscarPeliculas = async () => {
  
  try {
    const formattedQuery = searchQuery.value.trim().replace(/\s+/g, '+');
    const res = await axios.get(`https://sala-13.onrender.com/api/pelicula/busqueda/${formattedQuery}`);

    const moviesWithPosters = res.data.results.filter(movie => movie.poster_path);

    const newMovies = moviesWithPosters.map(movie => ({
      id: movie.id,
      title: movie.title,
      poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    }));

    searchResults.value = newMovies;

  } catch (err) {
    console.error("Error al buscar películas:", err);
    searchResults.value = [];
  }
};


function selectPoster(posterUrl) {
  emit('poster-selected', posterUrl);
}
</script>

<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="emit('close')">
    <div class="modal-content">
      <h2 class="modal-title">Elige una foto de perfil</h2>
      <form class="search-bar-container" @submit.prevent="performSearch">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Buscar película..."
          class="search-input-modal"
        />
        <button type="submit" class="search-button-modal" aria-label="Buscar">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </button>
      </form>
      <div class="search-results-container">
  <div v-if="isLoading" class="loading-spinner">
    <svg class="spinner" viewBox="0 0 50 50">
      <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5" />
    </svg>
  </div>

  <div v-else-if="searchResults.length > 0" class="results-grid">
    <div v-for="movie in searchResults" :key="movie.id" class="result-item" @click="selectPoster(movie.poster)">
      <img :src="movie.poster" :alt="movie.title" class="result-poster-circular">
    </div>
  </div>

  <div v-else class="no-results">
    <p>Busca una película para seleccionar un póster.</p>
  </div>
</div>

    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  font-family: "Poppins", sans-serif;
}

.modal-content {
  background-color: #1f2937;
  padding: 2rem;
  border-radius: 1rem;
  width: 90%;
  max-width: 500px;
  height: 80vh;
  display: flex;
  flex-direction: column;
}
.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2rem;
}

.spinner {
  animation: rotate 1s linear infinite;
  width: 80px;
  height: 80px;
}

.path {
  stroke: #4a90e2;
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}


.modal-title {
  color: #ffffff;
  text-align: center;
  margin-bottom: 1.5rem;
}

.search-bar-container {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

.search-input-modal {
  width: 100%;
  padding: 0.75rem 3rem 0.75rem 1rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #4b5563;
  background-color: #374151;
  color: #ffffff;
  outline: none;
}

.search-button-modal {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  padding: 0 1rem;
  background: transparent;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-button-modal:hover {
  color: #ffffff;
}

.search-results-container {
  flex-grow: 1;
  overflow-y: auto;
}

.results-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    padding: 0.5rem;
}

.result-item {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}

.result-poster-circular {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid transparent;
    transition: border-color 0.3s ease;
}

.result-item:hover .result-poster-circular {
    border-color: #3b82f6;
}

.no-results {
  text-align: center;
  color: #9ca3af;
  padding-top: 2rem;
}
</style>

