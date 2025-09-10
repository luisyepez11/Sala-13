<script setup>
import Nav from '../components/navegacio.vue'
import searchresultsection from '../components/searchresultsection.vue'
import popularfilmsectionListas from '../components/popularfilmsectionListas.vue'
import Footer from '../components/Footer.vue'
import { useRouter, useRoute } from 'vue-router'
import { ref, watch, onMounted } from 'vue'

const router = useRouter()
const route = useRoute()

const movieId = ref(null)
const componentKey = ref(0)
const selectedFilter = ref('peliculas')

const showLists = ref(false)
const listsData = ref([])

onMounted(() => {
  movieId.value = route.params.id
  if (selectedFilter.value === "listas" && movieId.value) {
    fetchLists(movieId.value)
  }
})

watch(() => route.params.id, (newId) => {
  movieId.value = newId
  componentKey.value++
  if (selectedFilter.value === "listas" && newId) {
    fetchLists(newId)
  }
})

// Función para obtener las listas desde la API
const fetchLists = async (nombre) => {
  try {
    const result = await fetch(`http://localhost:3300/api/lista/getListasBusqueda/${nombre}`)
    const lists = await result.json()
    listsData.value = lists
    console.log("Listas obtenidas:", listsData.value)
  } catch (error) {
    console.log("Error al obtener listas:", error)
  }
}

watch(selectedFilter, async (newFilter) => {
  showLists.value = newFilter === 'listas'

  if (showLists.value && movieId.value) {
    await fetchLists(movieId.value)
  }

  console.log(`El filtro ha cambiado a: ${newFilter}`)
})


const buscar = (nombre) => {
  if (!nombre) {
    router.push("/")
    return
  }

  if (showLists.value) {
    fetchLists(nombre)
  } else {
    router.push("/search/" + nombre)
  }
}
</script>

<template>
  <div class="home-page-container">
    <Nav :buscar="buscar" />

    <main class="main-content">
      <!-- Filtro -->
      <div class="filter-container">
        <label for="filter-select" class="filter-label">Filtrar por:</label>
        <div class="select-wrapper">
          <select id="filter-select" v-model="selectedFilter" class="filter-select">
            <option value="peliculas">Películas</option>
            <option value="listas">Listas</option>
            <option value="usuarios">Usuarios</option>
            <option value="comunidades">Comunidades</option>
          </select>
        </div>
      </div>

      <!-- Resultados de búsqueda -->
      <searchresultsection
        v-if="movieId && !showLists"
        :key="componentKey"
        titulo="Resultados"
        :genero="'/busqueda/' + movieId"
      />

      <!-- Listas -->
      <div v-if="showLists" class="lists-container">
        <div v-if="listsData.length > 0">
          <popularfilmsectionListas
            v-for="list in listsData"
            :key="list.idlista"
            :titulo="list.nombreLista"
            :idLista="list.idlista"
          />
        </div>
        <div v-else class="loading-message">
          No se encontraron listas.
        </div>
      </div>

      <!-- Mensaje inicial -->
      <div v-if="!movieId && !showLists" class="loading-message">
        Realice una búsqueda para ver resultados
      </div>
    </main>
  </div>
  <Footer />
</template>


<style scoped>
.home-page-container {
  background: #091f32;
  min-height: 100vh;
  color: #ffffff;
  font-family: "Poppins", sans-serif;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

/* Estilos para el nuevo filtro */
.filter-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;
}

.filter-label {
  color: #ffffff;
  font-size: 1rem;
  font-weight: 500;
}

.select-wrapper {
  position: relative;
  display: inline-block;
}

.filter-select {
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px; /* Para forma de píldora */
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.filter-select:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.4);
}

.lists-container {
  margin-top: 2rem;
}

.section-title {
  color: #ffffff;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
}

.loading-message {
  text-align: center;
  padding: 3rem;
  color: #9ca3af;
  font-size: 1.2rem;
}

/* Estilos responsivos */
@media (max-width: 768px) {
  .filter-container {
    justify-content: center;
  }
  
  .section-title {
    font-size: 1.75rem;
  }
}

@media (max-width: 480px) {
  .filter-container {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
}
</style>