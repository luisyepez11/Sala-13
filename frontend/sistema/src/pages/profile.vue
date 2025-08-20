<script setup>
  import { ref } from "vue"
  import Nav from "../components/navegacio.vue"
  import popularfilmsection from '../components/popularfilmsection.vue'
  import Modal from "../components/modal.vue";
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  const router = useRouter();
  axios.defaults.withCredentials = true;
  const editar=ref(false)
  const listaSolicitudes = ref([])
  const usuarioId = ref("")
  const data = async () =>{
    try {
      const usarioId = await axios.get("http://localhost:3300/api/usuario/user")
      if (usarioId.data.message == "no registrado"){
        router.push('/login');
      }
      const datosSolicitudes = await axios.get(`http://localhost:3300/api/solicitud/solicitudes/${usarioId.data.id}`)
      const unicas = datosSolicitudes.data.filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.idsolicitudes === item.idsolicitudes)
      );
      listaSolicitudes.value = unicas;
      const cuenta = await axios.get(`http://localhost:3300/api/cuenta/getCuenta/${usarioId.data.id}`)
      usuarioId.value=usarioId.data.id
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
    following: 0,
    requests: 0
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
const modalIsOpen = ref(false);
const openModal = () => {
  modalIsOpen.value = true;
};
const closeModal = () => {
  modalIsOpen.value = false;
};
  const solicitudes = () =>{
    openModal()
};
const aceptarSolicitud = async(id,nombre,idsolicitudes) =>{
  try {
      const result = await axios.post(`http://localhost:3300/api/amigo/insertAmigo`,{
          idReceptor:usuarioId.value,
          idUsuario:id,
          idsolicitudes:idsolicitudes
        })
      await data();
    } catch (error) {
      console.log(error)
    }
}
const rechazarSolicitud = async (id,nombre,idsolicitudes) =>{
  try {
    await data();
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <Modal 
      :isOpen="modalIsOpen" 
      @close="closeModal"
      @confirm="handleConfirm"
    >
   <template v-if="listaSolicitudes.length > 0">
    <table class="solicitudes-table">
      <thead>
        <tr>
          <th class="table-header" colspan="2">Solicitud de Seguimiento</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="solicitud in listaSolicitudes" :key="solicitud.idManda" class="table-row">
          <td class="table-data nombre">{{ solicitud.nombremanda }}</td>
          <td class="table-data acciones">
            <button class="btn-aceptar" @click="aceptarSolicitud(solicitud.idManda, solicitud.nombremanda, solicitud.idsolicitudes)">Aceptar</button>
            <button class="btn-rechazar" @click="rechazarSolicitud(solicitud.idManda, solicitud.nombremanda, solicitud.idsolicitudes)">Rechazar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </template>

  <template v-else>
    <div class="sin-solicitudes">
      <p>No tienes solicitudes pendientes</p>
    </div>
  </template>
  </Modal>
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
              <div class="edit-text">Aceptar</div>
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
          <div class="vertical-line"></div>
          <div class="stat-item">
            <div class="stat-number" @click="solicitudes" >{{ stats.requests }}</div>
            <div class="stat-label">requests</div>
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
        <popularfilmsection titulo="Populares" genero=""/>
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
.cancel-button {
  display: none;
}

.modal-actions {
  display: none;
  }
.modal-container {
  width: 95vw;         
  max-width: 400px;     
  max-height: 80vh;     
  padding: 30px;        
  border-radius: 16px;
  background-color: #0f172a;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.modal-close{
  color: #ffffff
}
.solicitudes-table {
  width: 100%;
  border-collapse:collapse; 
  border-spacing: 0; 
  background-color: #091f32;
  border-radius: 16px;
  overflow: hidden;
  border: none;
}
.solicitudes-table th {
  text-align: center;
  vertical-align: middle;
}

.table-data.acciones {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  padding-right: 16px; 
}

.solicitudes-table tr {
  padding: 12px 0;
}

.solicitudes-table td.acciones {
  text-align: center;
}

.solicitudes-table .btn-aceptar,
.solicitudes-table .btn-rechazar {
  display: inline-block;
  min-width: 80px;
  margin: 0px; 
}
  .table-header {
  background-color: #17344e;
  color: #ffffff;
  padding: 12px 16px;
  text-align: left;
  font-family: "Poppins-SemiBold", sans-serif;
  font-size: 14px;
}

.table-row {
  border-bottom: 1px solid #334155;
  transition: background-color 0.2s;
}



.table-row:last-child {
  border-bottom: none;
}

.table-data {
  padding: 10px 16px;
  color: #e5e7eb;
  font-size: 14px;
}

.table-data.nombre {
  font-family: "Poppins-Medium", sans-serif;
  max-width: 150px;         
  white-space: nowrap;    
  overflow: hidden;
  text-overflow: ellipsis;
}


.btn-aceptar, .btn-rechazar {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-family: "Poppins-Medium", sans-serif;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-aceptar {
  background-color: #16a34a;
  color: white;
  transition: background-color 0.2s ease;
}

.btn-aceptar:hover {
  background-color: #22c55e;
}

.btn-rechazar {
  background-color: #be0000;
  color: white;
  transition: background-color 0.2s ease;
}

.btn-rechazar:hover {
  background-color: #ef4444;
}
.sin-solicitudes {
  text-align: center;
  padding: 30px 16px;
  color: #9ca3af;
  font-size: 16px;
  font-family: "Poppins-Regular", sans-serif;
}


  @media (max-width: 640px) {
  .solicitudes-table {
    display: block;
    width: 100%;
    overflow-x: auto;
    font-size: 12px;
  }
  .table-header, .table-data {
    padding: 8px 6px;
    font-size: 12px;
  }
  .table-data.nombre {
    max-width: 80px;
  }
  .btn-aceptar, .btn-rechazar {
    min-width: 60px;
    padding: 6px 8px;
    font-size: 11px;
  }
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