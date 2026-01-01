<script setup>
import Nav from '../components/navegacio.vue'
import Popularfilmsection from "../components/popularfilmsectionListas.vue"
import UserReviewCard from "../components/UserReviewCard.vue";
import Footer from '../components/Footer.vue'
import { useRouter, useRoute } from 'vue-router'
import { ref, watch, onMounted } from 'vue'
import Contenedor from '../components/Contenedor.vue';
import axios from 'axios';
axios.defaults.withCredentials = true;

const router = useRouter()
const route = useRoute()

const movieId = ref(null)
const componentKey = ref(0)
const data = ref([])
const selectedFilter = ref('peliculas')
const userReviews = ref([]);


const listas = async () =>{
  try {
    const usarioId = await axios.get("/api/usuario/user")
    const result = await fetch(`/api/amigo/getAmigosId/${usarioId.data.id}`)
    const amigos = await result.json()
    data.value = amigos
    console.log(data.value)
  } catch (error) {
    console.log(error)
  }
}
listas()
onMounted(() => {
  movieId.value = route.params.id
})

watch(() => route.params.id, (newId) => {
  movieId.value = newId
  componentKey.value++ 
})


watch(selectedFilter, (newFilter) => {
  console.log(`El filtro ha cambiado a: ${newFilter}`);
})

const buscar = (nombre) => {
  if (nombre==""){
     router.push("/")
    }else{
      router.push("/search/"+nombre)
    }
}
const obtenerResenasUsuario = async (idUsuario) => {
		try {
			const response = await axios.get(`/api/comentario/getComentariosUsuario/${idUsuario}`);
            console.log(response)
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
</script>

<template>
  <div class="home-page-container">
    <Nav :buscar="buscar" />
    
    <main class="main-content">
        <div  v-for="value in data">
            <h2>{{ value.nombreCuenta }}</h2>
            <Contenedor :idUsuario="value.idReceptor"/>
        </div>
    </main>

  </div>
  <Footer />
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

.filter-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;
}

.filter-label {
  color: #ffffff;
  font-size: 1rem;
  font-weight: 500;
}

.select-wrapper {
  position: relative;
  display: inline-block;
}

.filter-select {
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px; /* Para forma de píldora */
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.filter-select:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.4);
}

.hero-section {
  margin-bottom: 3rem;
}

.trending-section {
  margin-top: 4rem;
  padding: 2rem 0;
}

.section-title {
  color: #ffffff;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
}

.coming-soon-message {
  text-align: center;
  padding: 4rem 2rem;
  background: rgba(43, 58, 110, 0.3);
  border-radius: 16px;
  border: 1px solid #334155;
  backdrop-filter: blur(10px);
}

.coming-soon-icon {
  margin-bottom: 1.5rem;
}

.clock-icon {
  width: 3rem;
  height: 3rem;
  color: #3b82f6;
  margin: 0 auto;
}

.coming-soon-text {
  color: #ffffff;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.coming-soon-subtitle {
  color: #9ca3af;
  font-size: 1rem;
  margin: 0;
}

.page-footer {
  background: #0f172a;
  border-top: 1px solid #334155;
  margin-top: 4rem;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1.5rem 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.footer-section {
  display: flex;
  flex-direction: column;
}

.footer-title {
  color: #ffffff;
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 0.5rem;
}

.footer-link {
  color: #9ca3af;
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #3b82f6;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 50%;
  color: #3b82f6;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: #3b82f6;
  color: white;
  transform: translateY(-2px);
}

.social-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.footer-bottom {
  border-top: 1px solid #334155;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.copyright-text {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
}

.footer-bottom-links {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.footer-bottom-link {
  color: #6b7280;
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.3s ease;
}

.footer-bottom-link:hover {
  color: #3b82f6;
}

.separator {
  color: #6b7280;
  font-size: 0.875rem;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .main-content {
    padding: 1.5rem 1rem;
  }
  
  .section-title {
    font-size: 1.875rem;
  }
}

@media (max-width: 768px) {
  .main-content {
    padding: 1.5rem 1rem;
  }
  
  .hero-section {
    margin-bottom: 2rem;
  }
  
  .section-title {
    font-size: 1.75rem;
  }
  
  .coming-soon-message {
    padding: 3rem 1.5rem;
  }
  
  .footer-content {
    padding: 2rem 1rem 1.5rem;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  
  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }
}

@media (max-width: 640px) {
  .main-content {
    padding: 1rem 0.75rem;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
  
  .coming-soon-message {
    padding: 2.5rem 1rem;
  }
  
  .coming-soon-text {
    font-size: 1.125rem;
  }
  
  .clock-icon {
    width: 2.5rem;
    height: 2.5rem;
  }
}

@media (max-width: 480px) {
  .main-content {
    padding: 1rem 0.75rem;
  }
  
  .section-title {
    font-size: 1.375rem;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }
  
  .social-links {
    justify-content: center;
  }
  
  .footer-bottom-links {
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .separator {
    display: none;
  }
}

@media (max-width: 360px) {
  .coming-soon-message {
    padding: 2rem 0.75rem;
  }
  
  .footer-content {
    padding: 1.5rem 0.75rem 1rem;
  }
}
</style>