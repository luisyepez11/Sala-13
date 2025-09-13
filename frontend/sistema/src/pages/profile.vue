<script setup>
	import { ref, onMounted, watch } from "vue"
	import Nav from "../components/navegacio.vue"
	import Modal from "../components/modal.vue";
	import UserReviewCard from "../components/UserReviewCard.vue";
	import FavoriteMovies from "../components/FavoriteMovies.vue";
	import MovieGrid from '../components/searchresultsection.vue'
	import ListCoverGrid from "../components/ListCoverGrid.vue";
	import Footer from '../components/Footer.vue'
	import ProfilePictureModal from "../components/ProfilePictureModal.vue";
	import Popularfilmsection from "../components/PopularfilmsectionLike.vue"
	import PopularfilmsectionVistas from "../components/PopularfilmsectionVistas.vue"
	import MovieCartList from '../components/MovieCardList.vue'
	import CommunityCard from '../components/CommunityCard.vue'
	import axios from 'axios';
	import { useRouter } from 'vue-router';

	const router = useRouter();
	axios.defaults.withCredentials = true;
	const editar = ref(false)
	const listaSolicitudes = ref()
	const lista = ref([])
	const usuarioId = ref("")
	const nombreLista = ref("")
	const descripcion = ref("")
	const isProfileModalOpen = ref(false);
	const profilePictureUrl = ref(null);

	const comunidades = ref([])
	
	const editData = ref({
		nombre: '',
		apodo: '',
		descripcion: ''
	});

	const PROFILE_PIC_KEY = 'user_profile_picture';

	const userReviews = ref([]);

	onMounted(() => {
		const storedPic = localStorage.getItem(PROFILE_PIC_KEY);
		if (storedPic) {
			profilePictureUrl.value = storedPic;
		}
		data();
	});

	watch(profilePictureUrl, (newUrl) => {
		if (newUrl) {
			localStorage.setItem(PROFILE_PIC_KEY, newUrl);
		} else {
			localStorage.removeItem(PROFILE_PIC_KEY);
		}
	});

	const usuario = ref({
		nombre: "",
		pronombres: "",
		nombreReal: "",
		biografia: "",
		cantidad_solicitudes: 0,
		total_seguidos: 0,
		total_seguidores: 0,
		total_comentarios: 0
	});


	const fotoComunidad = ref(null)
const isSelectorFotoOpen = ref(false)


	const obtenerComunidadesUsuario = async (idUsuario) => {
		try {
			const response = await axios.get(`http://localhost:3300/api/comunidades/getComunidadesUsuarios/${idUsuario}`);
			
			const comunidadesTransformadas = response.data.map(comunidad => ({
				id: comunidad.idcominidad,
				titulo: comunidad.nombreComunidad,
				descripcion: comunidad.descripcionCominidad,
				imagen: "https://images.unsplash.com/photo-1581905764498-f1b60bae943a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
				usuarios: comunidad.total_seguidores
			}));
			
			comunidades.value = comunidadesTransformadas;
		} catch (error) {
			console.error("Error al obtener las comunidades del usuario:", error);
			comunidades.value = [];
		}
	};

	const obtenerResenasUsuario = async (idUsuario) => {
		try {
			const response = await axios.get(`http://localhost:3300/api/comentario/getComentariosUsuario/${idUsuario}`);
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
				rating: 0, 
				reviewText: comentario.comentario,
				likes: 0, 
				fecha: comentario.fecha
			}));
			
			const reseñasOrdenadas = reseñasTransformadas.sort((a, b) => {
				return new Date(b.fecha) - new Date(a.fecha);
			});
			
			userReviews.value = reseñasOrdenadas;
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
			usuarioId.value = usarioId.data.id;

			const [datosSolicitudes, cuenta, listasRes] = await Promise.all([
				axios.get(`http://localhost:3300/api/solicitud/solicitudes/${usuarioId.value}`),
				axios.get(`http://localhost:3300/api/cuenta/getCuenta/${usuarioId.value}`),
				axios.get(`http://localhost:3300/api/lista/getListasUsuarios/${usuarioId.value}`)
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
			
			await Promise.all([
				obtenerResenasUsuario(usuarioId.value),
				obtenerComunidadesUsuario(usuarioId.value)
			]);
			
		} catch (error) {
			console.log("error", error)
		}
	}
	
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
	function editarPerfil() {
		editData.value.nombre = usuario.value.nombre;
		editData.value.apodo = usuario.value.nombreReal;
		editData.value.descripcion = usuario.value.biografia;
		editar.value = true;
	}
	async function aceptareditar() {
		if (editData.value.nombre.trim() === '') {
			editData.value.nombre = usuario.value.nombre;
		}

		try {
			const usarioId = await axios.get("http://localhost:3300/api/usuario/user")
			await axios.put(`http://localhost:3300/api/cuenta/${usarioId.data.id}`, {
				nombreReal: editData.value.nombre,
				descripcionCuenta: editData.value.descripcion,
				nombreCuenta: editData.value.apodo,
				fotoPerfil:profilePictureUrl.value
			})
			await data();
		} catch (error) {
			console.error("Error al actualizar el perfil:", error);
		}
		editar.value = false;
	}
	function cambiarTab(tab) {
		activeTab.value = tab
		if (tab === 'Comunidades') {
			obtenerComunidadesUsuario(usuarioId.value);
		}
	}
	const modalIsOpen = ref(false);
	const openModal = () => {
		modalIsOpen.value = true;
	};
	const closeModal = () => {
		modalIsOpen.value = false;
	};
	const solicitudes = () => {
		openModal()
	};
	const portadaLista = ref({})
	const getposters = (posters, idLista) => {
  portadaLista.value[idLista] = posters;
}
	const aceptarSolicitud = async (id, nombre, idsolicitudes) => {
		try {
			await axios.post(`http://localhost:3300/api/amigo/insertAmigo`, {
				idReceptor: usuarioId.value,
				idUsuario: id,
				idsolicitudes: idsolicitudes
			})
			await data();
		} catch (error) {
			console.log(error)
		}
	}
	const rechazarSolicitud = async (id, nombre, idsolicitudes) => {
		try {
		} catch (error) {

		}
	}
	const modalCrearListas = ref(false);
	const abrirModalListas = () => {
		modalCrearListas.value = true
	}
	const cerrarModalLista = () => {
		modalCrearListas.value = false
	}
	const modalCrearComunidades = ref(false);
	const abrirModalComunidades = () => {
		modalCrearComunidades.value = true
	}
	const cerrarModalComunidades = () => {
		modalCrearComunidades.value = false
	}
	const crearComunidad = async () => {
    try {
        if (!nombreLista.value.trim() || !descripcion.value.trim()) {
            alert('Por favor, completa todos los campos');
            return;
        }

        const response = await axios.post('http://localhost:3300/api/comunidades', {
            nombreComunidad: nombreLista.value,
            descripcion: descripcion.value,
            idCreador: usuarioId.value
        });

        cerrarModalComunidades();
        nombreLista.value = "";
        descripcion.value = "";

        alert('Comunidad creada exitosamente');

        obtenerComunidadesUsuario(usuarioId.value);
        
    } catch (error) {
        console.error("Error al crear la comunidad:", error);
        alert('Error al crear la comunidad. Por favor, intenta nuevamente.');
    }

    const response = await axios.post('http://localhost:3300/api/comunidades', {
      nombreComunidad: nombreLista.value,
      descripcionCominidad: descripcion.value,
      idCreador: usuarioId.value
    });

    cerrarModalComunidades();
    nombreLista.value = "";
    descripcion.value = "";

    alert('Comunidad creada exitosamente');

    obtenerComunidadesUsuario(usuarioId.value);

    isProfileModalOpen.value = true;

  
}
	const crearLista = async () => {
		try {
			await axios.post(`http://localhost:3300/api/lista`, {
				nombreLista: nombreLista.value,
				descripcion: descripcion.value,
				idCuenta: usuarioId.value
			});
			cerrarModalLista(); 
			nombreLista.value = "";
			descripcion.value = "";
			data();
		} catch (error) {
			console.error("Error creando lista:", error);
		}
	}
	
	const buscar = (nombre)=>{
		if (nombre==""){
			router.push("/")
		}else{
			router.push("/search/"+nombre)
		}
	}
	
	function openProfileModal() {
        if (editar.value) {
            isProfileModalOpen.value = true;
        }
    }

    function closeProfileModal() {
        isProfileModalOpen.value = false;
    }

    function handlePosterSelected(posterUrl) {
        profilePictureUrl.value = posterUrl;
        closeProfileModal();
    }

	const isProfileModal = ref(false);
	function openProfileModalComunidad() {
            isProfileModal.value = true;
    }

    function cerrarProfileModal() {
        isProfileModalOpen.value = false;
    }

    function handlePosterSelectedComunidad(posterUrl) {
        profilePictureUrl.value = posterUrl;
        cerrarProfileModal();
    }
		function abrirSelectorFoto() {
	isSelectorFotoOpen.value = true
	}

	function cerrarSelectorFoto() {
	isSelectorFotoOpen.value = false
	}

	function handleFotoComunidadSeleccionada(url) {
	//fotoComunidad.value = url
	cerrarSelectorFoto()
}
</script>

<template>
	<Modal :isOpen="modalCrearListas" @close="cerrarModalLista">
		<div class="modal-crear-lista">
			<h2 class="modal-title">Crear nueva lista</h2>
			<div class="form-group">
				<label class="user-bio" for="nombreLista">Nombre de la lista</label>
				<input id="nombreLista" type="text" v-model="nombreLista" placeholder="Ejemplo: Terror"
					class="input-field" />
			</div>
			<div class="form-group">
				<label class="user-bio" for="descripcion">Descripción</label>
				<textarea id="descripcion" v-model="descripcion" placeholder="Describe tu lista..."
					class="input-field textarea"></textarea>
			</div>
			<div class="modal-btn">
				<button class="btn-cancel" @click="cerrarModalLista">Cancelar</button>
				<button class="btn-crear" @click="crearLista">Crear</button>
			</div>
		</div>
	</Modal>
	<Modal :isOpen="modalCrearComunidades" @close="cerrarModalComunidades">
	<div class="modal-crear-lista">
		<h2 class="modal-title">Crear nueva Comunidad</h2>
		<div class="form-group">
			<div class="form-group">
  <label class="user-bio">Foto de la comunidad</label>
  <div v-if="fotoComunidad" class="preview-imagen">
    <img :src="fotoComunidad" alt="Preview" class="imagen-preview" />
  </div>
  <button class="btn-crear" @click="openProfileModalComunidad">Seleccionar foto</button>
</div>
			<label class="user-bio" for="nombreLista">Nombre de la Comunidad</label>
			<input id="nombreLista" type="text" v-model="nombreLista" placeholder="Ejemplo: Fanaticos del Cine"
				class="input-field" />
		</div>
		<div class="form-group">
			<label class="user-bio" for="descripcion">Descripción</label>
			<textarea id="descripcion" v-model="descripcion" placeholder="Describe tu comunidad..."
				class="input-field textarea"></textarea>
		</div>
		<div class="modal-btn">
			<button class="btn-cancel" @click="cerrarModalComunidades">Cancelar</button>
			<button class="btn-crear" @click="crearComunidad">Crear</button>
		</div>
	</div>
</Modal>
	<Modal :isOpen="modalIsOpen" @close="closeModal">
		<template v-if="listaSolicitudes && listaSolicitudes.length > 0">
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
							<button class="btn-aceptar"
								@click="aceptarSolicitud(solicitud.idManda, solicitud.nombremanda, solicitud.idsolicitudes)">Aceptar</button>
							<button class="btn-rechazar"
								@click="rechazarSolicitud(solicitud.idManda, solicitud.nombremanda, solicitud.idsolicitudes)">Rechazar</button>
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

	<ProfilePictureModal
		:isOpen="isProfileModalOpen"
		@close="closeProfileModal"
		@poster-selected="handlePosterSelected"
	/>
	<ProfilePictureModal
		:isOpen="isProfileModal"
		@close="cerrarSelectorFoto"
		@poster-selected="handleFotoComunidadSeleccionada"
	/>

	<div class="perfil-container">
		<Nav :buscar="buscar" />

		<div class="main-content">
			<div class="profile-section">
				<div class="profile-info">
					<div class="avatar-section">
						<div 
							class="avatar-container" 
							:class="{ 'editable': editar }"
							@click="openProfileModal"
							:aria-label="editar ? 'Cambiar foto de perfil' : 'Foto de perfil'"
						>
							<img v-if="profilePictureUrl" :src="profilePictureUrl" alt="Foto de perfil" class="avatar-image">
							<svg v-else class="avatar-icon" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd"
									d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
							</svg>
							<div v-if="editar" class="edit-overlay">
								<span class="edit-overlay-text">Editar</span>
							</div>
						</div>
						<button v-if="!editar" class="edit-button" @click="editarPerfil">
							<div class="edit-text">Editar</div>
						</button>
						<button v-if="editar" class="edit-button" @click="aceptareditar">
							<div class="edit-text">Aceptar</div>
						</button>
					</div>

					<div v-if="!editar" class="user-details">
						<div class="user-name">{{ usuario.nombre }}</div>
						<div v-if="false" class="user-pronouns">{{ usuario.pronombres }}</div>
						<div class="user-real-name">{{ usuario.nombreReal }}</div>
						<div class="user-bio">{{ usuario.biografia }}</div>
					</div>
					<div v-if="editar" class="user-details">
						<div class="user-name">
							<input type="text" v-model="editData.nombre" class="edit-input" placeholder="Nombre de usuario">
						</div>
						<div class="user-real-name">
							<input type="text" v-model="editData.apodo" class="edit-input" placeholder="Apodo">
						</div>
						<div class="user-bio">
							<textarea v-model="editData.descripcion" class="edit-input edit-textarea" placeholder="Biografía"></textarea>
						</div>
					</div>
				</div>

				<div class="stats-container">
					<div class="stat-item">
						<div class="stat-number">{{ usuario.total_vistas }}</div>
						<div class="stat-label">Vistas</div>
					</div>
					<div class="vertical-line"></div>
					<div class="stat-item">
						<div class="stat-number">{{ usuario.total_likes }}</div>
						<div class="stat-label">Likes</div>
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
					<button v-for="tab in tabs" :key="tab" @click="cambiarTab(tab)"
						:class="['tab-button', activeTab === tab ? 'tab-active' : 'tab-inactive']">
						{{ tab }}
					</button>
				</div>
			</div>

			<div v-if="activeTab === 'Favoritas'" class="content-area">
				<FavoriteMovies />
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
					<div v-for="(item, index) in lista" :key="item.idlista" class="lista-card"
						@click="$router.push('/listDetail/' + item.idlista)">
						<MovieCartList v-show="false" :idLista="item.idlista" @listaPoster="(posters) => getposters(posters, item.idlista)" ></MovieCartList>
						<ListCoverGrid :posters="portadaLista[item.idlista] || []" class="lista-portada"/>
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
				<Popularfilmsection :idUsuario="usuarioId" opcion="profile"></Popularfilmsection>
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
			<div v-else-if="activeTab === 'Vistas'" class="content-area">
				<PopularfilmsectionVistas :idUsuario="usuarioId" opcion="profile"></PopularfilmsectionVistas>
			</div>
			<div v-else class="empty-content">
				<div class="empty-text">Contenido de {{ activeTab }} próximamente...</div>
			</div>
		</div>
	</div>
	<Footer />
</template>


<style>
	.reviews-container {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

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
		position: relative;
	}

	.lista-portada {
		width: 100%;
		height: 300px;
		border-bottom: 1px solid #334155;
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
		display: grid;
    	grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
		gap: 1.5rem;
		justify-content: center;
	}

	.lista-card {
		background: #1f2937;
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s;
		cursor: pointer;
		display: flex;
    	flex-direction: column;
	}

	.lista-card:hover {
		transform: translateY(-5px);
	}

	.lista-info {
		padding: 1rem;
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
		text-overflow: ellipsis;
	}

	.create-card {
		height: 565px;
		width: 270px;
		background: rgba(75, 85, 99, 0.3);
		border: 2px dashed #6b7280;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		min-height: 350px;
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
		font-family: "Poppins-Regular", sans-serif;
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

	.modal-close {
		color: #ffffff;
	}

	.solicitudes-table {
		width: 100%;
		border-collapse: collapse;
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


	.btn-aceptar,
	.btn-rechazar {
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

		.table-header,
		.table-data {
			padding: 8px 6px;
			font-size: 12px;
		}

		.table-data.nombre {
			max-width: 80px;
		}

		.btn-aceptar,
		.btn-rechazar {
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
		font-family: "Poppins-Regular", sans-serif;
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
		font-family: "Poppins-Regular", sans-serif;
	}

	.input-field:focus {
		border-color: #3b82f6;
	}

	.input-field.textarea {
		resize: vertical;
		min-height: 80px;
		font-family: "Poppins-Regular", sans-serif;
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

	.avatar-container.editable {
        cursor: pointer;
        position: relative;
    }

    .avatar-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .edit-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
        border-radius: 50%;
    }

    .avatar-container.editable:hover .edit-overlay {
        opacity: 1;
    }

    .edit-overlay-text {
        font-weight: 600;
        font-family: "Poppins", sans-serif;
    }

	.edit-input {
		width: 100%;
		padding: 8px 12px;
		font-size: 1rem;
		border-radius: 6px;
		border: 1px solid #4b5563;
		background-color: #374151;
		color: #ffffff;
		font-family: "Poppins-Regular", sans-serif;
		outline: none;
	}

	.edit-textarea {
		min-height: 80px;
		resize: vertical;
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
	.comunidades-grid {
  	display: flex;
  	flex-wrap: wrap;
 	gap: 1.5rem;
  	justify-content: center;
  	padding: 1rem 0;
	}
</style>
