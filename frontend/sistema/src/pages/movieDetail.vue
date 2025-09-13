<script setup>
import { ref, onMounted } from 'vue'
import Nav from '../components/navegacio.vue'
import ReviewComment from '../components/ReviewComment.vue'
import { useRouter, useRoute } from 'vue-router'
import Modal from "../components/modal.vue";
import Footer from '../components/Footer.vue'
import axios from 'axios'

const router = useRouter()
const route = useRoute()
axios.defaults.withCredentials = true
const lista = ref({})
const movie = ref(null)
const nombrePelicula = ref("")

const error = ref(null)
const insertLike = async () => {
	try {
		const usarioId = await axios.get("http://localhost:3300/api/usuario/user")
		const like = await axios.post("http://localhost:3300/api/like", { idCuenta: usarioId.data.id, idPelicula: route.params.id })
	} catch (error) {
		console.log(error)
	}
}

const insertVistas = async () => {
	
	try {
		const usarioId = await axios.get("http://localhost:3300/api/usuario/user")
		const viste = await axios.post("http://localhost:3300/api/vistas", { idCuenta: usarioId.data.id, idPelicula: route.params.id })
	} catch (error) {
		console.log(error)
	}
	alert("pelicula vistas")
}

const loadReviews = async () => {
  try {
    const usarioId = await axios.get("http://localhost:3300/api/usuario/user")
    const listas = await axios.get(`http://localhost:3300/api/lista/getListasUsuarios/${usarioId.data.id}`)
    lista.value = listas.data
    const movieId = route.params.id;
    const response = await axios.get(`http://localhost:3300/api/comentario/pelicula/${movieId}`);
    const comentarios = response.data;
    const reviewsData = comentarios.map(comentario => ({
      idCuenta: comentario.idCuenta,
      userName: comentario.nombreCuenta,
	  fotoPerfil: comentario.fotoPerfil || "https://placehold.co/40x40/4A5568/E2E8F0?text=U",
      rating: comentario.valoracion,
      date: new Date(comentario.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' }),
      comment: comentario.comentario,
      realName: comentario.nombreReal,
      description: comentario.descripcionCuenta,
      pronouns: comentario.pronombres,
      fechaOriginal: comentario.fecha 
    }));

    const reviewsOrdenadas = reviewsData.sort((a, b) => {
      return new Date(b.fechaOriginal) - new Date(a.fechaOriginal);
    });

    reviews.value = reviewsOrdenadas;
  } catch (e) {
    console.error('Error al cargar las reseñas:', e);
  }
};

const submitReview = async () => {
  // Mostrar alerta con la cantidad de estrellas seleccionadas
  if (newReview.rating > 0) {
    alert(`¡Gracias por tu reseña de ${newReview.rating} estrellas!`);
  } else {
    alert('¡Gracias por tu reseña!');
  }
  
  try {
    const movieId = route.params.id
    const usarioId = await axios.get("http://localhost:3300/api/usuario/user")
    const cuenta = await axios.get(`http://localhost:3300/api/cuenta/getCuenta/${usarioId.data.id}`)
    const idcuenta = cuenta.data.resultCuenta[0].idcuenta
    const comentario = document.getElementById('comentario').value
    const fechaISO = new Date().toISOString();
    const fecha = fechaISO.replace('T', ' ').replace('Z', '').split('.')[0];
    const result = await axios.post(`http://localhost:3300/api/comentario`, {
      idCuenta: idcuenta,
      idPelicula: movieId,
      comentario: comentario,
      fecha: fecha,
      nombrePelicula: nombrePelicula.value,
      valoracion: valoracion.value
    })
    loadReviews()
    document.getElementById("comentario").value = ""
    
    newReview.rating = 0;
	valoracion.value=0
  } catch (e) {
    error.value = 'Error al cargar los detalles de la película: ' + e.message
    console.error('Error:', e)
  }
  router.go(0)
}

onMounted(async () => {
	try {
		const movieId = route.params.id
		if (!movieId) {
			router.push('/')
			return
		}
		const resp = await fetch(`http://localhost:3300/api/pelicula/getPelicula/${movieId}`)
		const datos = await resp.json();
		
		nombrePelicula.value = datos.title
		
		const genreNames = datos.genres && datos.genres.length > 0
			? datos.genres.map(genre => genre.name).join(' / ')
			: 'Género no disponible';

		movie.value = {
			title: datos.title,
			year: datos.release_date,
			genre: genreNames,
			synopsis: datos.overview,
			rating: (datos.vote_average / 2).toFixed(1),
			poster: `https://image.tmdb.org/t/p/original${datos.poster_path}`
		}
		loadReviews()
	} catch (e) {
		error.value = 'Error al cargar los detalles de la película: ' + e.message
		console.error('Error:', e)
	}
})

const reviews = ref([])
const newReview = ref({
	rating: 0,
	comment: ''
})
const isLiked = ref(false)

const like = async () => {
	isLiked.value = !isLiked.value
	await insertLike()
	const likeButton = document.querySelector('.btn-like')
	if (isLiked.value) {
		likeButton.classList.add('btn-click-like')
	} else {
		likeButton.classList.remove('btn-click-like')
	}
}
const modalIsOpen = ref(false);
const openModal = () => {
	modalIsOpen.value = true;
};
const closeModal = () => {
	modalIsOpen.value = false;
};
const listas = ref([])
const valoracion = ref("")
const cantidad = (n)=>{
	valoracion.value = n
	newReview.rating=n
	console.log(valoracion.value)
}
const selecionado = (lista) => {
	listas.value.push(lista)
}
const agregar_lista = async () => {
	listas.value.map(async id => {
		try {
			const result = await axios.post('http://localhost:3300/api/lista/agregarPelicula', {
				idLista: id,
				idPelicula: route.params.id
			})
			alert("agregado a la lista")
			closeModal()
		} catch (error) {

		}
	})
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
	<Modal :isOpen="modalIsOpen" @close="closeModal">
		<div class="modal-listas">
			<table class="listas-table">
				<thead>
					<tr>
						<th colspan="2" class="table-header">
							Agregar Película a la Lista...
						</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="listasItem in lista" :key="listasItem.idlista" class="list-item">
						<td class="list-name">{{ listasItem.nombreLista }}</td>
						<td class="list-check">
							<input type="checkbox" class="styled-checkbox" @change="selecionado(listasItem.idlista)">
						</td>
					</tr>
				</tbody>
			</table>
			<div class="modal-actions">
				<button class="btn-cancelar" @click="closeModal">Cancelar</button>
				<button class="btn-confirmar" @click="agregar_lista">Confirmar</button>
			</div>
		</div>
	</Modal>

	<link href="https://cdn.boxicons.com/fonts/basic/boxicons.min.css" rel="stylesheet">
	<div class="movie-page">
		<Nav :buscar="buscar" />
		<div v-if="error" class="error-message">
			{{ error }}
		</div>
		<div v-else-if="!movie" class="loading">
			Cargando...
		</div>
		<div v-else>
			<div class="content-container">
				<div class="movie-header">
					<div class="movie-poster">
						<img :src="movie.poster" :alt="movie.title" class="poster-image">
					</div>
					<div class="movie-info">
						<h1 class="movie-title">{{ movie.title }}</h1>
						<div class="movie-meta">
							<span class="year">{{ movie.year }}</span>
							<span class="genre">{{ movie.genre }}</span>
						</div>
						<div class="rating">
							<div class="stars">
								<span v-for="n in 5" :key="n" class="star" :class="{ 'filled': n <= movie.rating }">
									★
								</span>
							</div>
							<span class="rating-number">{{ movie.rating }}/5</span>
						</div>
						<p class="synopsis">{{ movie.synopsis }}</p>
						<div class="action-buttons">
							<button class="btn-like" @click="like"><i class='bx bx-like'></i></button>
							<button class="btn-list" @click="openModal"><i class='bx bx-bookmark-plus-alt'></i> </button>
							<button class="btn-eye" @click="insertVistas"><i class='bx bx-eye-alt'></i></button>
						</div>
					</div>
				</div>
				<div class="reviews-section">
					<h2 class="section-title">Reseñas</h2>
					 <div class="write-review">
    <h3>Escribe tu reseña</h3>
    <div class="rating-input">
      <span v-for="n in 5" :key="n" @click="cantidad(n)" class="star-input"
        :class="{ 'filled': n <= valoracion, 'hover-effect': true }">
        ★
      </span>
    </div>
    <p class="rating-text" v-if="newReview.rating > 0">
      Has seleccionado {{ newReview.rating }} {{ newReview.rating === 1 ? 'estrella' : 'estrellas' }}
    </p>
    <textarea v-model="newReview.comment" placeholder="Comparte tu opinión sobre la película..."
      class="review-textarea" id="comentario"></textarea>
    <button @click="submitReview" class="btn-submit">Publicar reseña</button>
  </div>
					<div class="reviews-list">
						<ReviewComment v-for="review in reviews" :key="review.userName" :idCuenta="review.idCuenta"
							:userName="review.userName" :userAvatar="review.fotoPerfil" :rating="review.rating" :date="review.date"
							:comment="review.comment" />
					</div>
				</div>
			</div>
		</div>
	</div>
	<Footer />
</template>

<style scoped>
.movie-page {
	min-height: 100vh;
	background: #111827;
}

.content-container {
	max-width: 1200px;
	margin: 0 auto;
	padding: 2rem;
}

.movie-header {
	display: flex;
	gap: 2rem;
	margin-bottom: 3rem;
}

.movie-poster {
	flex-shrink: 0;
	width: 300px;
	height: 450px;
	border-radius: 12px;
	overflow: hidden;
}

.poster-image {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.movie-info {
	flex: 1;
}

.movie-title {
	font-size: 2.5rem;
	color: #ffffff;
	margin-bottom: 1rem;
}

.movie-meta {
	display: flex;
	gap: 1rem;
	color: #9ca3af;
	margin-bottom: 1rem;
}

.rating {
	display: flex;
	align-items: center;
	gap: 1rem;
	margin-bottom: 1.5rem;
}

.stars {
	display: flex;
	gap: 0.25rem;
}

.star {
	color: #4b5563;
	font-size: 1.5rem;
}

.star.filled {
	color: #fbbf24;
}

.rating-number {
	color: #ffffff;
	font-size: 1.25rem;
}

.synopsis {
	color: #d1d5db;
	font-size: 1.1rem;
	line-height: 1.6;
	margin-bottom: 2rem;
}

.action-buttons {
	display: flex;
	gap: 1rem;
}

.btn-eye,
.btn-list,
.btn-like {
	font-size: 1.5rem;
	font-weight: 600;
	border-radius: 8px;
	padding: 0.75rem 1.5rem;
	background: transparent;
	border: 2px solid #4b5563;
	color: #ffffff;
	transition: all 0.5s;
}

.btn-click-like {
  background: #ffffff;
  border: 2px solid #ffffff;
  color: #111827;
}

.btn-eye:hover,
.btn-list:hover,
.btn-like:hover {
	border-color: #6b7280;
	border-radius: 0 50% 0 50%;
	background: rgba(75, 85, 99, 0.2);
}

.btn-eye i,
.btn-like i {
	font-style: normal;
}

.reviews-section {
	margin-top: 3rem;
}

.section-title {
	color: #ffffff;
	font-size: 1.75rem;
	margin-bottom: 2rem;
}

.write-review {
	background: rgba(17, 24, 39, 0.7);
	border-radius: 12px;
	padding: 1.5rem;
	margin-bottom: 2rem;
}

.write-review h3 {
	color: #ffffff;
	margin-bottom: 1rem;
}

.rating-input {
	display: flex;
	gap: 0.5rem;
	margin-bottom: 1rem;
}

.star-input {
	color: #4b5563;
	font-size: 1.5rem;
	cursor: pointer;
}

.star-input.filled {
	color: #fbbf24;
}

.review-textarea {
	width: 100%;
	min-height: 120px;
	background: #1f2937;
	border: 1px solid #374151;
	border-radius: 8px;
	padding: 1rem;
	color: #ffffff;
	margin-bottom: 1rem;
	resize: vertical;
}

.btn-submit {
	background: #3b82f6;
	color: #ffffff;
	border: none;
	padding: 0.75rem 1.5rem;
	border-radius: 8px;
	font-weight: 600;
	cursor: pointer;
	transition: background 0.3s;
	position: relative;
	z-index: 1;
	display: block;
	width: auto;
	margin: 0 auto;
}

.btn-submit:hover {
	background: #2563eb;
}

.table-header {
	text-align: center;
	font-size: 16px;
	font-weight: bold;
	padding: 12px;
	background: none;
	color: #f1f5f9;
	font-family: "Poppins-Regular", sans-serif;
}

.listas-table {
	width: 100%;
	border-collapse: collapse;
	margin: 10px 0;
	font-family: "Poppins-Regular", sans-serif;
}

.listas-table td {
	padding: 10px;
	border-bottom: 1px solid #374151;
	color: #f1f5f9;
	font-family: "Poppins-Regular", sans-serif;
}

.list-item:hover {
	background: #111827;
}

.list-name {
	text-align: left;
}

.list-check {
	text-align: center;
	width: 60px;
}

.modal-actions {
	display: flex;
	justify-content: flex-end;
	gap: 12px;
	margin-top: 20px;
}

.modal-listas {
	width: 400px;
}

.modal-container {
	width: 300px;
	max-width: 35px;
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

.listas-table {
	width: 100%;
	border-collapse: collapse;
	margin: 10px 0;
}

.listas-table th,
.listas-table td {
	padding: 10px;
	text-align: center;
	border-bottom: 1px solid #374151;
	color: #f1f5f9;
}

/* Ocultar el checkbox nativo */
.styled-checkbox {
	appearance: none;
	-webkit-appearance: none;
	-moz-appearance: none;
	width: 20px;
	height: 20px;
	border: 2px solid #3b82f6;
	border-radius: 6px;
	background-color: transparent;
	cursor: pointer;
	display: inline-block;
	position: relative;
	transition: all 0.2s ease;
}

.styled-checkbox:hover {
	border-color: #2563eb;
	box-shadow: 0 0 4px rgba(59, 130, 246, 0.6);
}

.styled-checkbox:checked {
	background-color: #3b82f6;
	border-color: #3b82f6;
}

.styled-checkbox:checked::after {
	content: "X";
	color: white;
	font-size: 14px;
	font-weight: bold;
	position: absolute;
	top: 1px;
	left: 4px;
}

.listas-table th {

	font-weight: bold;
	text-transform: uppercase;
	font-size: 14px;
}

.list-item:hover {
	background: #111827;
}

.modal-actions {
	display: flex;
	justify-content: flex-end;
	gap: 12px;
	margin-top: 20px;
}

.btn-cancelar,
.btn-confirmar {
	padding: 8px 16px;
	border-radius: 6px;
	border: none;
	cursor: pointer;
	font-size: 14px;
	transition: 0.2s;
}

.btn-cancelar {
	background: #4b5563;
	color: white;
}

.btn-cancelar:hover {
	background: #6b7280;
}

.btn-confirmar {
	background: #3b82f6;
	color: white;
}

.btn-confirmar:hover {
	background: #2563eb;
}

@media (max-width: 768px) {
	.movie-header {
		flex-direction: column;
	}

	.movie-poster {
		width: 100%;
		height: auto;
		aspect-ratio: 2/3;
	}

	.action-buttons {
		flex-wrap: wrap;
	}

	.btn-watch,
	.btn-list {
		flex: 1;
	}
}

.error-message {
	background-color: rgba(220, 38, 38, 0.1);
	color: #ef4444;
	padding: 1rem;
	border-radius: 8px;
	margin: 2rem auto;
	max-width: 600px;
	text-align: center;
}

.loading {
	color: #ffffff;
	text-align: center;
	padding: 2rem;
	font-size: 1.2rem;
}
.rating-text {
  color: #fbbf24;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.star-input.hover-effect {
  transition: transform 0.2s ease, color 0.2s ease;
}

.star-input.hover-effect:hover {
  transform: scale(1.2);
  color: #fbbf24;
}
</style>
