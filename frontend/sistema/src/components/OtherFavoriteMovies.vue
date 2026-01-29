<script setup>
import { ref, onMounted } from 'vue';
import MovieSearchModal from './MovieSearchModal.vue';
import axios from 'axios';
  import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
  const route = useRoute()
const favoriteMovies = ref([null, null, null, null]);
const isModalOpen = ref(false);
const activeSlotIndex = ref(null);
const errorMessage = ref('');
const isEditing = ref(false);

// Cargar películas al montar
onMounted(async () => {
    try {
        const userRes = await axios.get("http://localhost:3300/api/usuario/user");
        
        const favoritesRes = await axios.get(`http://localhost:3300/api/favoritas/${route.params.id}`);
        
        const storedMovies = await Promise.all(favoritesRes.data.map(async (p) => {
            try {
                const resp = await fetch(`http://localhost:3300/api/pelicula/getPelicula/${p.idPelicula}`);
                const datos = await resp.json();
                return {
                    id: datos.id,
                    title: datos.title,
                    poster: `https://image.tmdb.org/t/p/w500${datos.poster_path}`,
                    likes: Math.floor(Math.random() * 100), // Simulado o de la DB
                    views: Math.floor(Math.random() * 1000) // Simulado o de la DB
                };
            } catch (error) {
                return null;
            }
        }));

        const moviesFiltradas = storedMovies.filter(m => m !== null);
        
        // Llenamos los slots (máximo 4)
        moviesFiltradas.forEach((movie, index) => {
            if (index < 4) favoriteMovies.value[index] = movie;
        });
    } catch (error) {
        console.error("Error cargando favoritas:", error);
    }
});

async function selectMovie(movie) {
    errorMessage.value = '';
    const isAlreadyFavorite = favoriteMovies.value.some(
        (favMovie) => favMovie && favMovie.id === movie.id
    );

    if (isAlreadyFavorite) {
        errorMessage.value = "Esta película ya se encuentra entre tus favoritas";
        setTimeout(() => errorMessage.value = '', 3000);
        closeMovieModal();
        return;
    }

    try {
        const userRes = await axios.get("http://localhost:3300/api/usuario/user");
        await axios.post('http://localhost:3300/api/favoritas/agregarPeliculaAFavoritas', {
            idPelicula: movie.id,
            idCuenta: userRes.data.id
        });

        const movieWithStats = {
            id: movie.id,
            title: movie.title,
            poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : movie.poster,
            likes: 0,
            views: 0
        };

        if (activeSlotIndex.value !== null) {
            favoriteMovies.value[activeSlotIndex.value] = movieWithStats;
        }
        closeMovieModal();
    } catch (error) {
        console.error("Error al guardar favorita:", error);
    }
}

async function removeMovie(index) {
    const movieToRemove = favoriteMovies.value[index];
    if (!movieToRemove) return;

    try {
        const userRes = await axios.get("http://localhost:3300/api/usuario/user");
        
        // Asumiendo que tienes este endpoint para eliminar
        await axios.delete(`http://localhost:3300/api/favoritas/eliminarPeliculaDeFavoritas`, {
            data: {
                idPelicula: movieToRemove.id,
                idCuenta: userRes.data.id
            }
        });

        favoriteMovies.value[index] = null;
    } catch (error) {
        console.error("Error al eliminar favorita:", error);
    }
}

function navigateToMovie(movieId) {
    if (!isEditing.value && movieId) router.push(`/details/${movieId}`);
}

function openMovieModal(index) {
    activeSlotIndex.value = index;
    isModalOpen.value = true;
}

function closeMovieModal() {
    isModalOpen.value = false;
    activeSlotIndex.value = null;
}

function toggleEditMode() {
    isEditing.value = !isEditing.value;
}
</script>

<template>
  <div>

    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>

    <div class="favorites-grid">
      <div v-for="(movie, index) in favoriteMovies" :key="index" class="favorite-slot">
        
        <div v-if="movie" class="movie-card-wrapper" 
             :class="{ 'editable': isEditing }"
             @click="isEditing ? openMovieModal(index) : navigateToMovie(movie.id)">
          
          <button
            v-if="isEditing"
            @click.stop="removeMovie(index)"
            class="remove-movie-btn"
            aria-label="Eliminar película"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          
          <img :src="movie.poster" :alt="`Póster de ${movie.title}`" class="movie-poster-fav">
          
          <div class="movie-info-fav">
            <span class="movie-title-fav">{{ movie.title }}</span>
            <div class="movie-stats-fav">
              <div class="stat">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                <span>{{ movie.likes }}</span>
              </div>
              <div class="stat">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                <span>{{ movie.views }}</span>
              </div>
            </div>
          </div>
        </div>
        <button v-else class="placeholder-button">
          <div class="placeholder-card">
            <h2 class="placeholder-title">No tiene pelicula asignada</h2>
            <p class="placeholder-description">Selecciona una favorita</p>
          </div>
        </button>

      </div>
    </div>

    <MovieSearchModal
      :isOpen="isModalOpen"
      @close="closeMovieModal"
      @movie-selected="selectMovie"
    />
  </div>
</template>

<style scoped>
.error-message {
  background-color: #ef4444;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 1.5rem;
  font-weight: 500;
  font-family: "Poppins", sans-serif;
}

.edit-controls {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
}

.edit-toggle-btn {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.edit-toggle-btn:hover {
  background-color: #2563eb;
}

.favorites-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.favorite-slot {
  aspect-ratio: 2 / 3;
  display: flex;
}

.placeholder-button {
  width: 100%;
  height: 100%;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
}

.placeholder-card {
  width: 100%;
  height: 100%;
  background: rgba(75, 85, 99, 0.3);
  border: 2px dashed #6b7280;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #d1d5db;
  transition: background-color 0.3s;
}

.placeholder-button:hover .placeholder-card {
  background: rgba(75, 85, 99, 0.5);
}

.placeholder-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.placeholder-description {
  font-size: 0.9rem;
  color: #9ca3af;
  margin-top: 0.5rem;
}

.movie-card-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #4b5563;
  transition: transform 0.2s, box-shadow 0.2s;
}

.movie-card-wrapper:not(.editable):hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.movie-card-wrapper.editable:hover {
    border-color: #3b82f6;
}

.remove-movie-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  background-color: rgba(239, 68, 68, 0.8);
  color: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: background-color 0.2s;
}

.remove-movie-btn:hover {
  background-color: #ef4444;
}

.remove-movie-btn svg {
  width: 20px;
  height: 20px;
}

.movie-poster-fav {
  width: 100%;
  height: 100%;
  object-fit: cover;
  flex-grow: 1;
}

.movie-info-fav {
  background-color: rgba(30, 41, 59, 0.8);
  padding: 0.75rem;
  backdrop-filter: blur(4px);
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}

.movie-title-fav {
  color: #ffffff;
  font-weight: 600;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
}

.movie-stats-fav {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
  color: #9ca3af;
}

.stat {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .favorites-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>

