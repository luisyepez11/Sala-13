<script setup>
import { ref, onMounted } from 'vue'
import Nav from '../components/navegacio.vue'
import ReviewComment from '../components/ReviewComment.vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const route = useRoute()
axios.defaults.withCredentials = true
 
const movie = ref(null)

const error = ref(null)
const loadReviews = async () => {
  try {
    const movieId = route.params.id;
    const response = await axios.get(`http://localhost:3300/api/comentario/${movieId}`);
    const comentarios = response.data;
    reviews.value = comentarios.map(comentario => ({
      userName: comentario.nombreCuenta,
      rating: 4,
      date: new Date(comentario.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' }),
      comment: comentario.comentario,
      realName: comentario.nombreReal,
      description: comentario.descripcionCuenta,
      pronouns: comentario.pronombres
    }));
  } catch (e) {
    console.error('Error al cargar las reseñas:', e);
  }
};
const submitReview = async()=>{
    try {
    const movieId = route.params.id
    const usarioId = await axios.get("http://localhost:3300/api/usuario/user")
    const cuenta = await axios.get(`http://localhost:3300/api/cuenta/getCuenta/${usarioId.data.id}`)
    const idcuenta =cuenta.data.resultCuenta[0].idcuenta
    const comentario = document.getElementById('comentario').value
    const fechaISO = new Date().toISOString(); 
    const fecha = fechaISO.replace('T', ' ').replace('Z', '').split('.')[0];
    const result = await axios.post(`http://localhost:3300/api/comentario`,{
          idCuenta:idcuenta,
          idPelicula:movieId,
          comentario:comentario,
          fecha:fecha
        })
    loadReviews()
    document.getElementById("comentario").value=""
  } catch (e) {
    error.value = 'Error al cargar los detalles de la película: ' + e.message
    console.error('Error:', e)
  }
}
onMounted(async () => {
  try {
    const movieId = route.params.id
    const resp = await fetch(`http://localhost:3300/api/pelicula/getPelicula/${movieId}`)
    const datos = await resp.json();
    console.log(datos)
    if (!movieId) {
      router.push('/')
      return
    }
    console.log(movieId)
    movie.value = {
  title: datos.title,
  year: datos.release_date,
  genre: 'Terror/Ciencia ficción',
  synopsis: datos.overview,
  rating: datos.vote_average,
  poster: `https://image.tmdb.org/t/p/original${datos.poster_path}`
    }
    loadReviews()
  } catch (e) {
    error.value = 'Error al cargar los detalles de la película: ' + e.message
    console.error('Error:', e)
  }
})

const reviews = ref([
  {
    userName: 'Ana Morgan',
    rating: 4,
    date: '23/02',
    comment: 'A gripping thriller with stunning visuals and a compelling performance from Olivia Hayes. The suspense builds steadily, keeping you on the edge of your seat until the very end.'
  },
  {
    userName: 'Liam Fisher',
    rating: 3,
    date: '26/02',
    comment: 'While the cinematography is impressive, the plot felt predictable and the pacing dragged in the second half. The ending was somewhat anticlimactic.'
  }
])
const newReview = ref({
  rating: 0,
  comment: ''
})
const isLiked = ref(false)

const like = () => {
  isLiked.value = !isLiked.value
  const likeButton = document.querySelector('.btn-like')
  if (isLiked.value) {
      likeButton.classList.add('btn-click-like')
  } else {
      likeButton.classList.remove('btn-click-like')
  }
}


</script>

<template>
  <link href="https://cdn.boxicons.com/fonts/basic/boxicons.min.css" rel="stylesheet">
  <div class="movie-page">
      <Nav />
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
              <span v-for="n in 5" :key="n" class="star"
                    :class="{ 'filled': n <= movie.rating }">
                ★
              </span>
            </div>
            <span class="rating-number">{{ movie.rating }}/5</span>
          </div>
          <p class="synopsis">{{ movie.synopsis }}</p>
          
          <div class="action-buttons">
            <button class="btn-like" @click="like"><i class='bx bx-like'></i></button>
            <button class="btn-list"><i class='bx  bx-bookmark-plus-alt'  ></i> </button>
            <button class="btn-eye"><i class='bx bx-eye-alt'></i></button>
            
            
          </div>
        </div>
      </div>

      <div class="reviews-section">
        <h2 class="section-title">Reseñas</h2>
        
        <div class="write-review">
          <h3>Escribe tu reseña</h3>
          <div class="rating-input">
            <span v-for="n in 5" :key="n" 
                  @click="newReview.rating = n"
                  class="star-input"
                  :class="{ 'filled': n <= newReview.rating }">
              ★
            </span>
          </div>
          <textarea 
            v-model="newReview.comment"
            placeholder="Comparte tu opinión sobre la película..."
            class="review-textarea"
            id="comentario"
          ></textarea>
          <button @click="submitReview" class="btn-submit">Publicar reseña</button>
        </div>

        <div class="reviews-list">
          <ReviewComment 
            v-for="review in reviews" 
            :key="review.userName"
            :userName="review.userName"
            :rating="review.rating"
            :date="review.date"
            :comment="review.comment"
          />
        </div>
      </div>
    </div>
    </div>
  </div>
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
.btn-click-like{
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
</style>