<script setup>
import { ref, onMounted } from 'vue';
import Navegacio from '../components/navegacio.vue';
import ComunidadesGrid from '../components/ComunidadesGrid.vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
axios.defaults.withCredentials = true;
const router = useRouter();

// Estado para el modo de visualización
const viewMode = ref('grid'); // 'grid' o 'full'

// Estado para filtros
const filtroActual = ref('Todas');
const busquedaTexto = ref('');


const comunidades = ref([]);
const comunidadesCargando = ref(true);
const comunidadesError = ref(null);
const usuarioId = ref(null);

const cargarComunidades = async () => {
  comunidadesCargando.value = true;
  comunidadesError.value = null;
  
  try {

    const usuarioResponse = await axios.get("http://localhost:3300/api/usuario/user");
    usuarioId.value = usuarioResponse.data.id;
    
    const response = await axios.get('http://localhost:3300/api/comunidades');
   
    let comunidadesUnidas = [];
    try {
      const unidasResponse = await axios.get(`http://localhost:3300/api/comunidades/getComunidadesUsuarios/${usuarioId.value}`);
      comunidadesUnidas = unidasResponse.data.map(c => c.idcominidad);
    } catch (error) {
      console.log('No se pudieron cargar las comunidades del usuario:', error);
    }

    comunidades.value = response.data.map(comunidad => ({
      id: comunidad.idcominidad,
      nombre: comunidad.nombreComunidad,
      descripcion: comunidad.descripcionCominidad || 'Sin descripción',
      imagen: "https://images.unsplash.com/photo-1581905764498-f1b60bae943a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      usuarios: Math.floor(Math.random() * 1000) + 100, 
      esMiembro: comunidad.idCreador==usuarioId.value
    }));
    
  } catch (error) {
    console.error('Error al cargar comunidades:', error);
    comunidadesError.value = 'No se pudieron cargar las comunidades. Intenta nuevamente.';
  } finally {
    comunidadesCargando.value = false;
  }
};

onMounted(() => {
  cargarComunidades();
});

const buscar = async (termino) => {
  busquedaTexto.value = termino;
  console.log('Buscando comunidades:', termino);

};

const toggleViewMode = () => {
  viewMode.value = viewMode.value === 'grid' ? 'full' : 'grid';
};

const cambiarFiltro = (filtro) => {
  filtroActual.value = filtro;
  console.log('Filtro cambiado a:', filtro);
  
  // Aquí puedes implementar la lógica de filtrado
  if (filtro === 'Mis comunidades') {
    // Filtrar comunidades donde el usuario es miembro
    console.log('Filtrando mis comunidades');
  } else if (filtro === 'Populares') {
    // Ordenar por número de usuarios
    console.log('Filtrando comunidades populares');
  }
};

// Función para unirse a una comunidad
const unirseAComunidad = async (idComunidad, idUsuario) => {
  try {
    const response = await axios.post('http://localhost:3300/api/comunidades/agregarUsuariosAComunidades', {
      idComunidad: idComunidad,
      idUsuario: idUsuario
    });
    
    return response.data;
  } catch (error) {
    console.error('Error al unirse a la comunidad:', error);
    throw error;
  }
};

// Manejar eventos del grid de comunidades
const handleUnirse = async (comunidad) => {
  console.log('Unirse a comunidad:', comunidad.nombre);
  
  if (!usuarioId.value) {
    alert('No se pudo identificar al usuario. Intenta recargar la página.');
    return;
  }
  
  try {
    await unirseAComunidad(comunidad.id, usuarioId.value);
    
    comunidades.value = comunidades.value.map(c => 
      usuarioId.value === comunidad.idCreador ? { ...c, esMiembro: true } : c
    );
    
    alert(`Te has unido a la comunidad "${comunidad.nombre}"`);
  } catch (error) {
    console.error('Error al unirse a la comunidad:', error);
    
    if (error.response && error.response.status === 409) {
      alert('Ya eres miembro de esta comunidad.');
      comunidades.value = comunidades.value.map(c => 
        c.id === comunidad.id ? { ...c, esMiembro: true } : c
      );
    } else {
      alert('No se pudo unir a la comunidad. Intenta nuevamente.');
    }
  }
};

const handleVerDetalles = (comunidad) => {
  console.log('Ver detalles de comunidad:', comunidad.nombre);
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
      
      <!-- Estados de carga y error -->
      <div v-if="comunidadesCargando" class="loading-section">
        <div class="loading-content">
          <div class="loading-spinner"></div>
          <p>Cargando comunidades...</p>
        </div>
      </div>
      
      <div v-else-if="comunidadesError" class="error-section">
        <div class="error-content">
          <p>{{ comunidadesError }}</p>
          <button @click="cargarComunidades" class="retry-button">
            Reintentar
          </button>
        </div>
      </div>
      
      <div v-else-if="comunidades.length === 0" class="empty-section">
        <div class="empty-content">
          <p>No hay comunidades disponibles</p>
          <p class="empty-subtext">Sé el primero en crear una comunidad</p>
        </div>
      </div>
      
      <!-- Grid de comunidades -->
      <ComunidadesGrid 
        v-else
        :comunidades="comunidades"
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

/* Estados de carga y error */
.loading-section,
.error-section,
.empty-section {
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 24px;
  text-align: center;
}

.loading-content,
.error-content,
.empty-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #3b82f6;
  border-top: 3px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.retry-button {
  padding: 10px 20px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.retry-button:hover {
  background: #2563eb;
}

.empty-subtext {
  color: #9ca3af;
  font-size: 0.9rem;
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