<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
axios.defaults.withCredentials = true
const router = useRouter()

const props = defineProps({ idPelicula: [String, Number],idLista: String })

const movie = ref(null)
const emit = defineEmits(['portada'])
onMounted(async () => {
  try {
    const resp = await fetch(`http://localhost:3300/api/pelicula/getPelicula/${props.idPelicula}`)
    const datos = await resp.json()
    movie.value = {
      id: datos.id,
      title: datos.title,
      year: datos.release_date,
      genre: datos.genre || 'Sin género',
      synopsis: datos.overview,
      rating: (datos.vote_average/2).toFixed(1),
      poster: `https://image.tmdb.org/t/p/original${datos.poster_path}`
    }
    emit('portada', `https://image.tmdb.org/t/p/original${datos.poster_path}`)
  } catch (e) {
    console.error('Error al cargar la película:', e)
  }
})


const eliminar = async() =>{
  try {
    const result = await axios.delete('http://localhost:3300/api/lista/eliminarPelicula',{
          data: {
        idLista: props.idLista,
        idPelicula: props.idPelicula
      }
    })
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div v-if="movie" class="pelicula-card"  style="cursor:pointer">
    <img :src="movie.poster" :alt="movie.title" class="pelicula-poster" />
    <div class="pelicula-info">
      <h2 class="pelicula-title">{{ movie.title }}</h2>
      <span class="pelicula-year">{{ movie.year }}</span>
      <span class="pelicula-genre">{{ movie.genre }}</span>
      <span class="pelicula-rating">★ {{ movie.rating }}/5</span>
      <button class="btn-list" @click="eliminar">Eliminar</button>
    </div>
  </div>
</template>

<style scoped>
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
.btn-list {
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  background: transparent;
  border: 2px solid #4b5563;
  color: #ffffff;
  transition: all 0.5s;
  margin-top: 0.5rem;
}
.btn-list:hover {
  border-color: #6b7280;
  border-radius: 0 50% 0 50%;
  background: rgba(75, 85, 99, 0.2);
}
</style>