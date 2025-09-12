<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import Nav from '../components/navegacio.vue';
import searchresultsection from '../components/searchresultsection.vue';
import popularfilmsectionListas from '../components/popularfilmsectionListas.vue';
import UserSearchResult from '../components/UserSearchResult.vue';
import CommunitySearchResult from '../components/CommunitySearchResult.vue';
import Footer from '../components/Footer.vue';

const router = useRouter();
const route = useRoute();

const searchQuery = ref('');
const componentKey = ref(0);
const selectedFilter = ref('peliculas');
const listsData = ref([]);

const fetchLists = async (query) => {
  try {
    const res = await axios.get(`http://localhost:3300/api/lista/getListasBusqueda/${query}`);
    listsData.value = res.data;
  } catch (error) {
    console.error("Error al obtener listas:", error);
    listsData.value = [];
  }
};

const performSearch = (query) => {
  if (!query) return;

  if (selectedFilter.value === 'listas') {
    fetchLists(query);
  }
};

onMounted(() => {
  searchQuery.value = route.params.id || '';
  performSearch(searchQuery.value);
});

watch(() => route.params.id, (newQuery) => {
  searchQuery.value = newQuery || '';
  componentKey.value++; 
  performSearch(searchQuery.value);
});

watch(selectedFilter, () => {
  performSearch(searchQuery.value);
});

const buscar = (query) => {
  if (!query) {
    router.push("/");
  } else {
    router.push("/search/" + query);
  }
};
</script>

<template>
  <div class="home-page-container">
    <Nav :buscar="buscar" />
    <main class="main-content">
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

      <div v-if="searchQuery">
        <searchresultsection
          v-if="selectedFilter === 'peliculas'"
          :key="componentKey"
          titulo="Resultados"
          :genero="'/busqueda/' + searchQuery"
        />

        <div v-else-if="selectedFilter === 'listas'">
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

        <UserSearchResult v-else-if="selectedFilter === 'usuarios'" />

        <CommunitySearchResult v-else-if="selectedFilter === 'comunidades'" />

      </div>

      <div v-else class="loading-message">
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
  border-radius: 8px;
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
.loading-message {
  text-align: center;
  padding: 3rem;
  color: #9ca3af;
  font-size: 1.2rem;
}
</style>

