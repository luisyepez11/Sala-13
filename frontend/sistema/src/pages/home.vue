<script setup>
import Nav from '../components/navegacio.vue'
import carousel from '../components/carousel.vue'
import popularfilmsection from '../components/popularfilmsection.vue'
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
    <!-- Navigation -->
    <Nav :buscar="buscar" />
    
    <!-- Main Content -->
    <main class="main-content">
      <div v-if="!mostrar">
        <popularfilmsection titulo="Populares" :genero='"/busqueda/"+buscador.value'/>
      </div>

      <div v-if="mostrar">
        <!-- Hero Carousel Section -->
        <section class="hero-section">
          <carousel />
        </section>
        
        <!-- Popular Films Section -->
        <popularfilmsection titulo="Populares" genero=""/>
        <popularfilmsection 
        v-for="(item, index) in data.generos" 
        :key="index"
        :genero='"/genero/"+item.id'
        :titulo="item.name"
      />
      </div>
    </main>
    
    <!-- Footer -->
    <footer class="page-footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3 class="footer-title">Películas</h3>
          <ul class="footer-links">
            <li><a href="#" class="footer-link">Populares</a></li>
            <li><a href="#" class="footer-link">Acción</a></li>
            <li><a href="#" class="footer-link">Aventura</a></li>
            <li><a href="#" class="footer-link">Animación</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h3 class="footer-title">Comunidad</h3>
          <ul class="footer-links">
            <li><a href="#" class="footer-link">Listas</a></li>
            <li><a href="#" class="footer-link">Reseñas</a></li>
            <li><a href="#" class="footer-link">Comunidades</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h3 class="footer-title">Soporte</h3>
          <ul class="footer-links">
            <li><a href="#" class="footer-link">Ayuda</a></li>
            <li><a href="#" class="footer-link">Contacto</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h3 class="footer-title">Síguenos</h3>
          <div class="social-links">
            <a href="#" class="social-link">
              <img src="/src/assets/tiktoklogo.png" alt="Logo de tiktok" class="social-icon">
            </a>
            <a href="#" class="social-link">
              <img src="/src/assets/xlogo.png" alt="Logo de X" class="social-icon">
            </a>
            <a href="#" class="social-link">
              <img src="/src/assets/iglogo2.png" alt="Logo de instagram" class="social-icon">
            </a>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p class="copyright-text">© 2025 Sala 13. Todos los derechos reservados.</p>
      </div>
    </footer>
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