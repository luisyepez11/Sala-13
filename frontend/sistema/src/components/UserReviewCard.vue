<script setup>
import { ref } from 'vue';

const props = defineProps({
  review: {
    type: Object,
    required: true
  }
});

const isLiked = ref(false);
const likeCount = ref(props.review.likes);

function toggleLike() {
  isLiked.value = !isLiked.value;
  if (isLiked.value) {
    likeCount.value++;
  } else {
    likeCount.value--;
  }
}
</script>

<template>
  <div class="review-entry-card">
    <div class="movie-poster-container">
      <img :src="review.movie.poster" :alt="`Póster de ${review.movie.title}`" class="movie-poster">
    </div>
    <div class="review-content">
      <div class="review-header">
        <img :src="review.user.avatar" alt="Avatar del usuario" class="user-avatar">
        <div class="header-text">
          <span class="user-name">{{ review.user.name }}</span>
          <span class="watched-movie">vio: <strong>{{ review.movie.title }}</strong></span>
        </div>
      </div>
      <div class="rating-stars">
        <svg v-for="n in 5" :key="n" class="star-icon" :class="{ 'filled': n <= review.rating }" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.366 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.365-2.446a1 1 0 00-1.175 0l-3.365 2.446c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
        </svg>
      </div>
      <p class="review-text">
        {{ review.reviewText }}
      </p>
      <div class="review-footer">
        <button @click="toggleLike" class="like-button" :class="{ 'liked': isLiked }">
          <svg class="like-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-6.14A2 2 0 0017.28 9H14z"></path>
          </svg>
          <span>{{ likeCount }} Me gusta</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.review-entry-card {
  display: flex;
  gap: 1.5rem;
  background-color: #1f2937;
  border: 1px solid #374151;
  border-radius: 0.75rem;
  padding: 1.5rem;
  font-family: "Poppins", sans-serif;
  color: #d1d5db;
}

.movie-poster-container {
  flex-shrink: 0;
}

.movie-poster {
  width: 150px;
  height: auto;
  border-radius: 0.5rem;
  border: 1px solid #4b5563;
}

.review-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
}

.review-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.header-text {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: 600;
  color: #ffffff;
}

.watched-movie {
  font-size: 0.875rem;
  color: #9ca3af;
}

.watched-movie strong {
  color: #d1d5db;
}

.rating-stars {
  display: flex;
  gap: 0.25rem;
}

.star-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #4b5563;
}

.star-icon.filled {
  color: #f59e0b;
}

.review-text {
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
  flex-grow: 1;
}

.review-footer {
  display: flex;
  justify-content: flex-start;
  margin-top: auto;
}

.like-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  font-size: 0.875rem;
  font-family: inherit;
  transition: color 0.2s ease;
}

.like-button:hover {
  color: #ffffff;
}

.like-button.liked {
  color: #3b82f6;
}

.like-icon {
  width: 1rem;
  height: 1rem;
}

@media (max-width: 640px) {
  .review-entry-card {
    flex-direction: column;
    padding: 1rem;
  }
  .movie-poster {
    width: 100px;
  }
}
</style>

