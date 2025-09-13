<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import Modal from "../components/modal.vue"

const router = useRouter()

const props = defineProps({
  comunidades: {
    type: Array,
    default: () => []
  },
  viewMode: {
    type: String,
    default: 'grid', // 'grid' o 'full'
    validator: (value) => ['grid', 'full'].includes(value)
  }
});

const emit = defineEmits(['unirse', 'verDetalles']);
const comunidadSeleccionada = ref(null)
// Datos de ejemplo para las comunidades
const comunidadesEjemplo = ref([
  {
    id: 1,
    nombre: 'Comunidad1',
    descripcion: 'Una comunidad dedicada a los amantes del cine clásico y las películas de culto. Aquí discutimos desde Hitchcock hasta Tarantino.',
    miembros: 1250,
    imagen: '/src/assets/logo.png',
    unido: false
  },
  {
    id: 2,
    nombre: 'Comunidad2',
    descripcion: 'Espacio para cinéfilos que buscan descubrir joyas ocultas del séptimo arte y compartir recomendaciones únicas.',
    miembros: 890,
    imagen: '/src/assets/logo.png',
    unido: true
  },
  {
    id: 3,
    nombre: 'Comunidad3',
    descripcion: 'Comunidad enfocada en el análisis profundo de películas independientes y documentales premiados internacionalmente.',
    miembros: 2100,
    imagen: '/src/assets/logo.png',
    unido: false
  },
  {
    id: 4,
    nombre: 'Comunidad4',
    descripcion: 'Para los fanáticos de la ciencia ficción y el terror. Desde clásicos de los 80 hasta las últimas producciones del género.',
    miembros: 1750,
    imagen: '/src/assets/logo.png',
    unido: false
  },
  {
    id: 5,
    nombre: 'Comunidad5',
    descripcion: 'Comunidad multicultural que celebra el cine internacional, desde el cine francés hasta las producciones asiáticas más aclamadas.',
    miembros: 950,
    imagen: '/src/assets/logo.png',
    unido: true
  },
  {
    id: 6,
    nombre: 'Comunidad6',
    descripcion: 'Espacio dedicado a los cortometrajes y el cine experimental. Perfecto para creadores emergentes y amantes del arte audiovisual.',
    miembros: 680,
    imagen: '/src/assets/logo.png',
    unido: false
  },
  {
    id: 7,
    nombre: 'Comunidad7',
    descripcion: 'Comunidad para discutir series de televisión, desde dramas épicos hasta comedias contemporáneas y producciones de streaming.',
    miembros: 3200,
    imagen: '/src/assets/logo.png',
    unido: false
  },
  {
    id: 8,
    nombre: 'Comunidad8',
    descripcion: 'Enfocada en el cine de animación, desde los clásicos de Disney hasta las últimas producciones de Pixar y estudios independientes.',
    miembros: 1450,
    imagen: '/src/assets/logo.png',
    unido: true
  }
]);

const comunidadesActuales = computed(() => {
  return props.comunidades.length > 0 ? props.comunidades : comunidadesEjemplo.value;
});

const unirse = (comunidad) => {
  // Actualizar estado local para demo
  const index = comunidadesEjemplo.value.findIndex(c => c.id === comunidad.id);
  event.target.disabled = true;
  if (index !== -1) {
    comunidadesEjemplo.value[index].unido = !comunidadesEjemplo.value[index].unido;
  }
  emit('unirse', comunidad);
};

const verDetalles = (comunidad) => {
  comunidadSeleccionada.value = comunidad;
  console.log(comunidadSeleccionada)
  abrirModal();
  emit('verDetalles', comunidad);
};

const modalDetalle = ref(false);
const abrirModal = () =>{
      modalDetalle.value=true
}
const cerrarModal = () =>{
      modalDetalle.value=false
}
const navegationToMessage = ()=>{
  router.push('/community');
}
</script>

<template>
  <Modal 
  :isOpen="modalDetalle" 
  @close="cerrarModal"
  
>
        <div class="comunidad-image-container">
          <div class="comunidad-avatar">
            <svg class="avatar-icon" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
            </svg>
          </div>
        </div>

        <!-- Contenido de la tarjeta -->
        <div class="comunidad-content">
          <div class="comunidad-header">
            
            <h3 class="comunidad-nombre">{{ comunidadSeleccionada.nombre }}</h3>
            <p class="comunidad-miembros">{{ comunidadSeleccionada.miembros?.toLocaleString() || 'N/A' }} miembros</p>
            <p>{{comunidadSeleccionada.descripcion}}</p>
          </div>
            

          <!-- Botones de acción -->
          <div class="comunidad-actions">
            <button 
              @click="$event.target.disabled = true" 
              :class="['action-button', 'join-button']"
            >Unirse
            </button>
          </div>
        </div>
</Modal>
  <div class="comunidades-container">
    <div :class="['comunidades-grid', { 'grid-mode': viewMode === 'grid', 'full-mode': viewMode === 'full' }]">
      <div 
        v-for="comunidad in comunidadesActuales" 
        :key="comunidad.id" 
        :class="['comunidad-card', { 'card-grid': viewMode === 'grid', 'card-full': viewMode === 'full' }]"
        
      >
        <!-- Imagen de la comunidad -->
        <div class="comunidad-image-container">
          <div class="comunidad-avatar">
            <svg class="avatar-icon" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
            </svg>
          </div>
        </div>

        <!-- Contenido de la tarjeta -->
        <div class="comunidad-content">
          <div class="comunidad-header">
            <h3 class="comunidad-nombre">{{ comunidad.nombre }}</h3>
            <p class="comunidad-miembros">{{ comunidad.cantidad_usuarios || 'N/A' }} miembros</p>
          </div>

          <!-- Descripción solo en modo full -->
          <div v-if="viewMode === 'full'" class="comunidad-descripcion">
            <p>{{ comunidad.descripcion }}</p>
          </div>

          <!-- Botones de acción -->
          <div class="comunidad-actions">
            <button 
              @click="unirse(comunidad)"
              :class="['action-button', 'join-button', { 'joined': comunidad.unido }]"
            >
              {{ comunidad.unido ? 'Unido' : 'Unirse' }}
            </button>
  
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.comunidades-container {
  padding: 20px;
  background: #091f32;
  min-height: 100vh;
}

.comunidades-grid {
  display: grid;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.grid-mode {
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}

.full-mode {
  grid-template-columns: 1fr;
}

.comunidad-card {
  background: #10246f;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid #3b82f6;
}

.comunidad-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
}

.card-grid {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-full {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  min-height: 120px;
}

.comunidad-image-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-grid .comunidad-image-container {
  padding: 30px 20px 20px;
}

.card-full .comunidad-image-container {
  margin-right: 20px;
  flex-shrink: 0;
}
.join-button:disabled {
  background-color: #4a4a4a;
  color: #ccc;
  cursor: not-allowed;
  opacity: 0.8;
  transition: background-color 0.3s ease;
}


.comunidad-avatar {
  width: 80px;
  height: 80px;
  background: #d1d5db;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.card-full .comunidad-avatar {
  width: 60px;
  height: 60px;
}

.comunidad-avatar:hover {
  background: #f3f4f6;
  transform: scale(1.05);
}

.avatar-icon {
  width: 40px;
  height: 40px;
  color: #6b7280;
}

.card-full .avatar-icon {
  width: 30px;
  height: 30px;
}

.comunidad-content {
  padding: 0 20px 30px;
  display: flex;

  flex-direction: column;
  flex-grow: 1;
}

.card-full .comunidad-content {
  padding: 0;
  flex-grow: 1;
}

.comunidad-header {
  text-align: center;
  margin-bottom: 15px;
}

.card-full .comunidad-header {
  text-align: left;
  margin-bottom: 10px;
}

.comunidad-nombre {
  font-size: 1.25rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 8px 0;
}

.card-full .comunidad-nombre {
  font-size: 1.5rem;
  margin: 0 0 5px 0;
}

.comunidad-miembros {
  font-size: 1rem;
  color: #d1d5db;
  margin: 0;
}

.comunidad-descripcion {
  margin-bottom: 15px;
}

.comunidad-descripcion p {
  color: #d1d5db;
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;
}

.comunidad-actions {
  display: flex;
  gap: 10px;
  margin-top: auto;
}

.card-full .comunidad-actions {
  margin-top: 0;
  margin-left: auto;
  flex-shrink: 0;
}

.action-button {
  flex: 1;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.card-full .action-button {
  flex: none;
  min-width: 80px;
}

.join-button {
  background: #3b82f6;
  color: #ffffff;
}

.join-button:hover {
  background: #2563eb;
  transform: translateY(-1px);
}

.join-button.joined {
  background: #10b981;
  color: #ffffff;
}

.join-button.joined:hover {
  background: #059669;
}

.details-button {
  background: transparent;
  color: #d1d5db;
  border: 1px solid #4b5563;
}

.details-button:hover {
  background: #374151;
  color: #ffffff;
  transform: translateY(-1px);
}

/* Responsive design */
@media (max-width: 768px) {
  .comunidades-container {
    padding: 15px;
  }
  
  .grid-mode {
    grid-template-columns: 1fr;
  }
  
  .card-full {
    flex-direction: column;
    text-align: center;
  }
  
  .card-full .comunidad-image-container {
    margin-right: 0;
    margin-bottom: 15px;
  }
  
  .card-full .comunidad-header {
    text-align: center;
  }
  
  .card-full .comunidad-actions {
    margin-left: 0;
    width: 100%;
  }
  
  .card-full .action-button {
    flex: 1;
  }
}
</style>