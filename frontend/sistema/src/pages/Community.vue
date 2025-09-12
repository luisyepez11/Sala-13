<script setup>
import Nav from '../components/navegacio.vue'
import carousel from '../components/carousel.vue'
import popularfilmsection from '../components/popularfilmsection.vue'
import Footer from '../components/Footer.vue'
import CommunityChat from '../components/CommunityChat.vue'
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import axios from 'axios'

axios.defaults.withCredentials = true;

const router = useRouter()
const route = useRoute()
const buscador = ref("")
const mostrar = ref(true)
const comunidadesUsuario = ref([])
const cargandoComunidades = ref(true)
const comunidadSeleccionada = ref(null) 

const data = {
  "generos": [
    {"id": 28, "name": "Acción"},
    {"id": 12, "name": "Aventura"},
    {"id": 16, "name": "Animación"},
    {"id": 35, "name": "Comedia"},
    {"id": 80, "name": "Crimen"},
    {"id": 99, "name": "Documental"},
    {"id": 18, "name": "Drama"},
    {"id": 10751, "name": "Familia"},
    {"id": 14, "name": "Fantasía"},
    {"id": 36, "name": "Historia"},
    {"id": 27, "name": "Terror"},
    {"id": 10402, "name": "Música"},
    {"id": 9648, "name": "Misterio"},
    {"id": 10749, "name": "Romance"},
    {"id": 878, "name": "Ciencia ficción"},
    {"id": 10770, "name": "Película de TV"},
    {"id": 53, "name": "Suspense"},
    {"id": 10752, "name": "Bélica"},
    {"id": 37, "name": "Western"}
  ]
}

// Función para obtener las comunidades del usuario
const obtenerComunidadesUsuario = async () => {
  try {
    cargandoComunidades.value = true;
    
    // Primero obtener el ID del usuario
    const usuarioResponse = await axios.get("http://localhost:3300/api/usuario/user");
    const idUsuario = usuarioResponse.data.id;
    
    // Luego obtener las comunidades del usuario
    const response = await axios.get(`http://localhost:3300/api/comunidades/getComunidadesUsuarios/${idUsuario}`);
    
    comunidadesUsuario.value = response.data;
    
    // Seleccionar la primera comunidad por defecto si existe
    if (comunidadesUsuario.value.length > 0) {
      comunidadSeleccionada.value = comunidadesUsuario.value[0];
    }
  } catch (error) {
    console.error('Error al obtener las comunidades del usuario:', error);
    comunidadesUsuario.value = [];
  } finally {
    cargandoComunidades.value = false;
  }
};

// Función para manejar el clic en una comunidad
const handleComunidadClick = (comunidad) => {
  comunidadSeleccionada.value = comunidad;
};

const buscar = (nombre)=>{
    if (nombre==""){
        router.push("/")
    }else{
      router.push("/search/"+nombre)
    }
}

// Cargar comunidades al montar el componente
onMounted(() => {
  obtenerComunidadesUsuario();
});
</script>

<template>
  <div class="home-page-container">
    <!-- Navigation -->
    <Nav :buscar="buscar" />
    <section class="community-container">

            <!-- Main Content -->
        <aside class="sidebar">
            <div class="user-list">
                <!-- Título de la sección -->
                <div class="section-header">
                    <h3 class="section-title">Mis Comunidades</h3>
                </div>
                
                <!-- Estado de carga -->
                <div v-if="cargandoComunidades" class="loading-state">
                    <p>Cargando comunidades...</p>
                </div>
                
                <!-- Estado vacío -->
                <div v-else-if="comunidadesUsuario.length === 0" class="empty-state">
                    <p>No estás en ninguna comunidad</p>
                </div>
                
                <!-- Lista de comunidades -->
                <div 
                    v-for="comunidad in comunidadesUsuario" 
                    :key="comunidad.idcomunidadecuenta"
                    class="user-item"
                    :class="{ 'active': comunidadSeleccionada && comunidadSeleccionada.idcominidad === comunidad.idcominidad }"
                    @click="handleComunidadClick(comunidad)"
                >
                    <div class="avatar-container">
                        <div class="avatar-placeholder">{{ comunidad.nombreComunidad.charAt(0).toUpperCase() }}</div>
                    </div>
                    <div class="user-info">
                        <span class="username">{{ comunidad.nombreComunidad }}</span>
                        <span class="group-name" v-if="comunidad.descripcionCominidad">
                            {{ comunidad.descripcionCominidad }}
                        </span>
                        <span class="group-name" v-else>
                            Sin descripción
                        </span>
                    </div>
                </div>
            </div>
        </aside>
            <!-- Community Chat Section -->
            
            <CommunityChat 
              v-if="comunidadSeleccionada"
              :title="comunidadSeleccionada.nombreComunidad"
              :comunidadId="comunidadSeleccionada.idcominidad"
            />
            <div v-else class="no-chat-selected">
              <p>Selecciona una comunidad para comenzar a chatear</p>
            </div>
        
    </section>
  </div>
  <Footer />
</template>

<style scoped>
.home-page-container {
  background: #091f32;
  height: 100vh;
  color: #ffffff;
  font-family: "Poppins", sans-serif;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.main-content {
    flex-grow: 1;
    width: 100%;
    padding: 0;
    margin: 0;
    overflow: hidden;
}

.hero-section {
  margin-bottom: 3rem;
}

.community-container {
  display: flex;
  flex-direction: row;
  height: calc(100vh - 60px); /* Ajustar altura restando el nav */
  overflow: hidden;
}

.sidebar {
  width: 280px;
  background: #1F2937;
  padding: 0;
  border-right: 1px solid #374151;
  overflow-y: auto;
}

.user-list {
  display: flex;
  flex-direction: column;
}

.section-header {
  padding: 1rem;
  border-bottom: 1px solid #374151;
  background: #111827;
}

.section-title {
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
}

.loading-state, .empty-state {
  padding: 1.5rem 1rem;
  text-align: center;
  color: #9ca3af;
  font-size: 0.9rem;
}

.user-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #374151;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.user-item:hover {
  background-color: #2d3748;
}

.user-item.active {
  background-color: #2b3a6e;
}

.avatar-container {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 0.75rem;
  flex-shrink: 0;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  background: #3b82f6;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: bold;
}

.user-info {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

.username {
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.group-name {
  color: #9ca3af;
  font-size: 0.8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.message-container {
  width: 100%;
  margin: 0 0 1rem 0;
  display: flex;
  flex-direction: column;
}

.message-textarea {
  width: 100%;
  min-height: 80px;
  padding: 0.75rem;
  background: #1F2937;
  color: #ffffff;
  border: 1px solid #374151;
  border-radius: 8px;
  resize: vertical;
  font-family: inherit;
  margin-bottom: 0.75rem;
}

.message-textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
}

.btn-submit {
  align-self: flex-end;
  background: #3b82f6;
  color: #ffffff;
  font-weight: 600;
  padding: 0.5rem 1.25rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-submit:hover {
  background: #2563eb;
}

.trending-section {
  margin-top: 4rem;
  padding: 2rem 0;
}

.page-footer {
  background: #0f172a;
  border-top: 1px solid #334155;
  margin-top: 4rem;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1.5rem 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.footer-section {
  display: flex;
  flex-direction: column;
}

.footer-title {
  color: #ffffff;
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 0.5rem;
}

.footer-link {
  color: #9ca3af;
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #3b82f6;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 50%;
  color: #3b82f6;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: #3b82f6;
  color: white;
  transform: translateY(-2px);
}

.social-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.footer-bottom {
  border-top: 1px solid #334155;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.copyright-text {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
}

.footer-bottom-links {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.footer-bottom-link {
  color: #6b7280;
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.3s ease;
}

.footer-bottom-link:hover {
  color: #3b82f6;
}

.separator {
  color: #6b7280;
  font-size: 0.875rem;
}

/* Responsive Design */
@media (max-width: 1024px) {
  
  .section-title {
    font-size: 1.875rem;
  }
}

@media (max-width: 768px) {
  .community-container {
    flex-direction: column;
    height: auto;
  }

  .sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #374151;
  }

  .main-content {
    width: 100%;
    padding: 1.5rem 1rem;
  }
  
  .hero-section {
    margin-bottom: 2rem;
  }
  
  .footer-content {
    padding: 2rem 1rem 1.5rem;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  
  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }
}

@media (max-width: 640px) {
  
  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }
  
  .social-links {
    justify-content: center;
  }
  
  .footer-bottom-links {
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .separator {
    display: none;
  }
}

@media (max-width: 360px) {
  .footer-content {
    padding: 1.5rem 0.75rem 1rem;
  }
}
</style>