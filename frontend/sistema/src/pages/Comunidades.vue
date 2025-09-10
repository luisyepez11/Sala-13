<script setup>
import { ref } from 'vue';
import Navegacio from '../components/navegacio.vue';
import ComunidadesGrid from '../components/ComunidadesGrid.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Estado para el modo de visualización
const viewMode = ref('grid'); // 'grid' o 'full'

// Estado para filtros
const filtroActual = ref('Todas');
const busquedaTexto = ref('');

// Función de búsqueda que se pasa al componente navegacio
const buscar = async (termino) => {
  busquedaTexto.value = termino;
  console.log('Buscando comunidades:', termino);
  // Aquí puedes implementar la lógica de búsqueda
};

// Cambiar modo de visualización
const toggleViewMode = () => {
  viewMode.value = viewMode.value === 'grid' ? 'full' : 'grid';
};

// Cambiar filtro
const cambiarFiltro = (filtro) => {
  filtroActual.value = filtro;
  console.log('Filtro cambiado a:', filtro);
};

// Manejar eventos del grid de comunidades
const handleUnirse = (comunidad) => {
  console.log('Unirse a comunidad:', comunidad.nombre);
  // Aquí puedes implementar la lógica para unirse a una comunidad
};

const handleVerDetalles = (comunidad) => {
  console.log('Ver detalles de comunidad:', comunidad.nombre);
  // Aquí puedes navegar a la página de detalles de la comunidad
  // router.push(`/comunidad/${comunidad.id}`);
};
</script>

<template>
  <div class="comunidades-page">
    <!-- Componente de navegación reutilizable -->
    <Navegacio :buscar="buscar" />
    
    <!-- Contenido principal -->
    <div class="main-content">
      <!-- Header de la página -->
      <div class="page-header">
        <div class="header-content">
          <div class="title-section">
            <h1 class="page-title">Comunidades</h1>
            <p class="page-subtitle">Descubre y únete a comunidades de cinéfilos</p>
          </div>
          
          <!-- Controles de vista -->
          <div class="view-controls">
            <button 
              @click="toggleViewMode" 
              :class="['view-toggle', { 'active': viewMode === 'grid' }]"
              title="Vista en cuadrícula"
            >
              <svg class="view-icon" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
              </svg>
            </button>
            
            <button 
              @click="toggleViewMode" 
              :class="['view-toggle', { 'active': viewMode === 'full' }]"
              title="Vista de lista"
            >
              <svg class="view-icon" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Filtros -->
      <div class="filters-section">
        <div class="filters-content">
          <div class="filter-label">
            <span>Filtrar por:</span>
          </div>
          <div class="filter-buttons">
            <button 
              v-for="filtro in ['Todas', 'Mis comunidades', 'Recomendadas', 'Populares']" 
              :key="filtro"
              @click="cambiarFiltro(filtro)"
              :class="['filter-button', { 'active': filtroActual === filtro }]"
            >
              {{ filtro }}
            </button>
          </div>
        </div>
      </div>
      
      <!-- Grid de comunidades -->
      <ComunidadesGrid 
        :view-mode="viewMode"
        @unirse="handleUnirse"
        @ver-detalles="handleVerDetalles"
      />
    </div>
  </div>
</template>

<style scoped>
.comunidades-page {
  background: #091f32;
  min-height: 100vh;
  color: #ffffff;
  font-family: "Poppins-Regular", sans-serif;
}

.main-content {
  padding-top: 20px;
}

.page-header {
  background: #0f2847;
  border-bottom: 1px solid #1e3a8a;
  padding: 30px 0;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title-section {
  flex: 1;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 8px 0;
}

.page-subtitle {
  font-size: 1.1rem;
  color: #d1d5db;
  margin: 0;
}

.view-controls {
  display: flex;
  gap: 8px;
  background: #1e3a8a;
  padding: 4px;
  border-radius: 8px;
  border: 1px solid #3b82f6;
}

.view-toggle {
  padding: 8px 12px;
  background: transparent;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.view-toggle:hover {
  background: #3b82f6;
}

.view-toggle.active {
  background: #3b82f6;
  color: #ffffff;
}

.view-icon {
  width: 18px;
  height: 18px;
  color: #d1d5db;
}

.view-toggle.active .view-icon {
  color: #ffffff;
}

.filters-section {
  background: #0a1929;
  border-bottom: 1px solid #1e3a8a;
  padding: 20px 0;
}

.filters-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  gap: 20px;
}

.filter-label {
  font-weight: 600;
  color: #d1d5db;
  font-size: 0.95rem;
}

.filter-buttons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.filter-button {
  padding: 8px 16px;
  background: transparent;
  border: 1px solid #4b5563;
  border-radius: 20px;
  color: #d1d5db;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-button:hover {
  background: #374151;
  border-color: #6b7280;
  color: #ffffff;
}

.filter-button.active {
  background: #3b82f6;
  border-color: #3b82f6;
  color: #ffffff;
}

/* Responsive design */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .filters-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .filter-buttons {
    width: 100%;
  }
  
  .filter-button {
    flex: 1;
    min-width: 0;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .view-controls {
    width: 100%;
    justify-content: center;
  }
  
  .filter-buttons {
    flex-direction: column;
  }
  
  .filter-button {
    width: 100%;
  }
}
</style>