<script setup>
import Nav from '../components/navegacio.vue'
import popularfilmsection from "../components/popularfilmsection.vue"
import carousel from "../components/carousel.vue";
import Footer from '../components/Footer.vue'
import {ref, onMounted, onUnmounted, watch} from "vue";
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const activeTab = ref('Reseñas Destacadas');
const slide = ref(0); 
const reviews = ref([]);
const isLoading = ref(true);
const calcular = (n) =>{
  let estralla = ''
  if (n==1){
    estralla = '⭐'
  }
  else if(n==2){
      estralla = '⭐⭐'
  }
  else if(n==3){
    estralla = '⭐⭐⭐'
  }
  else if(n==4){
      estralla = '⭐⭐⭐⭐'
  }
  else if(n==2){
      estralla = '⭐⭐⭐⭐⭐'
  }
  return estralla
}
const loadComments = async () => {
  
    try {
        const response = await axios.get('http://localhost:3300/api/comentario/comentarios');
        
        reviews.value = response.data.map((comment, index) => (
          {
            id: comment.idcomentario || index, 
            name: "Usuario " + (comment.nombreCuenta || "Anónimo"),
            peli: comment.nombrePelicula || "Película desconocida",
            comment: comment.comentario || "Sin comentario",
            punt: calcular(comment.valoracion),
            img: comment.fotoPerfil || `https://picsum.photos/id/${1005 + index}/200/200` ,
            small: false,
        }));
        
        console.log("Comentarios cargados:", reviews.value);
    } catch(error) {
        console.error("Error cargando comentarios:", error);

        reviews.value = [
            {
                id: 1,
                name: "Usuario Ejemplo 1",
                peli: "El Padrino",
                comment: "Una obra maestra del cine. Marlon Brando está increíble.",
                punt: "⭐⭐⭐⭐⭐",
                img: "https://picsum.photos/id/1005/200/200",
            },
            {
                id: 2,
                name: "Usuario Ejemplo 2",
                peli: "Pulp Fiction",
                comment: "Tarantino en su máximo esplendor. Diálogos brillantes.",
                punt: "⭐⭐⭐⭐",
                img: "https://picsum.photos/id/1006/200/200",
            }
        ];
    } finally {
        isLoading.value = false;
    }
};

let intervalId = null;
const animatedNumber = ref(0);
const animatedNumber2 = ref(0);
const animatedNumber3 = ref(0);
const animatedNumber4 = ref(0);
const targetNumber = 10000;
const targetNumber2 = 5000;
const targetNumber3 = 3200;
const targetNumber4 = 800;
const duration = 6000;
const frameRate = 60;

const communities = ref([
    {
        id: 1,
        name: 'Sci-Fi Fans',
        description: 'Discussions about classic science fiction and the latest genre news, from Star Wars to Blade Runner.',
        image: 'https://picsum.photos/id/237/200/200',
    },
    {
        id: 2,
        name: '80s Cinema',
        description: 'A trip back in time to remember the great hits of the decade, like The Goonies, Back to the Future, and Top Gun.',
        image: 'https://picsum.photos/id/163/200/200',
    }
]);

const startCounting = () => {
    const steps = duration / (1000 / frameRate);
    const increment = parseInt(targetNumber / steps);
    const increment2 = parseInt(targetNumber2 / steps);
    const increment3 = parseInt(targetNumber3 / steps);
    const increment4 = parseInt(targetNumber4 / steps);

    let currentStep = 0;

    const interval = setInterval(() => {
        animatedNumber.value += increment;
        animatedNumber2.value += increment2;
        animatedNumber3.value += increment3;
        animatedNumber4.value += increment4;

        currentStep++;
        
        if (currentStep >= steps) {
            animatedNumber.value = targetNumber;
            animatedNumber2.value = targetNumber2;
            animatedNumber3.value = targetNumber3;
            animatedNumber4.value = targetNumber4;
            clearInterval(interval);
        }
    }, 1000 / frameRate);
    
    onUnmounted(() => {
        clearInterval(interval);
    });
}

const nextSlide = () => {
    if (reviews.value.length > 0) {
        slide.value = (slide.value + 1) % reviews.value.length;
    }
}

const startAutoplay = () => {
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(nextSlide, 5000);
}

const tabs = ref([
    'Reseñas Destacadas',
    'Peliculas Populares',
    'Comunidades Activas'
]);

const setActive = (tab) => {
    activeTab.value = tab;
}

// Reiniciar el carrusel cuando cambien los comentarios
watch(reviews, (newReviews) => {
    if (newReviews.length > 0) {
        slide.value = 0;
        startAutoplay();
    }
});

onMounted(() => {
    startCounting();
    loadComments();
});

onUnmounted(() => {
    if (intervalId) clearInterval(intervalId);
});
const navigateToLogin = () => {
  router.push('/login');
};
const navigateToRegister = () => {
  router.push('/register');
};
const buscar = (nombre) => {
	if (nombre === "") {
		router.push("/")
	} else {
		router.push("/search/" + nombre)
	}
}
</script>
<template>
    <Nav :buscar="buscar"></Nav>/>
    <section class="hero-section">
        <div class="hero-left">
            <img src="/src/assets/logo.png" alt="Sala 13 Logo" class="hero-logo" />
            <h1 class="hero-title">"la nueva red social para cinéfilos"</h1>
        </div>
        <div class="hero-right">
            <p class="hero-description">
            Si estás listo para compartir tus opiniones, tus listas y tus gustos con todos tus amigos y el resto del mundo:
            </p>
            <div class="hero-buttons">
                <button @click="navigateToRegister" class="btn">Regístrate</button>
                <span>ó</span>
                <button @click="navigateToLogin" class="btn">Inicia sesión</button>
            </div>
        </div>
    </section>
    <section class="features-section">
        <h2 class="section-title">Todo lo que Necesitas para Vivir el Cine</h2>
        <div class="features-grid">
            <div class="feature-card">
            <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
fill="currentColor" viewBox="0 0 24 24" >
<!--Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free-->
<path d="M4 19h3v2c0 .36.19.69.51.87a1.002 1.002 0 0 0 1-.01L13.27 19h6.72c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2M4 5h16v12h-7c-.18 0-.36.05-.51.14L9 19.23V18c0-.55-.45-1-1-1H4z"></path><path d="M7 8h10v2H7zM7 12h7v2H7z"></path>
            </svg>
            <h3>Comparte tu Opinión</h3>
            <p>Escribe reseñas detalladas, califica películas y comparte tus pensamientos con una comunidad que entiende tu pasión por el cine.</p>
            </div>
            <div class="feature-card">
            <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
  fill="currentColor" viewBox="0 0 24 24" >
  <!--Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free-->
  <path d="M18.5 2h-12C4.57 2 3 3.57 3 5.5V21c0 .35.18.67.47.85s.66.2.97.04l5.55-2.78 5.55 2.78a.997.997 0 0 0 1.45-.89v-8h4c.55 0 1-.45 1-1V5.5c0-1.93-1.57-3.5-3.5-3.5ZM15 19.38l-4.55-2.28a1 1 0 0 0-.89 0l-4.55 2.28V5.5c0-.83.67-1.5 1.5-1.5h8.85c-.22.46-.35.96-.35 1.5v13.88ZM20 11h-3V5.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5z"></path><path d="M11 7H9v2H7v2h2v2h2v-2h2V9h-2z"></path>
            </svg>
            <h3>Organiza tu Cine</h3>
            <p>Crea listas ilimitadas: favoritas, pendientes por ver, clásicos imperdibles, o cualquier categoría que imagines.</p>
            </div>
            <div class="feature-card">
              <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
  fill="currentColor" viewBox="0 0 24 24" >
  <!--Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free-->
  <path d="m12,11c1.71,0,3-1.29,3-3s-1.29-3-3-3-3,1.29-3,3,1.29,3,3,3Zm0-4c.6,0,1,.4,1,1s-.4,1-1,1-1-.4-1-1,.4-1,1-1Z"></path><path d="m13,12h-2c-2.76,0-5,2.24-5,5v.5c0,.83.67,1.5,1.5,1.5h9c.83,0,1.5-.67,1.5-1.5v-.5c0-2.76-2.24-5-5-5Zm-5,5c0-1.65,1.35-3,3-3h2c1.65,0,3,1.35,3,3h-8Z"></path><path d="m6.5,11c.47,0,.9-.12,1.27-.33-.48-.77-.77-1.68-.77-2.67,0-.66.13-1.28.35-1.85-.26-.09-.55-.15-.85-.15-1.44,0-2.5,1.06-2.5,2.5s1.06,2.5,2.5,2.5Z"></path><path d="m6.11,12h-.61c-1.93,0-3.5,1.57-3.5,3.5v1c0,.28.22.5.5.5h1.5c0-1.96.81-3.73,2.11-5Z"></path><path d="m17.5,11c1.44,0,2.5-1.06,2.5-2.5s-1.06-2.5-2.5-2.5c-.31,0-.59.06-.85.15.22.57.35,1.19.35,1.85,0,.99-.29,1.9-.77,2.67.37.21.79.33,1.27.33Z"></path><path d="m18.5,12h-.61c1.3,1.27,2.11,3.04,2.11,5h1.5c.28,0,.5-.22.5-.5v-1c0-1.93-1.57-3.5-3.5-3.5Z"></path>
              </svg>
              <h3>Encuentra tu Tribu</h3>
              <p>Únete a comunidades especializadas en géneros, directores, épocas o temas específicos. Debate, descubre y conecta.</p>
            </div>
            <div class="feature-card">
              <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
fill="currentColor" viewBox="0 0 24 24" >
<!--Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free-->
<path d="M22 11h-3V8h-2v3h-3v2h3v3h2v-3h3zM4 8c0 2.28 1.72 4 4 4s4-1.72 4-4-1.72-4-4-4-4 1.72-4 4m6 0c0 1.18-.82 2-2 2s-2-.82-2-2 .82-2 2-2 2 .82 2 2M3 20h10c.55 0 1-.45 1-1v-1c0-2.76-2.24-5-5-5H7c-2.76 0-5 2.24-5 5v1c0 .55.45 1 1 1m4-5h2c1.65 0 3 1.35 3 3H4c0-1.65 1.35-3 3-3"></path>
              </svg>
              <h3>Sigue a Cinéfilos</h3>
              <p>Descubre qué ven otros usuarios, sigue a críticos que admiras y mantente al día con las tendencias cinematográficas.</p>
            </div>
        </div>
    </section>
    <section class="social-proof-section">
        <h2 class="section-title">Únete a Miles de Cinéfilos</h2>
        <div class="counters">
            <div class="counter"><span>+{{ animatedNumber }}</span><p>Películas comentadas</p></div>
            <div class="counter"><span>+{{ animatedNumber2 }}</span><p>Usuarios activos</p></div>
            <div class="counter"><span>+{{ animatedNumber3 }}</span><p>Listas creadas</p></div>
            <div class="counter"><span>+{{ animatedNumber4 }}</span><p>Comunidades activas</p></div>
        </div>

        <div class="testimonials">
            <div class="testimonial-card">
            <img src="/src/assets/perfilGen.png" alt="Usuario 1" />
            <p>"Sala 13 me hizo volver a amar el cine."</p>
            <cite>— ElPadrino_</cite>
            </div>
            <div class="testimonial-card">
            <img src="/src/assets/perfilGen.png" alt="Usuario 2" />
            <p>"Me encantan las comunidades, he conocido gente increíble."</p>
            <cite>— PotterheadFav13</cite>
            </div>
        </div>
    </section>
    <section class="dynamic-content-section">
        <h2 class="section-title">Lo Que Está Pasando Ahora</h2>
        <carousel />
        <div class="tabs">
            <button
              v-for="tab in tabs"
              :key="tab"
              @click="setActive(tab)"
              :class="{'active' : activeTab === tab}"
              class = "tab"
            >
              {{tab}}
            </button>
        </div>

        <div class="tab-content">
            <!-- Puedes usar componentes dinámicos aquí -->
            
             <div v-if="activeTab === 'Reseñas Destacadas'" class="tab-content">
        <div v-if="isLoading" class="loading">Cargando reseñas...</div>
        
        <div v-else-if="reviews.length === 0" class="loading">No hay reseñas disponibles</div>
        
        <div v-else class="container-card">
            <div v-for="(review, index) in reviews"
                :key="review.id"
                :class="{'active-card': index === slide}"
                class="review-card"
            >
                <img :src="review.img" alt="Perfil" />
                <div>
                    <strong>{{ review.name }}</strong> vio <em>{{ review.peli }}</em>
                    <p>“{{ review.comment }}”</p>
                    <span>{{ review.punt }}</span>
                    <button class="btn">Leer más</button>
                </div>
            </div>
            
            <!-- Controles del carrusel -->
            <div class="carousel-controls">
                <button @click="slide = (slide - 1 + reviews.length) % reviews.length" class="btn">←</button>
                <span>{{ slide + 1 }} / {{ reviews.length }}</span>
                <button @click="nextSlide()" class="btn">→</button>
            </div>
        </div>
    </div>
            <!-- Agrega más cards similares o carousel -->
            <div v-if="activeTab === 'Peliculas Populares'" style="width: 60%;">

                <popularfilmsection  
                        genero=""
                        titulo="Populares"
                        
                />
            </div>
            <div v-if="activeTab === 'Comunidades Activas'" class="container-card">
              <div v-for="comunidad in communities"
                :class="{'active-card': comunidad.idComunidad === slide}"
                class="review-card"
              >
                <img :src="comunidad.image" alt="Perfil" />
                  <div>
                      <strong>{{comunidad.name}}</strong>
                      <p>“{{comunidad.description}}”</p>
                      <button class="btn">Leer más</button>
                  </div>
              </div>  
                
            </div>
        </div>
    </section>

    <Footer />




</template>

<style scoped>

.btn{
  margin-top: 0.5rem;
  font-size: 1rem;
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.3rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover{
  background-color: #2563eb;
}

.hero-section {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 2rem;
  background: linear-gradient(to right, #0f172a, #1e293b);
  color: white;
}


.hero-left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 40%;
}

.hero-logo {
  width: 200px;
  margin-bottom: 1rem;
}

.hero-title {
  font-size: 3rem;
  font-weight: bold;
}

.hero-right {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 2rem;
  max-width: 40%;
}



.hero-buttons {
  display: flex;
  align-items: center;
  gap: 1rem;
}


    /* caracteristicas principales */
.features-section {
  background-color: #0f172a;
  color: white;
  padding: 4rem 2rem;
  text-align: center;
}

.section-title {
  font-size: 2rem;
  margin-bottom: 2rem;
  font-weight: bold;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.feature-card {
  background-color: #1e293b;
  border-radius: 1rem;
  padding: 2rem;
  transition: transform 0.3s ease, background-color 0.3s ease;
  cursor: pointer;
}

.feature-card:hover {
  background-color: #334155;
  transform: translateY(-5px);
}

.feature-card i {
  font-size: 2.5rem;
  color: #3b82f6;
  margin-bottom: 1rem;
  transition: transform 0.3s ease;
}

.feature-card:hover i {
  transform: scale(1.2);
}

.feature-card h3 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
}

.feature-card p {
  font-size: 1rem;
  color: #cbd5e1;
}

/* seccion de caracteristcas Sociales */
.social-proof-section {
  background-color: #0f172a;
  color: white;
  padding: 4rem 2rem;
  text-align: center;
}

.counters {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  margin-bottom: 3rem;
}

.counter {
  border-radius: 1rem;
  padding: 2rem;
  min-width: 150px;
  transition: transform 0.5s ease;
}

.counter:hover {
  transform: scale(1.05);
}

.counter span {
  font-size: 2rem;
  font-weight: bold;
  color: #3b82f6;
  display: block;
}

.testimonials {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.testimonial-card {
  background-color: #334155;
  border-radius: 1rem;
  padding: 1.5rem;
  width: 300px;
  color: #e2e8f0;
  text-align: left;
}

.testimonial-card img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
}

/*apartado de peli populares*/ 
.dynamic-content-section {
  background-color: #0f172a;
  color: white;
  padding: 4rem 2rem;
}

.tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.tab {
  padding: 0.5rem 1.5rem;
  background-color: #1e293b;
  border: none;
  border-radius: 9999px;
  color: #e2e8f0;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.tab.active,
.tab:hover {
  background-color: #3b82f6;
  color: white;
}

.tab-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
}
.container-card {
	display: grid;
	place-items: center;
	gap: 1rem;
	width: 450px;
	max-width: 100%;
	transition: opacity 0.5s ease-in-out;
}

.container-card {
	display: grid;
	place-items: center;
	gap: 1rem;
	width: 450px;
	max-width: 100%;
	transition: opacity 0.5s ease-in-out;
	
}

.review-card {
	grid-area: 1 / 1;
	width: 100%;
	box-sizing: border-box;
	background-color: #1e293b;
	border-radius: 1rem;
	padding: 1.5rem; 
	opacity: 0;
	transform: translateX(100%);
	transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
	display: flex;
	flex-direction: column;
	align-items: center; 
	text-align: center;
	gap: 0.5rem; 
	
}

.active-card {
	opacity: 1;
	transform: translateX(0);
}


.review-card:hover {
	transform: translateY(-5px);
}

.review-card img {
	width: 60px;
	height: 60px;
	border-radius: 50%;
	object-fit: cover;
	margin-bottom: 0.5rem;
}

.review-card strong {
	display: block;
	font-weight: bold;
}

.review-card em {
	font-style: italic;
	color: #93c5fd;
}



/* seccion de llamada de accion*/
.cta-section {
  background: url('../assets/cinema-background.jpg') center/cover no-repeat;
  position: relative;
  color: white;
  text-align: center;
  padding: 6rem 2rem;
}

.cta-section .overlay {
  background-color: rgba(0, 0, 0, 0.7);
  padding: 4rem;
  border-radius: 1rem;
  max-width: 600px;
  margin: 0 auto;
}

.cta-section h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.cta-section p {
  font-size: 1.1rem;
  margin-bottom: 2rem;
}



.cta-form button {
  background: #3b82f6;
  color: white;
  font-weight: bold;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cta-form button:hover {
  background-color: #2563eb;
}

.cta-links {
  font-size: 0.9rem;
  color: #cbd5e1;
}

.cta-links a {
  color: #93c5fd;
  text-decoration: none;
}

/* ========== Responsive Styles ========== */
@media (max-width: 1024px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .counters {
    flex-direction: column;
    align-items: center;
  }

  .testimonials {
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 640px) {
  .features-grid {
    grid-template-columns: 1fr;
  }

  .tabs {
    flex-direction: column;
    align-items: center;
  }

  .review-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .review-card img {
    margin-bottom: 1rem;
  }
}

</style>