<script setup>
import { ref, onMounted } from 'vue'
import Nav from '../components/navegacio.vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import MovieCartList from '../components/MovieCardList.vue'
import ListCoverGrid from '../components/ListCoverGrid.vue'
import Footer from '../components/Footer.vue'

const route = useRoute()
axios.defaults.withCredentials = true
const portadaLista = ref([])
const peliculas = ref([])
const error = ref(null)

const lista = ref({
  nombre: "Cargando nombre...",
  descripcion: "Cargando descripción...",
  nombreCreador:"Cargando........",
  like: false,
  favorito: false
});

onMounted(async () => {
  try {
    const listaId = route.params.id
    const resp = await fetch(`http://localhost:3300/api/lista/getPeliculasDeLista/${listaId}`)
    const respLista = await fetch(`http://localhost:3300/api/lista/getLista/${listaId}`)
    const datosLista = await respLista.json()
    const datos = await resp.json()
    lista.value = {
  idLista:datosLista[0].idlista,
  nombre: datosLista[0].nombreLista,
  descripcion: datosLista[0].descripcion,
  nombreCreador: datosLista[0].nombreCuenta,
  like: false,
  favorito: false
}
    if (!Array.isArray(datos) || datos.length === 0) {
      error.value = 'No se encontraron películas para esta lista.'
      fetchListaDetails(listaId);
      return
    }
    fetchListaDetails(listaId);

    peliculas.value = datos.map(p => ({
      id: p.idPelicula,
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

const fetchListaDetails = async (listaId) => {
    try {
    } catch (err) {
        console.error("Error al obtener detalles de la lista", err);
        lista.value.nombre = "Nombre de la lista no encontrado";
        lista.value.descripcion = "Descripción no disponible.";
    }
}

const addListe = async () =>{
        try {
          const usarioId = await axios.get("http://localhost:3300/api/usuario/user")
          const dataLista = await axios.post(`http://localhost:3300/api/lista`, {
				nombreLista: lista.value.nombre,
				descripcion: lista.value.descripcion,
				idCuenta: usarioId.data.id
			});
      const idLista = await dataLista
      console.log(peliculas.value)
          peliculas.value.forEach(async pelicula =>{
            
                const result = await axios.post('http://localhost:3300/api/lista/agregarPelicula',{
            idLista:idLista.data.id, 
            idPelicula:pelicula.id
          })
          })
          alert("lista agregada a perfil")
          lista.favorito = !lista.favorito
        } catch (error) {
          console.log(error)
        }
}
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
const getposters = (posters) => {
  portadaLista.value = posters;
}
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
          <ListCoverGrid :posters="portadaLista" />

          <div class="movie-info">
            <h1 class="movie-title">{{ lista.nombre }}</h1>
            <p class="synopsis">{{ lista.descripcion }}</p>
            <p class="synopsis">Creada por : {{ lista.nombreCreador }}</p>
            <div class="action-buttons">
              <button class="btn-like" :class="{ 'btn-click-like': lista.like }" @click="lista.like = !lista.like">
                <i class='bx bx-like'></i>
              </button>
              <button class="btn-list" :class="{ 'btn-click-like': lista.favorito }" @click="addListe">
                <i class='bx bx-bookmark-plus-alt'></i>
              </button>
            </div>
          </div>
        </div>

        <MovieCartList :idLista="route.params.id" @listaPoster="getposters"/>
      </div>
    </div>
  </div>
  <Footer />
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
  align-items: flex-start;
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

.btn-click-like{
  background: #ffffff;
  border: 2px solid #ffffff;
  color: #111827;
}

.btn-list:hover,
.btn-like:hover {
  border-color: #6b7280;
  border-radius: 0 50% 0 50%;
  background: rgba(75, 85, 99, 0.2);
}

@media (max-width: 768px) {
  .movie-header {
    flex-direction: column;
    align-items: center;
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
</style>
