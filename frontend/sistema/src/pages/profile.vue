<script setup>
  import { ref } from "vue"
  import Nav from "../components/navegacio.vue"
  import popularfilmsection from '../components/popularfilmsection.vue'
  import Modal from "../components/modal.vue";
  import ListasGrid from "../components/ListasGrid.vue";
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  const router = useRouter();
  axios.defaults.withCredentials = true;
  const editar=ref(false)
  const listaSolicitudes = ref()
  const  lista = ref({})
  const usuarioId = ref("")
  const nombreLista = ref("")
  const descripcion = ref("")
  const data = async () =>{
    try {
      const usarioId = await axios.get("http://localhost:3300/api/usuario/user")
      if (usarioId.data.message == "no registrado"){
        router.push('/');
      }
      const datosSolicitudes = await axios.get(`http://localhost:3300/api/solicitud/solicitudes/${usarioId.data.id}`)
      listaSolicitudes.value=datosSolicitudes.data
      const cuenta = await axios.get(`http://localhost:3300/api/cuenta/getCuenta/${usarioId.data.id}`)
      const listas = await axios.get(`http://localhost:3300/api/lista/getListasUsuarios/${usarioId.data.id}`)
      usuarioId.value=usarioId.data.id
      const datos = cuenta.data.resultCuenta[0]
      lista.value = listas.data
      console.log(lista.value)
      const unicas = datosSolicitudes.data.filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.idsolicitudes === item.idsolicitudes)
      );
      listaSolicitudes.value = unicas;
      usuarioId.value=usarioId.data.id
      console.log(usuario.value = {
        ...usuario.value,
          nombre: datos.nombreCuenta,
          pronombres: datos.pronombres,
          nombreReal: datos.nombreReal, 
          biografia: datos.descripcionCuenta,
          cantidad_solicitudes:datos.total_solicitudes,
          total_seguidos:datos.total_seguidos,
          total_seguidores:datos.total_seguidores,
          total_comentarios:datos.total_comentarios
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
    alert("funcionando")
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
    alert("oka"+nombre)
  } catch (error) {
    
  }
}
const modalCrearListas = ref(false);
const abrirModal = () =>{
      modalCrearListas.value=true
}
const cerrarModal = () =>{
      modalCrearListas.value=false
}
const crearLista = async() => {
  try {
    console.log("Intentando crear lista:", nombreLista.value, descripcion.value); 
    
    const result = await axios.post(`http://localhost:3300/api/lista`, {
      nombreLista: nombreLista.value, 
      descripcion: descripcion.value, 
      idCuenta: usuarioId.value 
    });
    
    console.log("Lista creada exitosamente:", result.data);
 
    cerrarModal();
    nombreLista.value = "";
    descripcion.value = "";
    
    data();
    
  } catch (error) {
    console.error("Error creando lista:", error);
  }
}
</script>

<template>
  <Modal 
  :isOpen="modalCrearListas" 
  @close="cerrarModal"
>
  <div class="modal-crear-lista">
    <h2 class="modal-title">Crear nueva lista</h2>

    <div class="form-group">
      <label class="user-bio" for="nombreLista">Nombre de la lista</label>
      <input 
        id="nombreLista" 
        type="text" 
        v-model="nombreLista" 
        placeholder="Ejemplo: Terror" 
        class="input-field"
      />
    </div>

    <div class="form-group">
      <label class="user-bio" for="descripcion">Descripción</label>
      <textarea 
        id="descripcion" 
        v-model="descripcion" 
        placeholder="Describe tu lista..." 
        class="input-field textarea"
      ></textarea>
    </div>

    <div class="modal-btn">
      <button class="btn-cancel" @click="cerrarModal">Cancelar</button>
      <button class="btn-crear" @click="crearLista">Crear</button>
    </div>
  </div>
</Modal>
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
            <div class="stat-number" @click="solicitudes" >{{ usuario.cantidad_solicitudes }}</div>
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

      <!-- Listas -->
      <div v-else-if="activeTab === 'Lists'" class="content-area">
        <!-- Caso: No hay listas -->
        <div v-if="!lista || lista.length === 0" class="listas-vacias">
          <div class="lista-card create-card" @click="abrirModal">
            <div class="lista-info">
              <h2 class="lista-title">+ Crear nueva lista</h2>
              <p class="lista-description">Empieza a organizar tus películas</p>
            </div>
          </div>
        </div>

        <!-- Caso: Sí hay listas -->
        <div v-else class="listas-contenedor">
          <div
            v-for="listas in lista"
            :key="listas.idlista"
            class="lista-card"
            @click="$router.push('/listDetail/' + listas.idlista)"
          >
            <!-- Portada de la lista -->
            <div class="lista-portada">
              <img :src="listas.portada || '/img/placeholder.jpg'" alt="Portada de la lista" />
            </div>

            <!-- Info de la lista -->
            <div class="lista-info">
              <h2 class="lista-title">{{ listas.nombreLista }}</h2>
              <p class="lista-description">{{ listas.descripcion }}</p>
            </div>
          </div>

          <!-- Botón para crear nueva lista -->
          <div class="lista-card create-card" @click="abrirModal">
            <div class="lista-info">
              <h2 class="lista-title">+ Crear nueva lista</h2>
              <p class="lista-description">Empieza a organizar tus películas</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Otros tabs -->
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
.movies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
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
.lista-portada {
  width: 100%;
  height: 250px;
  object-fit: cover;
  overflow: hidden;
  border-bottom: 1px solid #334155;
}

.lista-portada img {
  width: 100%;
  height: 100%;
  object-fit: cover; 
  display: block;
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
.listas-contenedor {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
}

.lista-card {
  background: #1f2937;
  border-radius: 12px;
  overflow: hidden;
  width: 200px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  cursor: pointer;
}

.lista-card:hover {
  transform: translateY(-5px);
}

.lista-info {
  padding: 10px;
  color: #ffffff;
}

.lista-title {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  text-align: center;
}

.lista-description {
  font-size: 0.9rem;
  color: #9ca3af;
text-overflow: ellipsis
}

.create-card {
  background: rgba(75, 85, 99, 0.3);
  width: 200px;
  height: 355px;
  border: 2px dashed #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.create-card:hover {
  background: rgba(75, 85, 99, 0.5);
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
  font-family: "Poppins-Regular", sans-serif;;
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
.modal-crear-lista {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  font-family: "Poppins-Regular", sans-serif;;
}

.modal-title {
  font-size: 20px;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 10px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  color: #9ca3af;
  font-size: 14px;
}

.input-field {
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #334155;
  background-color: #1f2937;
  color: #ffffff;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
  font-family: "Poppins-Regular", sans-serif;;
}

.input-field:focus {
  border-color: #3b82f6;
}

.input-field.textarea {
  resize: vertical;
  min-height: 80px;
  font-family: "Poppins-Regular", sans-serif;;
}

.modal-btn {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;
}

.btn-cancel,
.btn-crear {
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  border: none;
  transition: background 0.2s;
}

.btn-cancel {
  background-color: #4b5563;
  color: white;
}

.btn-cancelar:hover {
  background-color: #6b7280;
}

.btn-crear {
  background-color: #3b82f6;
  color: white;
}

.btn-crear:hover {
  background-color: #2563eb;
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

.listas-vacias {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

.listas-contenedor {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
}


.btn-crear-lista-inline {
  height: fit-content;
  align-self: center;
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
  .tabs-container {
    overflow-x: auto;
    gap: 16px;
  }
  .tab-button {
    flex: 0 0 auto;
  }
  .vertical-line {
    display: none;
  }
  .main-content {
    padding: 16px 12px;
  }
  .profile-section {
    gap: 2rem;
  }
  .avatar-container {
    width: 96px;
    height: 96px;
  }
  .avatar-icon {
    width: 48px;
    height: 48px;
  }
  .user-name {
    font-size: 24px;
  }
  .stat-number {
    font-size: 20px;
  }
  .stat-label {
    font-size: 10px;
  }
  .edit-button {
    padding: 8px 16px;
    font-size: 12px;
  }
  .edit-text {
    font-size: 12px;
  }
  .stats-container {
    gap: 12px;
  }
  .stat-item {
    margin: 0 4px;
  }
}
</style>