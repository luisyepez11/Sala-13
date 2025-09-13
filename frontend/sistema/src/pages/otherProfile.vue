<script setup>
import { ref, onMounted } from "vue"
import { useRouter, useRoute } from 'vue-router'

import axios from 'axios'

import Nav from "../components/navegacio.vue"
import popularfilmsection from '../components/popularfilmsection.vue'
import Modal from "../components/modal.vue"
import Footer from '../components/Footer.vue'
import UserReviewCard from '../components/UserReviewCard.vue'

const router = useRouter()
const route = useRoute()

const editar = ref(false)
const reviews = ref([])
const isLoadingReviews = ref(false)
const activeTab = ref("Profile")
const modalIsOpen = ref(false)
const usuario = ref({
  nombre: "Usuario1",
  pronombres: "He/Him",
  nombreReal: "Real Name", 
  biografia: "Bio del usuario",
  cantidad_solicitudes: 0,
  total_seguidos: 0,
  total_seguidores: 0,
  total_comentarios: 0,
  fotoPerfil: "/src/assets/perfilGen.png"
})
const stats = ref({
  watched: 0,
  likes: 0,
  reviews: 0,
  followers: 0,
  following: 0,
  requests: 0
})

const tabs = ["Profile", "Lists", "Likes", "Reviews", "Communities", "Watched"]

const userId = route.params.id

axios.defaults.withCredentials = true

async function loadUserData() {
  try {
    const usarioId = await axios.get("http://localhost:3300/api/usuario/user")
    usuario.value.id = usarioId.data.id
    if (usarioId.data.message == "no registrado") {
      router.push('/login')
      return
    }
    
    const cuenta = await axios.get(`http://localhost:3300/api/cuenta/getCuenta/${userId}`)
    const datos = cuenta.data.resultCuenta[0]
    usuario.value.nombre = datos.nombreCuenta
    usuario.value.pronombres = datos.pronombres
    usuario.value.nombreReal = datos.nombreReal
    usuario.value.biografia = datos.descripcionCuenta
    usuario.value.fotoPerfil = datos.fotoPerfil || "/src/assets/perfilGen.png"
    usuario.value.cantidad_solicitudes = datos.total_solicitudes
    usuario.value.total_seguidos = datos.total_seguidos
    usuario.value.total_seguidores = datos.total_seguidores
    usuario.value.total_comentarios = datos.total_comentarios
  } catch (error) {
    console.log(error)
  }  
}

async function loadUserReviews() {
  if (reviews.value.length > 0) return
  
  isLoadingReviews.value = true
  try {
    const response = await axios.get(`http://localhost:3300/api/comentario/getComentariosUsuario/${userId}`)
    
    const reseñasTransformadas = response.data.map(comentario => ({
      id: comentario.idcomentario,
      user: {
        name: comentario.nombreCuenta,
        avatar: usuario.value.fotoPerfil || "/src/assets/perfilGen.png"
      },
      movie: {
        title: comentario.nombrePelicula,
        poster: `https://image.tmdb.org/t/p/w500`,
        idPelicula: comentario.idPelicula
      },
      rating: comentario.calificacion || 0,
      reviewText: comentario.comentario,
      likes: 0,
      fecha: comentario.fecha
    }))
    
    const reseñasOrdenadas = reseñasTransformadas.sort((a, b) => {
      return new Date(b.fecha) - new Date(a.fecha)
    })
    
    reviews.value = reseñasOrdenadas
  } catch (error) {
    console.error('Error al cargar reseñas:', error)
    reviews.value = []
  } finally {
    isLoadingReviews.value = false
  }
}

async function seguirPerfil() {
  try {
    const result = await axios.post(`http://localhost:3300/api/solicitud/solicitudAmigo`, {
      idReceptor: userId,
      idUsuario: usuario.value.id
    })
  } catch (error) {
    console.log(error)
  }
}

function cambiarTab(tab) {
  activeTab.value = tab
  if (tab === 'Reviews') {
    loadUserReviews()
  }
}

function openModal() {
  modalIsOpen.value = true
}

function closeModal() {
  modalIsOpen.value = false
}

function solicitudes() {
  alert("funcionando")
  openModal()
}

function buscar(nombre) {
  if (nombre === "") {
    router.push("/")
  } else {
    router.push("/search/" + nombre)
  }
}

onMounted(() => {
  loadUserData()
})
</script>

<template>
  <Modal 
      :isOpen="modalIsOpen" 
      @close="closeModal"
      @confirm="handleConfirm"
    >
    
  </Modal>
  <div class="perfil-container">
    <Nav :buscar="buscar" ></Nav>

    <div class="main-content">
      <div class="profile-section">
        <div class="profile-info">
          <!-- Avatar -->
          <div class="avatar-section">
            <div class="avatar-container">
              <img 
                v-if="usuario.fotoPerfil && usuario.fotoPerfil !== '/src/assets/perfilGen.png'" 
                :src="usuario.fotoPerfil" 
                :alt="usuario.nombre"
                class="avatar-image"
              />
              <img 
                v-else
                src="/src/assets/perfilGen.png" 
                :alt="usuario.nombre"
                class="avatar-image"
              />
            </div>
            <button v-if="!editar" class="edit-button" @click="seguirPerfil">
              <div class="edit-text">seguir</div>
            </button>
          </div>
          
          <div v-if="!editar" class="user-details">
            <div class="user-name">{{ usuario.nombre }}</div>
            <div v-if="false" class="user-pronouns">{{ usuario.pronombres }}</div>
            <div class="user-real-name">{{ usuario.nombreReal }}</div>
            <div class="user-bio">{{ usuario.biografia }}</div>
          </div>
        </div>

        <!-- Stats -->
        <div class="stats-container">
          <div class="stat-item">
            <div class="stat-number">{{ stats.watched }}</div>
            <div class="stat-label">watched</div>
          </div>
          <div class="vertical-line"></div>
          <div class="stat-item">
            <div class="stat-number">{{ stats.likes }}</div>
            <div class="stat-label">likes</div>
          </div>
          <div class="vertical-line"></div>
          <div class="stat-item">
            <div class="stat-number">{{ usuario.total_comentarios }}</div>
            <div class="stat-label">reviews</div>
          </div>
          <div class="vertical-line"></div>
          <div class="stat-item">
            <div class="stat-number">{{ usuario.total_seguidores }}</div>
            <div class="stat-label">followers</div>
          </div>
          <div class="vertical-line"></div>
          <div class="stat-item">
            <div class="stat-number">{{ usuario.total_seguidos }}</div>
            <div class="stat-label">following</div>
          </div>
          <div class="vertical-line"></div>
          <div class="stat-item">
            <div class="stat-number" @click="solicitudes">{{ usuario.cantidad_solicitudes }}</div>
            <div class="stat-label">requests</div>
          </div>
        </div>
      </div>

      <div class="tabs-nav">
        <div class="tabs-container">
          <button 
            v-for="tab in tabs" 
            :key="tab"
            @click="cambiarTab(tab)"
            :class="['tab-button', activeTab === tab ? 'tab-active' : 'tab-inactive']"
          >
            {{ tab }}
          </button>
        </div>
      </div>

      <div v-if="activeTab === 'Profile'" class="content-area">
        <popularfilmsection />
      </div>

      <div v-else-if="activeTab === 'Reviews'" class="content-area">
        <div v-if="isLoadingReviews" class="loading-state">
          <div class="loading-text">Cargando reseñas...</div>
        </div>
        <div v-else-if="reviews.length === 0" class="empty-reviews">
          <div class="empty-text">Este usuario no ha escrito reseñas aún.</div>
        </div>
        <div v-else class="reviews-container">
          
          <div class="reviews-list">
            <UserReviewCard 
              v-for="review in reviews" 
              :key="review.id" 
              :review="review" 
            />
          </div>
        </div>
      </div>

      <div v-else class="empty-content">
        <div class="empty-text">Contenido de {{ activeTab }} próximamente...</div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<style>
.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px;
}

.profile-section {
  display: flex;
  align-items: center;
  gap: 10rem;
  padding: auto;
  flex-direction: row;
  margin-bottom: 2rem;
}

.profile-info {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.avatar-section {
  flex-shrink: 0;
  text-align: center;
}

.avatar-container {
  width: 128px;
  height: 128px;
  background: #9ca3af;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.edit-button {
  background: #3b82f6;
  border: none;
  border-radius: 6px;
  padding: 12px 24px;
  margin-top: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.edit-button:hover {
  background: #2563eb;
}

.edit-text {
  color: #ffffff;
  font-family: "Poppins-SemiBold", sans-serif;
  font-size: 14px;
  font-weight: 600;
}

.user-details {
  flex: 1;
}

.user-name {
  color: #ffffff;
  font-family: "Poppins-SemiBold", sans-serif;
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 8px;
}

.user-pronouns {
  color: #9ca3af;
  font-size: 14px;
  margin-bottom: 4px;
}

.user-real-name {
  color: #9ca3af;
  font-size: 14px;
  margin-bottom: 16px;
}

.user-bio {
  color: #d1d5db;
  font-size: 14px;
  line-height: 1.5;
  max-width: 400px;
}

.stats-container {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 24px;
  font-weight: 600;
  color: #ffffff;
}

.stat-label {
  color: #9ca3af;
  font-size: 12px;
  margin-top: 4px;
}

.vertical-line {
  border-right: 1px solid #ffffff;
  height: 3rem;
}

.tabs-nav {
  border-bottom: 1px solid #334155;
  margin-bottom: 32px;
}

.tabs-container {
  display: flex;
  gap: 32px;
}

.tab-button {
  padding: 16px 4px;
  border: none;
  background: none;
  border-bottom: 2px solid transparent;
  font-family: "Poppins-Regular", sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.tab-active {
  border-bottom-color: #3b82f6;
  color: #ffffff;
}

.tab-inactive {
  color: #9ca3af;
}

.tab-inactive:hover {
  color: #d1d5db;
}

.content-area {
  position: relative;
}

.empty-content {
  text-align: center;
  padding: 48px 0;
}

.empty-text {
  color: #9ca3af;
  font-size: 16px;
}

.loading-state {
  text-align: center;
  padding: 48px 0;
}

.loading-text {
  color: #9ca3af;
  font-size: 16px;
}

.empty-reviews {
  text-align: center;
  padding: 48px 0;
}

.reviews-container {
  width: 100%;
}

.reviews-header {
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #334155;
}

.reviews-title {
  color: #ffffff;
  font-family: "Poppins-SemiBold", sans-serif;
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.reviews-count {
  color: #9ca3af;
  font-size: 14px;
}

.reviews-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

@media (max-width: 768px) {
  .profile-info {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .profile-section {
    flex-direction: column;
    gap: 1rem;
  }
  
  .stats-container {
    justify-content: center;
  }
  
  .nav-content {
    flex-direction: column;
    height: auto;
    padding: 16px 24px;
    gap: 16px;
  }
  
  .search-container {
    margin: 0;
    max-width: none;
  }
}
</style>
