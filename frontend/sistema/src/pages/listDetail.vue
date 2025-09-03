<script setup>
import { ref, onMounted, computed } from 'vue'
import Nav from '../components/navegacio.vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import MovieCartList from '../components/MovieCardList.vue'


const route = useRoute()
axios.defaults.withCredentials = true


const peliculas = ref([
  {
    id: 1,
    title: "El Origen",
    year: "2010-07-16",
    genre: "Acción/Suspenso",
    synopsis: "Un ladrón roba secretos a través de los sueños.",
    rating: 4.8,
    poster: "https://es.web.img2.acsta.net/c_310_420/pictures/14/10/02/13/09/066723.jpg"
  },
  {
    id: 2,
    title: "Matrix",
    year: "1999-03-31",
    genre: "Acción/Ciencia ficción",
    synopsis: "Un hacker descubre la verdad...",
    rating: 4.5,
    poster: "https://image.tmdb.org/t/p/original/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg"
  },
  {
    id: 3,
    title: "Inception",
    year: "2010-07-16",
    genre: "Acción/Ciencia ficción",
    synopsis: "Un ladrón roba secretos a través de los sueños.",
    rating: 4.8,
    poster: "https://image.tmdb.org/t/p/original/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg"
  },
  {
    id: 4,
    title: "Guardians of the Galaxy",
    year: "2014-08-01",
    genre: "Acción/Aventura",
    synopsis: "Un grupo de inadaptados salva la galaxia.",
    rating: 4.1,
    poster: "https://image.tmdb.org/t/p/original/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg"
  },
  
  {
    id: 6,
    title: "Avatar",
    year: "2009-12-18",
    genre: "Ciencia ficción",
    synopsis: "Un ex-marine se embarca en una misión en Pandora.",
    rating: 4.3,
    poster: "https://image.tmdb.org/t/p/original/kmcqlZGaSh20zpTbuoF0Cdn07dT.jpg"
  },
  {
    id: 7,
    title: "Jurassic Park",
    year: "1993-06-11",
    genre: "Aventura/Ciencia ficción",
    synopsis: "Un parque temático con dinosaurios clonados.",
    rating: 4.2,
    poster: "https://image.tmdb.org/t/p/original/c414cDeQ9b6qLPLeKmiJuLDUREJ.jpg"
  },
  {
    id: 8,
    title: "Star Wars: Episodio IV",
    year: "1977-05-25",
    genre: "Aventura/Ciencia ficción",
    synopsis: "La lucha de la Alianza Rebelde contra el Imperio.",
    rating: 4.9,
    poster: "https://image.tmdb.org/t/p/original/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg"
  },
  
  {
    id: 9,
    title: "The Martian",
    year: "2015-10-02",
    genre: "Ciencia ficción/Aventura",
    synopsis: "Un astronauta queda atrapado en Marte.",
    rating: 4.4,
    poster: "https://image.tmdb.org/t/p/original/5aGhaIHYuQbqlHWvWYqMCnj40y2.jpg"
  }
])
const listasId = route.params.id;
const error = ref(null)

onMounted(async () => {
  try {
    const listaId = route.params.id
    const resp = await fetch(`http://localhost:3300/api/lista/getPeliculasDeLista/${listaId}`)
    const datos = await resp.json()
    if (!Array.isArray(datos)) {
      error.value = 'No se encontraron películas para esta lista.'
      return
    }
    peliculas.value = datos.map(p => ({
      id: p.id,
      title: p.title,
      year: p.release_date,
      genre: p.genre || 'Sin género',
      synopsis: p.overview,
      rating: p.vote_average,
      poster: `https://image.tmdb.org/t/p/original${p.poster_path}`
    }))
  } catch (e) {
    error.value = 'Error al cargar las películas de la lista: ' + e.message
    console.error('Error:', e)
  }
})

const eliminarDeLista = async (movie) => {
  try {
    const listaId = route.params.id;
    await axios.delete('http://localhost:3300/api/lista/eliminarPelicula', {
      data: { lista_id: listaId, pelicula_id: movie.id }
    });
    peliculas.value = peliculas.value.filter(p => p.title !== movie.title);
  } catch (e) {
    error.value = 'Error al eliminar la película de la lista: ' + e.message;
  }
};

const lista = ref({
  nombre: "Favoritas de Ciencia Ficción",
  descripcion: "Mis pelis sci-fi favoritas",
  like: false,
  favorito: false
});

const portadaLista = computed(() => {
  const imgs = peliculas.value.map(p => p.poster).slice(0, 4)
  return imgs
})
</script>

<template>
  <link href="https://cdn.boxicons.com/fonts/basic/boxicons.min.css" rel="stylesheet">
  <div class="movie-page">
    <Nav />
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
    <div v-else-if="!lista" class="loading">
      Cargando...
    </div>
    <div v-else>
      <div class="content-container">
        <div class="movie-header">
          <div class="movie-poster">
          <!-- 1 película -->
          <img v-if="portadaLista.length === 1" :src="portadaLista[0]" alt="Portada lista" class="poster-image">
          <!-- 2 películas -->
          <div v-else-if="portadaLista.length === 2" class="poster-grid poster-2">
            <img :src="portadaLista[0]" alt="Peli 1" class="poster-half left">
            <img :src="portadaLista[1]" alt="Peli 2" class="poster-half right">
          </div>
          <!-- 3 películas -->
          <div v-else-if="portadaLista.length === 3" class="poster-grid poster-3">
            <img :src="portadaLista[0]" alt="Peli 1" class="poster-third top-left">
            <img :src="portadaLista[1]" alt="Peli 2" class="poster-third top-right">
            <img :src="portadaLista[2]" alt="Peli 3" class="poster-third bottom">
          </div>
          <!-- 4 o más películas -->
          <div v-else-if="portadaLista.length >= 4" class="poster-grid poster-4">
            <img :src="portadaLista[0]" alt="Peli 1" class="poster-quarter top-left">
            <img :src="portadaLista[1]" alt="Peli 2" class="poster-quarter top-right">
            <img :src="portadaLista[2]" alt="Peli 3" class="poster-quarter bottom-left">
            <img :src="portadaLista[3]" alt="Peli 4" class="poster-quarter bottom-right">
          </div>
          <!-- Sin películas -->
          <img v-else src="https://cdn-icons-png.flaticon.com/512/833/833472.png" alt="Lista" class="poster-image">
          </div>
          <div class="movie-info">
            <h1 class="movie-title">{{ lista.nombre }}</h1>
            <p class="synopsis">{{ lista.descripcion }}</p>
            <div class="action-buttons">
              <button class="btn-like" :class="{ 'btn-click-like': lista.like }" @click="lista.like = !lista.like">
                <i class='bx bx-like'></i>
              </button>
              <button class="btn-list" :class="{ 'btn-click-like': lista.favorito }" @click="lista.favorito = !lista.favorito">
                <i class='bx bx-bookmark-plus-alt'></i>
              </button>
            </div>
          </div>
        </div>

        <MovieCartList  :idLista="route.params.id" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.movie-page {
  min-height: 100vh;
  background: #111827;
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.movie-header {
  display: flex;
  gap: 2rem;
  margin-bottom: 3rem;
}

.movie-poster {
  flex-shrink: 0;
  width: 300px;
  height: 450px;
  border-radius: 12px;
  overflow: hidden;
}

.poster-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.movie-info {
  flex: 1;
}

.btn-list,
.btn-like {
  font-size: 1.5rem;
  font-weight: 600;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: 2px solid #4b5563;
  color: #ffffff;
  transition: all 0.5s;
}

.movie-title {
  font-size: 2.5rem;
  color: #ffffff;
  margin-bottom: 1rem;
}

.movie-meta {
  display: flex;
  gap: 1rem;
  color: #9ca3af;
  margin-bottom: 1rem;
}

.star.filled {
  color: #fbbf24;
}

.rating-number {
  color: #ffffff;
  font-size: 1.25rem;
}

.synopsis {
  color: #d1d5db;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.action-buttons {
  display: flex;
  gap: 1rem;
}

.btn-eye,
.btn-list,
.btn-like {
  font-size: 1.5rem;
  font-weight: 600;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: 2px solid #4b5563;
  color: #ffffff;
  transition: all 0.5s;
}
.btn-click-like{
  background: #ffffff;
  border: 2px solid #ffffff;
  color: #111827;
}

.btn-eye:hover,
.btn-list:hover,
.btn-like:hover {
  border-color: #6b7280;
  border-radius: 0 50% 0 50%;
  background: rgba(75, 85, 99, 0.2);
}

.btn-eye i,
.btn-like i {
  font-style: normal;
}



.reviews-section {
  margin-top: 3rem;
}

.section-title {
  color: #ffffff;
  font-size: 1.75rem;
  margin-bottom: 2rem;
}

.write-review {
  background: rgba(17, 24, 39, 0.7);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.write-review h3 {
  color: #ffffff;
  margin-bottom: 1rem;
}

.rating-input {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.star-input {
  color: #4b5563;
  font-size: 1.5rem;
  cursor: pointer;
}

.star-input.filled {
  color: #fbbf24;
}

.review-textarea {
  width: 100%;
  min-height: 120px;
  background: #1f2937;
  border: 1px solid #374151;
  border-radius: 8px;
  padding: 1rem;
  color: #ffffff;
  margin-bottom: 1rem;
  resize: vertical;
}

.btn-submit {
  background: #3b82f6;
  color: #ffffff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
  position: relative;
  z-index: 1;
  display: block; 
  width: auto; 
  margin: 0 auto; 
}

.btn-submit:hover {
  background: #2563eb;
}

@media (max-width: 768px) {
  .movie-header {
    flex-direction: column;
  }

  .movie-poster {
    width: 100%;
    height: auto;
    aspect-ratio: 2/3;
  }

  .action-buttons {
    flex-wrap: wrap;
  }

  .btn-watch,
  .btn-list {
    flex: 1;
  }
}

.error-message {
  background-color: rgba(220, 38, 38, 0.1);
  color: #ef4444;
  padding: 1rem;
  border-radius: 8px;
  margin: 2rem auto;
  max-width: 600px;
  text-align: center;
}

.loading {
  color: #ffffff;
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
}
.peliculas-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
}
.pelicula-card {
  background: #1f2937;
  border-radius: 12px;
  overflow: hidden;
  width: 200px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}
.pelicula-card:hover {
  transform: translateY(-5px);
}
.pelicula-poster {
  width: 100%;
  height: 300px;
  object-fit: cover;
}
.pelicula-info {
  padding: 1rem;
  color: #ffffff;
}
.pelicula-title {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}
.pelicula-year,
.pelicula-genre,
.pelicula-rating {
  display: block;
  font-size: 0.9rem;
  color: #9ca3af;
  margin-bottom: 0.25rem;
}


.movie-header {
  display: flex;
  gap: 2rem;
  margin-bottom: 3rem;
}
.poster-grid {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  background: #222;
  display: flex;
  flex-wrap: wrap;
}

/* 2 películas: mitad y mitad */
.poster-2 .poster-half {
  position: absolute;
  width: 50%;
  height: 100%;
  object-fit: cover;
}
.poster-2 .left { left: 0; top: 0; }
.poster-2 .right { right: 0; top: 0; }

/* 3 películas: dos arriba, una abajo centrada */
.poster-3 .poster-third {
  position: absolute;
  width: 50%;
  height: 50%;
  object-fit: cover;
  
}
.poster-3 .top-left { left: 0; top: 0; }
.poster-3 .top-right { right: 0; top: 0; }
.poster-3 .bottom { left: 0%; bottom: 0; width: 100%; height: 50%; }

/* 4 películas: cada esquina */
.poster-4 .poster-quarter {
  position: absolute;
  width: 50%;
  height: 50%;
  object-fit: cover;
}
.poster-4 .top-left { left: 0; top: 0; }
.poster-4 .top-right { right: 0; top: 0; }
.poster-4 .bottom-left { left: 0; bottom: 0; }
.poster-4 .bottom-right { right: 0; bottom: 0; }
</style>