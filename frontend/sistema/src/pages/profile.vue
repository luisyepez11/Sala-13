<script setup>
  import { ref } from "vue"
  import Nav from "../components/navegacio.vue"
  import popularfilmsection from '../components/popularfilmsection.vue'
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  const router = useRouter();
  axios.defaults.withCredentials = true;
  const editar=ref(false)

  const data = async () =>{
    try {
      const usarioId = await axios.get("http://localhost:3300/api/usuario/user")
      if (usarioId.data.message == "no registrado"){
        router.push('/login');
      }
      const cuenta = await axios.get(`http://localhost:3300/api/cuenta/getCuenta/${usarioId.data.id}`)
      const datos = cuenta.data.resultCuenta[0]
      console.log(usuario.value = {
        ...usuario.value,
          nombre: datos.nombreCuenta,
          pronombres: datos.pronombres,
          nombreReal: datos.nombreReal, 
          biografia: datos.descripcionCuenta
      })
    } catch (error) {
      console.log("error")
    }  
  }
  data()
  const usuario = ref({
  nombre: "Usuario1",
  pronombres: "He/Him",
  nombreReal: "Real Name", 
  biografia: "Bio del usuario"
});



  const activeTab = ref("Profile")
  const tabs = ["Profile", "Lists", "Likes", "Reviews", "Communities", "Watched"]

  const stats = ref({
    watched: 0,
    likes: 0,
    reviews: 0,
    followers: 0,
    following: 0
  })

  function editarPerfil() {
    editar.value=true
  }
  async function aceptareditar (){
    try {
      const usarioId = await axios.get("http://localhost:3300/api/usuario/user")
      const result = await axios.put(`http://localhost:3300/api/cuenta/${usarioId.data.id}`,{
       nombreReal:document.getElementById('nombre').value
      ,descripcionCuenta:document.getElementById('descripcion').value
      ,nombreCuenta:document.getElementById('apodo').value
      })
    } catch (error) {
      
    }
    editar.value=false
    data()
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
            <button v-if="!editar" class="edit-button" @click="editarPerfil">
              <div class="edit-text">Edit</div>
            </button>
            <button v-if="editar" class="edit-button" @click="aceptareditar">
              <div class="edit-text">aceptar</div>
            </button>
          </div>
          
          <!-- User Details -->
          <div v-if="!editar" class="user-details">
            <div class="user-name">{{ usuario.nombre }}</div>
            <div  v-if="false" class="user-pronouns">{{ usuario.pronombres }}</div>
            <div class="user-real-name">{{ usuario.nombreReal }}</div>
            <div class="user-bio">{{ usuario.biografia }}</div>
          </div>
          <div v-if="editar" class="user-details">
            <div class="user-name"><input type="text" placeholder="Nombre de la cuenta" id="nombre"></div>
            <div v-if="false" class="user-pronouns"><section><option value=""></option></section></div>
            <div class="user-real-name"><input type="text" id="apodo" placeholder="apodo"></div>
            <div class="user-bio"><input type="text" id="descripcion" placeholder="descripcion"></div>
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
            <div class="stat-number">{{ stats.reviews }}</div>
            <div class="stat-label">reviews</div>
          </div>
          <div class="vertical-line"></div>
          <div class="stat-item">
            <div class="stat-number">{{ stats.followers }}</div>
            <div class="stat-label">followers</div>
          </div>
          <div class="vertical-line"></div>
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
        <!-- Popular Films Section - Igual que en Home -->
        <popularfilmsection />
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