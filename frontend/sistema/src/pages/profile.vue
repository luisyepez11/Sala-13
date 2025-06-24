<script setup>
  import { ref } from "vue"
  import Nav from "../components/navegacio.vue"
  import Cart from "../components/pelicula.vue"
  const props = defineProps({
    usuario: {
      type: Object,
      default: () => ({
        nombre: "Usuario1",
        pronombres: "He/Him",
        nombreReal: "Real Name",
        biografia: "Here Goes The User's Biography. Extra Info. About The User"
      })
    }
  });

  console.log(props.usuario)

  const activeTab = ref("Profile")
  const tabs = ["Profile", "Lists", "Likes", "Reviews", "Communities", "Watched"]

  const stats = ref({
    watched: 0,
    likes: 0,
    reviews: 0,
    followers: 0,
    following: 0
  })

  const favoriteMovies = ref([
    { id: 1, title: "Dragon", poster: "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2020/12/alien-octavo-pasajero-2181597.jpg?tf=828x" },
    { id: 2, title: "The Hunger Games", poster: "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2020/12/alien-octavo-pasajero-2181597.jpg?tf=828x" },
    { id: 3, title: "Dune", poster: "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2020/12/alien-octavo-pasajero-2181597.jpg?tf=828x" },
    { id: 4, title: "X", poster: "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2020/12/alien-octavo-pasajero-2181597.jpg?tf=828x" }
  ])

  function editarPerfil() {
    alert("Editando perfil de usuario")
  }

  function cambiarTab(tab) {
    activeTab.value = tab
  }
</script>

<template>
  <div class="perfil-container">
    <!-- Header Navigation -->
    <Nav></Nav>

    <!-- Main Content -->
    <div class="main-content">
      <!-- Profile Section -->
      <div class="profile-section">
        <div class="profile-info">
          <!-- Avatar -->
          <div class="avatar-section">
            <div class="avatar-container">
              <svg class="avatar-icon" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
              </svg>
            </div>
            <button class="edit-button" @click="editarPerfil">
              <div class="edit-text">Edit</div>
            </button>
          </div>
          
          <!-- User Details -->
          <div class="user-details">
            <div class="user-name">{{ props.usuario.nombre }}</div>
            <div class="user-pronouns">{{ props.usuario.pronombres }}</div>
            <div class="user-real-name">{{ props.usuario.nombreReal }}</div>
            <div class="user-bio">{{ props.usuario.biografia }}</div>
          </div>
        </div>

        <!-- Stats -->
        <div class="stats-container">
          <div class="stat-item">
            <div class="stat-number">{{ stats.watched }}</div>
            <div class="stat-label">watched</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{ stats.likes }}</div>
            <div class="stat-label">likes</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{ stats.reviews }}</div>
            <div class="stat-label">reviews</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{ stats.followers }}</div>
            <div class="stat-label">followers</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{ stats.following }}</div>
            <div class="stat-label">following</div>
          </div>
        </div>
      </div>

      <!-- Navigation Tabs -->
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

      <!-- Content Area -->
      <div v-if="activeTab === 'Profile'" class="content-area">
        <!-- Favorite Movies Section -->
        <div class="movies-section">
          <div class="section-title">Favorite Movies</div>
          <div class="movies-grid">
            <div 
              v-for="movie in favoriteMovies" 
              :key="movie.id"
              class="movie-card"
            >
              <Cart :poster=movie.poster :title=movie.title :Id=movie.id ></Cart>
            </div>
          </div>
        </div>
      </div>

      <!-- Other tab content -->
      <div v-else class="empty-content">
        <div class="empty-text">Contenido de {{ activeTab }} próximamente...</div>
      </div>
    </div>
  </div>
</template>

<style>


.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px;
}

.profile-section {
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-bottom: 32px;
}

.profile-info {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.avatar-section {
  flex-shrink: 0;
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

.avatar-icon {
  width: 64px;
  height: 64px;
  color: #6b7280;
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

.movies-section {
  position: relative;
}

.section-title {
  color: #ffffff;
  font-family: "Poppins-SemiBold", sans-serif;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 24px;
}

.empty-content {
  text-align: center;
  padding: 48px 0;
}

.empty-text {
  color: #9ca3af;
  font-size: 16px;
}

@media (max-width: 768px) {
  .profile-info {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .stats-container {
    justify-content: center;
  }
  
  .movies-grid {
    grid-template-columns: repeat(2, 1fr);
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