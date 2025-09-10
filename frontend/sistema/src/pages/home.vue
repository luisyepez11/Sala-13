<script setup>
import Nav from '../components/navegacio.vue'
import carousel from '../components/carousel.vue'
import popularfilmsection from '../components/popularfilmsection.vue'
import Footer from '../components/Footer.vue' // Se importa el nuevo componente
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'

const data = {
	"generos": [
		{"id": 28, "name": "Acción"},
		{"id": 12, "name": "Aventura"},
		{"id": 16, "name": "Animación"},
		{"id": 35, "name": "Comedia"},
		{"id": 80, "name": "Crimen"},
		{"id": 99, "name": "Documental"},
		{"id": 18, "name": "Drama"},
		{"id": 10751, "name": "Familia"},
		{"id": 14, "name": "Fantasía"},
		{"id": 36, "name": "Historia"},
		{"id": 27, "name": "Terror"},
		{"id": 10402, "name": "Música"},
		{"id": 9648, "name": "Misterio"},
		{"id": 10749, "name": "Romance"},
		{"id": 878, "name": "Ciencia ficción"},
		{"id": 10770, "name": "Película de TV"},
		{"id": 53, "name": "Suspense"},
		{"id": 10752, "name": "Bélica"},
		{"id": 37, "name": "Western"}
	]
}
const router = useRouter()
const route = useRoute()
const buscador = ref("")
const mostrar = ref(true)
const buscar = (nombre)=>{
	if (nombre==""){
		router.push("/")
	}else{
		router.push("/search/"+nombre)
	}
}
</script>

<template>
	<div class="home-page-container">
		<Nav :buscar="buscar" />
		
		<main class="main-content">
			<div v-if="!mostrar">
				<popularfilmsection titulo="Populares" :genero='"/busqueda/"+buscador.value'/>
			</div>

			<div v-if="mostrar">
				<section class="hero-section">
					<carousel />
				</section>
				
				<popularfilmsection titulo="Populares" genero=""/>
				<popularfilmsection 
					v-for="(item, index) in data.generos" 
					:key="index"
					:genero='"/genero/"+item.id'
					:titulo="item.name"
				/>
			</div>
		</main>
		
		<!-- Se reemplaza todo el código del footer por el nuevo componente -->
		<Footer />
	</div>
</template>

<style scoped>
.home-page-container {
	background: #091f32;
	min-height: 100vh;
	color: #ffffff;
	font-family: "Poppins", sans-serif;
}

.main-content {
	max-width: 1200px;
	margin: 0 auto;
	padding: 2rem 1.5rem;
}

.hero-section {
	margin-bottom: 3rem;
}

/* Se eliminaron todos los estilos del footer de este archivo */

@media (max-width: 1024px) {
	.main-content {
		padding: 1.5rem 1rem;
	}
}

@media (max-width: 768px) {
	.main-content {
		padding: 1.5rem 1rem;
	}
	
	.hero-section {
		margin-bottom: 2rem;
	}
}

@media (max-width: 640px) {
	.main-content {
		padding: 1rem 0.75rem;
	}
}

@media (max-width: 480px) {
	.main-content {
		padding: 1rem 0.75rem;
	}
}

@media (max-width: 360px) {
	/* No specific styles needed here now */
}
</style>
