<script setup>
import Nav from '../components/navegacio.vue'
import carousel from '../components/carousel.vue'
import popularfilmsection from '../components/popularfilmsection.vue'
</script>

<template>
  <div class="home-page-container">
    <!-- Navigation -->
    <Nav />
    
    <!-- Main Content -->
    <main class="main-content">
      <!-- Hero Carousel Section -->
      <section class="hero-section">
        <carousel />
      </section>
      
      <!-- Popular Films Section -->
      <popularfilmsection/>
      
      <!-- Additional Sections -->
      <section class="trending-section">
        <h2 class="section-title">Trends this week</h2>
        <div class="coming-soon-message">
          <div class="coming-soon-icon">
            <svg class="clock-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12,6 12,12 16,14"/>
            </svg>
          </div>
          <p class="coming-soon-text">Próximamente...</p>
        </div>
      </section>
    </main>
    
    <!-- Footer -->
    <footer class="page-footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3 class="footer-title">Movies</h3>
          <ul class="footer-links">
            <li><a href="#" class="footer-link">Populares</a></li>
            <li><a href="#" class="footer-link">Estrenos</a></li>
            <li><a href="#" class="footer-link">Clásicos</a></li>
            <li><a href="#" class="footer-link">Documentales</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h3 class="footer-title">Community</h3>
          <ul class="footer-links">
            <li><a href="#" class="footer-link">Listas</a></li>
            <li><a href="#" class="footer-link">Reseñas</a></li>
            <li><a href="#" class="footer-link">Discusiones</a></li>
            <li><a href="#" class="footer-link">Eventos</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h3 class="footer-title">Support</h3>
          <ul class="footer-links">
            <li><a href="#" class="footer-link">Ayuda</a></li>
            <li><a href="#" class="footer-link">Contacto</a></li>
            <li><a href="#" class="footer-link">Términos</a></li>
            <li><a href="#" class="footer-link">Privacidad</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h3 class="footer-title">Follow</h3>
          <div class="social-links">
            <a href="#" class="social-link">
              <svg class="social-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a href="#" class="social-link">
              <svg class="social-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
              </svg>
            </a>
            <a href="#" class="social-link">
              <svg class="social-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p class="copyright-text">© 2025 Movie Platform. Todos los derechos reservados.</p>
        <div class="footer-bottom-links">
          <a href="#" class="footer-bottom-link">Política de Privacidad</a>
          <span class="separator">•</span>
          <a href="#" class="footer-bottom-link">Términos de Servicio</a>
          <span class="separator">•</span>
          <a href="#" class="footer-bottom-link">Cookies</a>
        </div>
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