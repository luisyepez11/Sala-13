<script setup>
import { ref, watch } from 'vue'
import moviecard from './moviecard.vue'
import axios from 'axios'

axios.defaults.withCredentials = true

const props = defineProps({ genero: "", titulo: "" })

const movies = ref([])

const fetchMovies = async () => {
	try {
		// Se ha corregido un pequeño error de sintaxis en la URL de la API
		const res = await axios.get(`https://sala-13.onrender.com/api/pelicula${props.genero}`)
		const newMovies = res.data.results.map(movie => ({
			id: movie.id,
			title: movie.title,
			poster: movie.poster_path
				? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
				: 'https://via.placeholder.com/500x750?text=No+Poster',
			rating: (movie.vote_average / 2).toFixed(2),
			views: Math.floor(Math.random() * 5000),
			likes: Math.floor(movie.vote_count / 10),
			year: movie.release_date
				? new Date(movie.release_date).getFullYear()
				: 'N/A'
		}))
		// Ahora 'movies' se llena directamente con todos los resultados
		movies.value = newMovies
		console.log(movies.value)
	} catch (err) {
		console.error("Error al obtener películas:", err)
	}
}

// Se llama a fetchMovies inmediatamente y cada vez que el 'genero' (la búsqueda) cambie.
fetchMovies()

watch(() => props.genero, () => {
	fetchMovies()
})

</script>


<template>
	<section class="popular-section">
		<!-- Se mantiene el título de la sección -->
		<div class="section-header">
			<h2 class="section-title">{{props.titulo}}</h2>
			<!-- El botón "See All" ha sido eliminado -->
		</div>
		<!-- El grid ahora itera directamente sobre 'movies', mostrando todos los resultados -->
		<div class="movies-grid">
			<moviecard
				v-for="movie in movies"
				:key="movie.id"
				:movie="movie"
			/>
		</div>
		<!-- El botón "Cargar Más" para móviles ha sido eliminado -->
	</section>
</template>

<style scoped>
.popular-section {
	margin-bottom: 4rem;
}

.section-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 2rem;
}

.section-title {
	color: #ffffff;
	font-size: 1.875rem;
	font-weight: 700;
	margin: 0;
}

.movies-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
	gap: 1.5rem;
	margin-bottom: 2rem;
}

/* Responsive Grid */
@media (max-width: 1400px) {
	.movies-grid {
		grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
		gap: 1.25rem;
	}
}

@media (max-width: 1200px) {
	.movies-grid {
		grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
		gap: 1rem;
	}
}

@media (max-width: 1024px) {
	.movies-grid {
		grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
		gap: 1rem;
	}
	
	.section-title {
		font-size: 1.75rem;
	}
}

@media (max-width: 768px) {
	.section-header {
		flex-direction: column;
		align-items: flex-start;
		gap: 1rem;
	}
	
	.section-title {
		font-size: 1.5rem;
	}
	
	.movies-grid {
		grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
		gap: 0.875rem;
	}
}

@media (max-width: 640px) {
	.movies-grid {
		grid-template-columns: repeat(4, 1fr);
		gap: 0.75rem;
	}
}

@media (max-width: 480px) {
	.movies-grid {
		grid-template-columns: repeat(3, 1fr);
		gap: 0.625rem;
	}
	
	.section-title {
		font-size: 1.375rem;
	}
}

@media (max-width: 360px) {
	.movies-grid {
		grid-template-columns: repeat(2, 1fr);
		gap: 0.5rem;
	}
}
</style>
