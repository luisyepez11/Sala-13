<script setup>
import { ref } from 'vue'
import moviecard from './moviecard.vue'
  import axios from 'axios';
  axios.defaults.withCredentials = true;
const movies = ref([
  
  {
    id: 2,
    title: "28 Years Later",
    poster: "https://es.web.img2.acsta.net/medias/nmedia/18/79/49/98/19505162.jpg",
    rating: 4.7,
    views: 2300,
    likes: 187,
    year: 2024
  },
  {
    id: 3,
    title: "Minecraft",
    poster: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi1FSqbjtPabXPuN3EobN21ZTmXNcbT11IyZ_zCjpXVsUbiw2cFh1uZE_F5aGcrGvo3zaLPePZgoVzKKT50sVMEK_fnL4z1M-1r5NrEiAdu7GMXRt64zz-FgJ4k9IaidLT4FBniUO3oNB3cnNwffeeGEBl0aFoDUiI-RqBp8uoDdmSYbf6DqdYoK8pjsYI/s889/Minecraf-tPelicula.jpg",
    rating: 4.1,
    views: 890,
    likes: 67,
    year: 2025
  },
  {
    id: 4,
    title: "Spider-Man: Across the Spider-Verse",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJLXWNQNm6Qr-bGrPFlVGXOP127aKr2D_cyQ&s",
    rating: 4.5,
    views: 1800,
    likes: 142,
    year: 2024
  },
  {
    id: 5,
    title: "Oppenheimer",
    poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    rating: 4.8,
    views: 2500,
    likes: 189,
    year: 2023
  },
  {
    id: 6,
    title: "Son como Niños 2",
    poster: "https://image.tmdb.org/t/p/original/6TRhV0E6wDQjMEtvYru0Kel6juW.jpg",
    rating: 4.5,
    views: 3200,
    likes: 245,
    year: 2023
  },
  {
    id: 7,
    title: "Spider-Man: Across the Spider-Verse",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJLXWNQNm6Qr-bGrPFlVGXOP127aKr2D_cyQ&s",
    rating: 4.5,
    views: 1800,
    likes: 142,
    year: 2024
  },
  {
    id: 8,
    title: "Oppenheimer",
    poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    rating: 4.8,
    views: 2500,
    likes: 189,
    year: 2023
  },
  {
    id: 9,
    title: "Son como Niños 2",
    poster: "https://image.tmdb.org/t/p/original/6TRhV0E6wDQjMEtvYru0Kel6juW.jpg",
    rating: 4.5,
    views: 3200,
    likes: 245,
    year: 2023
  }
  
]) 

const prueba = async() =>{
    const prueb = await axios.get("http://localhost:3300/api/pelicula")
    const newMovies = prueb.data.results.map(movie => ({
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
    }));
    movies.value = newMovies
  }

prueba()
const showAll = ref(false)
const displayedMovies = ref(movies.value.slice(0, 6))

const toggleShowAll = () => {
  
  showAll.value = !showAll.value
  displayedMovies.value = showAll.value ? movies.value : movies.value.slice(0, 6)
}
</script>

<template>
  <section class="popular-section">
    <div class="section-header">
      <h2 class="section-title">Popular Films</h2>
      <button class="see-all-btn" @click="toggleShowAll">
        {{ showAll ? 'Ver Menos' : 'See All' }}
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