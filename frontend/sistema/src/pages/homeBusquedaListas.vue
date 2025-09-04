<script setup>
import Nav from '../components/navegacio.vue'
import searchresultsection from '../components/searchresultsection.vue'
import popularfilmsectionListas from '../components/popularfilmsectionListas.vue'
import { useRouter, useRoute } from 'vue-router'
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'

const router = useRouter()
const route = useRoute()

const movieId = ref(null)
const componentKey = ref(0)
const selectedFilter = ref('peliculas') 
const showLists = ref(false)
const listsData = ref([]) 
const searchQuery = ref('') // Para almacenar el término de búsqueda

onMounted(() => {
  movieId.value = route.params.id
  // Cargar listas populares al inicio si estamos en modo listas
  if (selectedFilter.value === 'listas') {
    showLists.value = true
    fetchLists('') // Cargar todas las listas al inicio
  }
})

watch(() => route.params.id, (newId) => {
  movieId.value = newId
  componentKey.value++ 
})

// Función para obtener las listas desde la API
const fetchLists = async (nombre) => {
  try {
    const result = await axios.put(`http://localhost:3300/api/lista/getListasBusqueda`, {listaId: nombre})
    listsData.value = result.data // Con axios, los datos vienen en result.data
    console.log(listsData.value)
  } catch (error) {
    console.log(error)
  }
}

// Observador que se activa cuando cambia el filtro
watch(selectedFilter, async (newFilter) => {
  if (newFilter === 'listas') {
    showLists.value = true
    await fetchLists('') // Cargar todas las listas al cambiar a este filtro
  } else {
    showLists.value = false
  }
  
  console.log(`El filtro ha cambiado a: ${newFilter}`)
})

const buscar = async (nombre) => {
  searchQuery.value = nombre // Guardar el término de búsqueda
  
  if (nombre === "") {
    if (showLists.value) {
      await fetchLists('') // Si estamos en modo listas, cargar todas
    } else {
      router.push("/")
    }
  } else {
    if (showLists.value) {
      await fetchLists(nombre) // Buscar listas
    } else {
      router.push("/search/"+nombre) // Buscar películas
    }
  }
}
</script>

<template>
  <div class="home-page-container">
    <Nav :buscar="buscar" />
    
    <main class="main-content">
      <!-- Filtro añadido aquí -->
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

      <!-- Mostrar resultados de búsqueda cuando no estamos en modo listas -->
      <searchresultsection 
        v-if="movieId && !showLists"
        :key="componentKey"
        titulo="Resultados" 
        :genero="'/busqueda/' + movieId"
      />

      <!-- Mostrar listas cuando el filtro está en "listas" -->
      <div v-if="showLists" class="lists-container">
        <h2 class="section-title">
          {{ searchQuery ? `Resultados para: "${searchQuery}"` : 'Listas populares' }}
        </h2>
        <div v-if="listsData.length > 0">
          <popularfilmsectionListas 
            v-for="list in listsData" 
            :key="list.idlista"
            :titulo="list.nombreLista" 
            :idLista="list.idlista"
          />
        </div>
        <div v-else class="loading-message">
          {{ searchQuery ? 'No se encontraron listas' : 'Cargando listas...' }}
        </div>
      </div>

      <div v-if="!movieId && !showLists" class="loading-message">
        Realice una búsqueda para ver resultados
      </div>
    </main>
  </div>
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