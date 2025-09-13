<script setup>
import comunidadGrid from "../components/comunidadesGrid.vue"
import axios from 'axios';
import { useRouter,useRoute } from 'vue-router';
import { ref, onMounted, watch } from "vue"

const reviews = ref([
    {
        id: 1,
        name: 'Sci-Fi Fans',
        comment: 'Discussions about classic science fiction and the latest genre news, from Star Wars to Blade Runner.',
        img: 'https://picsum.photos/id/237/200/200',
    },
    {
        id: 2,
        name: '80s Cinema',
        comment: 'A trip back in time to remember the great hits of the decade, like The Goonies, Back to the Future, and Top Gun.',
        img: 'https://picsum.photos/id/163/200/200',
    }
]);

</script>

<template>
  <!-- Se asume que un componente de navegación/navbar ya existe en App.vue o un layout principal -->
  <div class="community-detail-page">
    <header class="community-cover">
      <img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80" alt="Portada de la comunidad" class="cover-image"/>
    </header>

    <main class="community-content">
      <!-- Sección Principal (Hero) -->
      <section class="hero-section">
        <div class="hero-left">
          <img src="https://picsum.photos/seed/communitylogo/200" alt="Logo de la comunidad" class="community-profile-pic"/>
        </div>
        <div class="hero-right">
          <h1 class="community-name">Entusiastas de la Fotografía Urbana</h1>
          <p class="community-description">Un espacio para compartir y discutir la belleza de la vida urbana a través de la lente. Desde paisajes de concreto hasta retratos callejeros, todos son bienvenidos.</p>
          <span>100 miembros</span>
          <div class="creator-info">
            <img src="https://picsum.photos/seed/admin/40" alt="Admin" class="creator-pic"/>
            <span>Creado por <strong>Alex Dominguez</strong></span>
          </div>
          <div class="action-buttons">
            <button class="btn btn-primary">Unirse a la Comunidad</button>
          </div>
        </div>
      </section>

      <!-- Secciones Adicionales -->
      <div class="additional-sections">
        <!-- Publicaciones Recientes -->
        <section class="recent-posts">
          <h2>Publicaciones Recientes</h2>
          <div class="posts-grid">
            <div v-for="(review, index) in reviews"
                :key="review.id"
                class="review-card"
            >
                <img :src="review.img" alt="Perfil" />
                <div>
                    <stron>{{ review.name }}</stron>
                    <p>“{{ review.comment }}”</p>
                    <button class="btn btn-primary">Leer más</button>
                </div>
            </div>
          </div>
        </section>

        <!-- Miembros Destacados -->
        <section class="featured-members">
          <h2>Comunidades activas</h2>
          <div class="members-grid">
            
              <comunidadGrid />
            
          </div>
        </section>
      </div>
    </main>
  </div>
</template>



<style scoped>
:root {
  --background-color: #111827;
  --primary-text-color: #C9D1D9;
  --secondary-text-color: #8B949E;
  --accent-color: #58A6FF;
  --surface-color: #161B22;
  --border-color: #30363D;
}

.community-detail-page {
  background-color: var(--background-color, #0D1117);
  color: var(--primary-text-color, #C9D1D9);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  padding-bottom: 4rem;
}

.community-cover {
  width: 100%;
  height: 350px;
  position: relative;
}

.community-cover::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 150px;
  background: linear-gradient(to top, var(--background-color, #0D1117), transparent);
}

.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.community-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Hero Section */
.hero-section {
  display: flex;
  align-items: flex-end;
  gap: 2rem;
  margin-top: -100px; /* Superposición sobre la portada */
  position: relative;
  z-index: 2;
}

.community-profile-pic {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  border: 5px solid var(--background-color, #0D1117);
  object-fit: cover;
}

.hero-right {
  padding-bottom: 1rem;
}

.community-name {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
}

.community-description {
  font-size: 1rem;
  color: var(--secondary-text-color, #8B949E);
  max-width: 600px;
  margin-top: 0.5rem;
}

.creator-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  font-size: 0.9rem;
}

.creator-pic {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.action-buttons {
  margin-top: 1.5rem;
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.btn-primary {
  background-color: var(--accent-color, #3b82f6);
  color: #fff;
}
.btn-primary:hover {
  filter: brightness(1.1);
}

.btn-secondary {
  background-color: var(--surface-color, #161B22);
  color: var(--primary-text-color, #C9D1D9);
  border: 1px solid var(--border-color, #30363D);
}
.btn-secondary:hover {
  background-color: #21262d;
}

.btn-tertiary {
  background-color: transparent;
  color: var(--accent-color, #58A6FF);
  border: 1px solid var(--accent-color, #58A6FF);
}
.btn-tertiary:hover {
  background-color: rgba(88, 166, 255, 0.1);
}

/* Secciones Adicionales */
.additional-sections {
  margin-top: 4rem;
  border-top: 1px solid var(--border-color, #30363D);
  padding-top: 2rem;
}

.recent-posts h2, .featured-members h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--primary-text-color, #C9D1D9);
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}
.review-card {
	
	width: 100%;
	box-sizing: border-box;
	background-color: #1e293b;
	border-radius: 1rem;
	padding: 1.5rem; 
	
	
	display: flex;
	flex-direction: column;
	align-items: center; 
	text-align: center;
	gap: 0.5rem; 
	
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
.post-meta {
  font-size: 0.8rem;
  color: var(--secondary-text-color, #8B949E);
  margin-bottom: 1rem;
}

.featured-members {
  margin-top: 4rem;
}

.members-grid {
  display: flex;
  flex-wrap: nowrap; /* Evita que el contenido salte de línea */
  overflow-x: auto;  /* Activa el scroll horizontal cuando sea necesario */
  overflow-y: hidden; /* Oculta cualquier scroll vertical */
  gap: 1.5rem;
  padding-bottom: 1rem; /* Añade espacio para la barra de scroll */
  height: 300px;
  border-radius: 1.5rem;
  background-color: var(--surface-color, #161B22);
  border: 1px solid var(--border-color, #30363D);
  /* Estilos para la barra de scroll en Firefox */
  scrollbar-width: thin;
  scrollbar-color: var(--accent-color, #58A6FF) var(--surface-color, #161B22);
}

/* Estilos para la barra de scroll en navegadores Webkit (Chrome, Safari, Edge) */
.members-grid::-webkit-scrollbar {
  height: 8px;
}

.members-grid::-webkit-scrollbar-track {
  background: var(--surface-color, #161B22);
  border-radius: 4px;
}

.members-grid::-webkit-scrollbar-thumb {
  background-color: var(--accent-color, #58A6FF);
  border-radius: 4px;
  border: 2px solid var(--surface-color, #161B22);
}

.members-grid::-webkit-scrollbar-thumb:hover {
  background-color: #79bbff; /* Color ligeramente más claro al pasar el ratón */
}

.member-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.member-item img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.member-item span {
  font-size: 0.85rem;
  color: var(--secondary-text-color, #8B949E);
}

/* Responsividad */
@media (max-width: 768px) {
  .hero-section {
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top: -120px;
  }

  .hero-right {
    padding-bottom: 0;
  }
  
  .creator-info {
    justify-content: center;
  }

  .action-buttons {
    justify-content: center;
    flex-wrap: wrap;
  }

  .community-profile-pic {
    width: 150px;
    height: 150px;
  }

  .community-name {
    font-size: 2rem;
  }
}
</style>