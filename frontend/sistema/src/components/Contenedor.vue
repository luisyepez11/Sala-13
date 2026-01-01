<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import UserReviewCard from './UserReviewCard.vue'
axios.defaults.withCredentials = true

const router = useRouter()

const props = defineProps({ idUsuario: String})
onMounted(async () => {
		await obtenerResenasUsuario(props.idUsuario);
	});
const userReviews = ref([]);
const obtenerResenasUsuario = async (idUsuario) => {
		try {
			const response = await axios.get(`/api/comentario/getComentariosUsuario/${idUsuario}`);
			const reseñasTransformadas = response.data.map(comentario => ({
				id: comentario.idcomentario,
				user: {
					name: comentario.nombreCuenta,
					avatar: "https://placehold.co/40x40/4A5568/E2E8F0?text=U"
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

</script>

<template>
<div v-if="userReviews.length === 0" class="empty-content">
					<div class="empty-text">No tienes reseñas todavía</div>
				</div>
				<div v-else class="reviews-container">
					<UserReviewCard v-for="review in userReviews" :key="review.id" :review="review"  />
</div>
</template>

<style scoped>

</style>