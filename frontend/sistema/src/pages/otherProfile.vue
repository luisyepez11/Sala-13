<script setup>
  import { ref, onMounted, watch } from "vue"
	import Nav from "../components/navegacio.vue"
	import Modal from "../components/modal.vue";
	import UserReviewCard from "../components/UserReviewCard.vue";
	import FavoriteMovies from "../components/FavoriteMovies.vue";
	import MovieGrid from '../components/searchresultsection.vue'
	import ListCoverGrid from "../components/ListCoverGrid.vue";
	import Footer from '../components/Footer.vue'
  import PopularfilmsectionVistas from "../components/PopularfilmsectionVistas.vue";
  import PopularfilmsectionLike from "../components/PopularfilmsectionLike.vue";
	import ProfilePictureModal from "../components/ProfilePictureModal.vue";
	import CommunityCard from '../components/CommunityCard.vue'
	import axios from 'axios';
  import { useRouter, useRoute } from 'vue-router'

  const router = useRouter()
  const route = useRoute()
	axios.defaults.withCredentials = true;
	const listaSolicitudes = ref()
	const lista = ref([])
	const usuarioId = ref("")
	const nombreLista = ref("")
	const descripcion = ref("")
	const isProfileModalOpen = ref(false);
	const profilePictureUrl = ref(null);
  const userReviews = ref([]);
	const comunidades = ref([
  {
    id: 1,
    titulo: 'Cinéfilos Latinos',
    descripcion: 'Un espacio para compartir reseñas y listas de películas latinoamericanas.',
    imagen: 'https://example.com/latinos.jpg',
    usuarios: 1245
  },
  {
    id: 2,
    titulo: 'Sci-Fi Lovers',
    descripcion: 'Explora mundos futuristas y teorías locas con otros fans del sci-fi.',
    imagen: 'https://example.com/scifi.jpg',
    usuarios: 893
  }
])

  axios.defaults.withCredentials = true;
  const editar=ref(false)
  const id = route.params.id;
  const usario = ref("")
  
  const obtenerResenasUsuario = async (idUsuario) => {
		try {
			const response = await axios.get(`http://localhost:3300/api/comentario/getComentariosUsuario/${id}`);
			// Transformar los datos del endpoint al formato que espera UserReviewCard
			const reseñasTransformadas = response.data.map(comentario => ({
				id: comentario.idcomentario,
				user: {
					name: comentario.nombreCuenta,
					avatar: profilePictureUrl.value || "https://placehold.co/40x40/4A5568/E2E8F0?text=U"
				},
				movie: {
					title: comentario.nombrePelicula,
					poster: `https://image.tmdb.org/t/p/w500`,
					idPelicula:comentario.idPelicula

				},
				rating: 0, // El endpoint no parece incluir rating, podrías necesitar obtenerlo por separado
				reviewText: comentario.comentario,
				likes: 0, // El endpoint no incluye likes, podrías necesitar obtenerlos por separado
				fecha: comentario.fecha
			}));
			
			userReviews.value = reseñasTransformadas;
		} catch (error) {
			console.error("Error al obtener las reseñas del usuario:", error);
			userReviews.value = [];
		}
	};

  const data = async () => {
		try {
			const usarioId = await axios.get("http://localhost:3300/api/usuario/user")
			if (usarioId.data.message == "no registrado") {
				router.push('/');
				return;
			}

			const [datosSolicitudes, cuenta, listasRes] = await Promise.all([
				axios.get(`http://localhost:3300/api/solicitud/solicitudes/${id}`),
				axios.get(`http://localhost:3300/api/cuenta/getCuenta/${id}`),
				axios.get(`http://localhost:3300/api/lista/getListasUsuarios/${id}`)
			]);
			
			const datos = cuenta.data.resultCuenta[0];
			usuario.value = {
				nombre: datos.nombreCuenta,
				pronombres: datos.pronombres,
				nombreReal: datos.nombreReal,
				biografia: datos.descripcionCuenta,
				cantidad_solicitudes: datos.total_solicitudes,
				total_seguidos: datos.total_seguidos,
				total_seguidores: datos.total_seguidores,
				total_comentarios: datos.total_comentarios,
        total_likes:datos.total_likes,
				total_vistas:datos.total_vistas
			};

			const listasConPosters = await Promise.all(
				listasRes.data.map(async (listaItem) => {
					try {
						const peliculasRes = await axios.get(`http://localhost:3300/api/lista/getPeliculasDeLista/${listaItem.idlista}`);
						const peliculas = Array.isArray(peliculasRes.data) ? peliculasRes.data : (peliculasRes.data.results || []);
						const posters = peliculas
							.slice(0, 4)
							.map(p => `https://image.tmdb.org/t/p/w500${p.poster_path}`)
							.filter(Boolean);
						return { ...listaItem, posters };
					} catch (e) {
						console.error(`Error al obtener películas para la lista ${listaItem.idlista}:`, e);
						return { ...listaItem, posters: [] };
					}
				})
			);
			lista.value = listasConPosters;

			const unicas = datosSolicitudes.data.filter(
				(item, index, self) =>
					index === self.findIndex((t) => t.idsolicitudes === item.idsolicitudes)
			);
			listaSolicitudes.value = unicas;
			
			// Obtener las reseñas del usuario después de tener su ID
			obtenerResenasUsuario(id);
			
		} catch (error) {
			console.log("error", error)
		}
	}
  data()
  const usuario = ref({
  nombre: "Usuario1",
  pronombres: "He/Him",
  nombreReal: "Real Name", 
  biografia: "Bio del usuario"
});



  const activeTab = ref("Favoritas")
  const tabs = ["Favoritas", "Listas", "Likes", "Reseñas", "Comunidades", "Vistas"]

  const stats = ref({
    watched: 0,
    likes: 0,
    reviews: 0,
    followers: 0,
    following: 0,
    requests: 0
  })

  async function seguirPerfil () {
    try {
      const result = await axios.post(`http://localhost:3300/api/solicitud/solicitudAmigo`,{
          idReceptor:id,
          idUsuario:usario.value
        })
    } catch (error) {
      console.log(error)
    }
    
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
const mostrarModalLista = ref(false)
const mostrarModalFoto = ref(false)

const abrirModalListas = () => {
  mostrarModalLista.value = true
}

const aceptarModalLista = () => {
  mostrarModalLista.value = false
  mostrarModalFoto.value = true
}
const buscar = (nombre) => {
	if (nombre === "") {
		router.push("/")
	} else {
		router.push("/search/" + nombre)
	}
}
</script>

<template>
  <Modal 
      :isOpen="modalIsOpen" 
      @close="closeModal"
      @confirm="handleConfirm"
    >
    
  </Modal>
  <div class="perfil-container">
    <!-- Header Navigation -->
    <Nav :buscar="buscar" ></Nav>

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
            <button
  v-if="!editar"
  class="edit-button"
  @click="$event.target.disabled = true"
>
  <div class="edit-text">Seguir</div>
</button>
          </div>
          
          <!-- User Details -->
          <div v-if="!editar" class="user-details">
            <div class="user-name">{{ usuario.nombre }}</div>
            <div  v-if="false" class="user-pronouns">{{ usuario.pronombres }}</div>
            <div class="user-real-name">{{ usuario.nombreReal }}</div>
            <div class="user-bio">{{ usuario.biografia }}</div>
          </div>
        </div>

        <!-- Stats -->
        <div class="stats-container">
          <div class="stat-item">
            <div class="stat-number">{{ usuario.total_vistas }}</div>
            <div class="stat-label">watched</div>
          </div>
          <div class="vertical-line"></div>
          <div class="stat-item">
            <div class="stat-number">{{ usuario.total_likes }}</div>
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
					<button v-for="tab in tabs" :key="tab" @click="cambiarTab(tab)"
						:class="['tab-button', activeTab === tab ? 'tab-active' : 'tab-inactive']">
						{{ tab }}
					</button>
				</div>
			</div>

      <div v-if="activeTab === 'Favoritas'" class="content-area">
				<FavoriteMovies />
			</div>
<div v-else-if="activeTab === 'Likes'" class="content-area">
		  <PopularfilmsectionLike :idUsuario="route.params.id" opcion="other-profile"></PopularfilmsectionLike>
</div>
<div v-else-if="activeTab === 'Vistas'" class="content-area">
		  <PopularfilmsectionVistas :idUsuario="route.params.id"></PopularfilmsectionVistas>
</div>
      
			<div v-else-if="activeTab === 'Listas'" class="content-area">
				<div v-if="!lista || lista.length === 0" class="listas-vacias">
					<div class="lista-card create-card" @click="abrirModalListas">
						<div class="lista-info">
							<h2 class="lista-title">+ Crear nueva lista</h2>
							<p class="lista-description">Empieza a organizar tus películas</p>
						</div>
					</div>
				</div>
				<div v-else class="listas-contenedor">
					<div v-for="item in lista" :key="item.idlista" class="lista-card"
						@click="$router.push('/listDetail/' + item.idlista)">
						
						<ListCoverGrid :posters="item.posters" class="lista-portada"/>

						<div class="lista-info">
							<h2 class="lista-title">{{ item.nombreLista }}</h2>
							<p class="lista-description">{{ item.descripcion }}</p>
						</div>
					</div>
					<div class="lista-card create-card" @click="abrirModalListas">
						<div class="lista-info">
							<h2 class="lista-title">+ Crear nueva lista</h2>
							<p class="lista-description">Empieza a organizar tus películas</p>
						</div>
					</div>
				</div>
			</div>
			<div v-else-if="activeTab === 'Likes'" class="content-area">
				<MovieGrid 
					genero="/likes" 
					titulo="Películas que te gustaron" 
				/>
			</div>
			<div v-else-if="activeTab === 'Reseñas'" class="content-area">
				<div v-if="userReviews.length === 0" class="empty-content">
					<div class="empty-text">No tienes reseñas todavía</div>
				</div>
				<div v-else class="reviews-container">
					<UserReviewCard v-for="review in userReviews" :key="review.id" :review="review"  />
				</div>
			</div>
			<div v-else-if="activeTab === 'Comunidades'" class="content-area">
				<div v-if="!comunidades || comunidades.length === 0" class="comunidades-vacias">
					<div class="lista-card create-card" @click="abrirModalComunidades">
						<div class="lista-info">
							<h2 class="lista-title">+ Crear nueva comunidad</h2>
							<p class="lista-description">Empieza a construir tu espacio cinéfilo</p>
						</div>
					</div>
				</div>
				<div v-else class="comunidades-grid">
					<CommunityCard
						v-for="comunidad in comunidades"
						:key="comunidad.id"
						:titulo="comunidad.titulo"
						:descripcion="comunidad.descripcion"
						:imagen="comunidad.imagen"
						:usuarios="comunidad.usuarios"
					/>

					<div class="lista-card create-card" @click="abrirModalComunidades">
						<div class="lista-info">
							<h2 class="lista-title">+ Crear nueva comunidad</h2>
							<p class="lista-description">Empieza a construir tu espacio cinéfilo</p>
						</div>
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
.edit-button:disabled {
  background-color: #4a4a4a; 
  color: #ccc;
  cursor: not-allowed;
  opacity: 0.8;
  transition: background-color 0.3s ease;
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