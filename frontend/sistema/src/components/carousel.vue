<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import axios from 'axios';
axios.defaults.withCredentials = true;
const currentSlide = ref(0)
const slides = ref([])
let intervalId = null
const prueba = async()=>{
    const prueb = await axios.get("http://localhost:3300/api/pelicula")
    slides.value = prueb.data.results
      .filter(movie => movie.backdrop_path) 
      .slice(0, 10) 
      .map((movie, index) => ({
        id: movie.id || index + 1,
        title: movie.title,
        image: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
        description: movie.overview 
          ? movie.overview.substring(0, 120) + (movie.overview.length > 120 ? '...' : '')
          : 'Descripción no disponible'
      }))
    currentSlide.value = 0
}
slides.value = [
      {
        id: 1,
        title: "The Batman",
        image: "https://assets.megamediaradios.fm/sites/2/2022/03/the-batman.jpg",
        description: "Una nueva visión del icónico detective de Gotham"
      },
      {
        id: 2,
        title: "F1",
        image: "https://cloudfront-us-east-1.images.arcpublishing.com/infobae/IWU3IUG7X5DMBOIG4KAUTVKFSE.jpg", 
        description: "Corremos como uno solo"
      },
      {
        id: 3,
        title: "Spider-Man",
        image: "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2019/06/spider-man-lejos-casa.jpeg?tf=3840x",
        description: "El multiverso se abre con consecuencias inesperadas"
      }
    ]
prueba()
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length
}

const prevSlide = () => {
  currentSlide.value = currentSlide.value === 0 ? slides.value.length - 1 : currentSlide.value - 1
}

const goToSlide = (index) => {
  currentSlide.value = index
}

const startAutoplay = () => {
  intervalId = setInterval(nextSlide, 5000)
}

const stopAutoplay = () => {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<template>
  <div class="carousel-container" @mouseenter="stopAutoplay" @mouseleave="startAutoplay">
    <div class="carousel-wrapper">
      <!-- Slides Container -->
      <div class="slides-wrapper">
        <div 
          v-for="(slide, index) in slides" 
          :key="slide.id"
          :class="['slide', { 'active': index === currentSlide }]"
        >
          <div class="slide-background">
            <img :src="slide.image" :alt="slide.title" class="slide-image" />
            <div class="slide-gradient"></div>
          </div>
          <div class="slide-content">
            <h2 class="slide-title">{{ slide.title }}</h2>
            <p class="slide-description">{{ slide.description }}</p>
          </div>
        </div>
      </div>
      
      <!-- Navigation Arrows - Ahora más minimalistas -->
      <button class="nav-button nav-prev" @click="prevSlide" aria-label="Anterior">
        <svg class="nav-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      
      <button class="nav-button nav-next" @click="nextSlide" aria-label="Siguiente">
        <svg class="nav-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
      
      <!-- Dots Indicators -->
      <div class="indicators">
        <button 
          v-for="(slide, index) in slides"
          :key="index"
          @click="goToSlide(index)"
          :class="['indicator', { 'active': currentSlide === index }]"
          :aria-label="`Ir a slide ${index + 1}`"
        ></button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.carousel-container {
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 2rem;
  background: #1e293b;
}

.carousel-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.slides-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.slide.active {
  opacity: 1;
}

.slide-background {
  position: relative;
  width: 100%;
  height: 100%;
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slide-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.1) 50%,
    rgba(0, 0, 0, 0.6) 100%
  );
}

.slide-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2.5rem;
  color: white;
  z-index: 2;
}

.slide-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  line-height: 1.2;
}

.slide-description {
  font-size: 1.125rem;
  margin-bottom: 1.5rem;
  opacity: 0.95;
  max-width: 500px;
  line-height: 1.5;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

/* Botones de navegación más minimalistas */
.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  border: none;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 3;
  opacity: 0.6;
}

.nav-button:hover {
  background: rgba(255, 255, 255, 0.2);
  opacity: 1;
}

.nav-prev {
  left: 1rem;
}

.nav-next {
  right: 1rem;
}

.nav-arrow {
  width: 1.25rem;
  height: 1.25rem;
  color: white;
}

.indicators {
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.75rem;
  z-index: 3;
}

.indicator {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.4);
  opacity: 0.7;
}

.indicator.active {
  background: #ffffff;
  opacity: 1;
  transform: scale(1.2);
}

.indicator:hover:not(.active) {
  background: rgba(255, 255, 255, 0.6);
  opacity: 0.9;
}

/* Responsivo */
@media (max-width: 768px) {
  .carousel-container {
    height: 300px;
    border-radius: 8px;
  }
  
  .slide-content {
    padding: 1.5rem;
  }
  
  .slide-title {
    font-size: 2rem;
  }
  
  .slide-description {
    font-size: 1rem;
    margin-bottom: 1.25rem;
  }
  
  .nav-button {
    width: 2rem;
    height: 2rem;
  }
  
  .nav-arrow {
    width: 1rem;
    height: 1rem;
  }
  
  .nav-prev {
    left: 0.75rem;
  }
  
  .nav-next {
    right: 0.75rem;
  }
  
  .indicators {
    bottom: 1rem;
    gap: 0.5rem;
  }
}

@media (max-width: 480px) {
  .carousel-container {
    height: 250px;
  }
  
  .slide-content {
    padding: 1rem;
  }
  
  .slide-title {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
  
  .slide-description {
    font-size: 0.875rem;
    margin-bottom: 1rem;
  }
  
  .nav-button {
    width: 1.75rem;
    height: 1.75rem;
  }
  
  .nav-arrow {
    width: 0.875rem;
    height: 0.875rem;
  }
}
</style>