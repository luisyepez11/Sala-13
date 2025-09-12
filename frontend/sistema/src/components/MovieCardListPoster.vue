<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import CardList from './CardList.vue'

const router = useRouter()
const props = defineProps({ idPelicula: String, idLista: String })
const emit = defineEmits(['listaPoster'])
const lista = ref([])
const peliculas = ref([])
const isLoading = ref(true)
watch(peliculas, (newVal) => {
  if (newVal.length > 0) {
    isLoading.value = false
  }
})
const getPoster = (mensaje) => {
  lista.value.push(mensaje)
  if (lista.value.length === peliculas.value.length) {
    console.log("Terminé de cargar posters")
    // Pasamos tanto los posters como el id de la lista
    emit("listaPoster", lista.value, props.idLista)
  }
}

onMounted(async () => {
  try {
    const resp = await fetch(`http://localhost:3300/api/lista/getPeliculasDeLista/${props.idLista}`)
    const datos = await resp.json()
    peliculas.value = datos
  } catch (e) {
    console.error('Error al cargar las películas de la lista:', e)
    isLoading.value = false
  }
})

const goToDetail = (id) => {
  console.log("")
}
</script>

<template>
  <div class="peliculas-row">
    <CardList
      v-for="value in peliculas"
      :key="value.idPelicula || value.id"
      :idPelicula="value.idPelicula || value.id"
      :movie="value"
      :idLista="props.idLista"
      @portada="getPoster"
    />
  </div>
</template>

<style scoped>
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