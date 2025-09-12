<script setup>
import { ref, watch } from 'vue'
import moviecard from './moviecard.vue'
import axios from 'axios'

axios.defaults.withCredentials = true

const props = defineProps({ genero: "", titulo: "" })
console.log(props.genero)
const movies = ref([])
const showAll = ref(false)
const displayedMovies = ref([])

const fetchMovies = async () => {
  try {
    const res = await axios.get(`/api/lista/getPeliculasDeLista/${props.genero}`)
    const newMovies = res.data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      poster: movie.poster_path 
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://via.placeholder.com/500x750?text=No+Poster',
      rating: (movie.vote_average / 2).toFixed(2), 
      views: Math.floor(Math.random() * 5000), 
      likes: Math.floor(movie.vote_count / 10), 
      year: movie.release_date 
        ? new Date(movie.release_date).getFullYear() 
        : 'N/A'
    }))
    movies.value = newMovies
    updateDisplayedMovies()
  } catch (err) {
    console.error("Error al obtener películas:", err)
  }
}

const updateDisplayedMovies = () => {
  displayedMovies.value = showAll.value ? movies.value : movies.value.slice(0, 6)
}

const toggleShowAll = () => {
  showAll.value = !showAll.value
  updateDisplayedMovies()
}


fetchMovies()

watch(() => props.genero, () => {
  fetchMovies()
})

watch(movies, () => {
  updateDisplayedMovies()
})
</script>


<template>
  <section class="popular-section">
    <div class="section-header">
      <h2 class="section-title">{{props.titulo}}</h2>
      <button class="see-all-btn" @click="toggleShowAll">
        {{ showAll ? 'Ver Menos' : 'Cargar Más' }}
        <svg class="arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
    
    <div class="movies-grid">
      <moviecard 
        v-for="movie in displayedMovies"
        :key="movie.id"
        :movie="movie"
      />
    </div>
    
    <!-- Mobile Load More -->
    <div class="mobile-load-more">
      <button class="load-more-btn" @click="toggleShowAll">
        {{ showAll ? 'Ver Menos' : 'Cargar Más' }}
      </button>
    </div>
  </section>
</template>

<style scoped>
.popular-section {
  margin-bottom: 4rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.section-title {
  color: #ffffff;
  font-size: 1.875rem;
  font-weight: 700;
  margin: 0;
}

.see-all-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #d1d5db;
  padding: 0.625rem 1.25rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.see-all-btn:hover {
  border-color: rgba(255, 255, 255, 0.3);
  color: #ffffff;
  background: rgba(255, 255, 255, 0.05);
}

.arrow-icon {
  width: 1rem;
  height: 1rem;
  transition: transform 0.3s ease;
}

.see-all-btn:hover .arrow-icon {
  transform: translateX(2px);
}

.movies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.mobile-load-more {
  display: none;
  text-align: center;
}

.load-more-btn {
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 0.875rem 2rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.load-more-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.25);
}

/* Responsive Grid */
@media (max-width: 1400px) {
  .movies-grid {
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    gap: 1.25rem;
  }
}

@media (max-width: 1200px) {
  .movies-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 1rem;
  }
}

@media (max-width: 1024px) {
  .movies-grid {
    grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
    gap: 1rem;
  }
  
  .section-title {
    font-size: 1.75rem;
  }
}

@media (max-width: 768px) {
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
  
  .see-all-btn {
    display: none;
  }
  
  .mobile-load-more {
    display: block;
  }
  
  .movies-grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 0.875rem;
  }
}

@media (max-width: 640px) {
  .movies-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 0.75rem;
  }
}

@media (max-width: 480px) {
  .movies-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.625rem;
  }
  
  .section-title {
    font-size: 1.375rem;
  }
}

@media (max-width: 360px) {
  .movies-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }
}
</style>