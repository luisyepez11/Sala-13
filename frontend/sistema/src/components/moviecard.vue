<script setup>
import { ref } from 'vue'

const props = defineProps({
  movie: {
    type: Object,
    required: true,
    default: () => ({
      id: 1,
      title: "Movie Title",
      poster: "/placeholder.svg?height=300&width=200",
      rating: 4.5,
      views: 1200,
      likes: 89,
      year: 2024
    })
  }
})

const isHovered = ref(false)
const isLiked = ref(false)

const handleLike = () => {
  isLiked.value = !isLiked.value
}

const handleWatch = () => {
  console.log(`Watching movie: ${props.movie.title}`)
}
</script>

<template>
  <div 
    class="movie-card"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- Poster Container -->
    <div class="poster-container">
      <img 
        :src="movie.poster" 
        :alt="movie.title"
        class="poster-image"
      />
      
      <!-- Hover Overlay -->
      <div :class="['hover-overlay', { 'visible': isHovered }]">
        <button class="play-btn" @click="handleWatch">
          <svg class="play-icon" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Movie Title -->
    <h3 class="movie-title">{{ movie.title }}</h3>
    
    <!-- Movie Stats -->
    <div class="movie-stats">
      <span class="stat">
        <svg class="stat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 15C3.732 13.943 6.522 12 10 12s6.268 1.943 7.542 5c-1.274 2.057-4.064 4-7.542 4S3.732 17.057 2.458 15z"/>
        </svg>
        {{ movie.views }}
      </span>
      
      <span class="stat">
        <svg class="stat-icon" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
        </svg>
        {{ movie.likes }}
      </span>
      
      <span class="stat">
        <svg class="stat-icon" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
        {{ movie.rating }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.movie-card {
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.movie-card:hover {
  transform: translateY(-8px);
}

.poster-container {
  position: relative;
  width: 100%;
  aspect-ratio: 2/3;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 0.75rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  transition: box-shadow 0.3s ease;
}

.movie-card:hover .poster-container {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
}

.poster-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.movie-card:hover .poster-image {
  transform: scale(1.05);
}

.hover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.hover-overlay.visible {
  opacity: 1;
}

.play-btn {
  background: rgba(255, 255, 255, 0.95);
  border: none;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.play-btn:hover {
  background: white;
  transform: scale(1.1);
}

.play-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #1f2937;
  margin-left: 0.125rem;
}

.movie-title {
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-align: left;
}

.movie-stats {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  opacity: 0.7;
}

.stat {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #9ca3af;
  font-size: 0.75rem;
  font-weight: 500;
}

.stat-icon {
  width: 0.875rem;
  height: 0.875rem;
  opacity: 0.8;
}

/* Responsive Design */
@media (max-width: 768px) {
  .poster-container {
    border-radius: 6px;
    margin-bottom: 0.5rem;
  }
  
  .movie-title {
    font-size: 0.8125rem;
  }
  
  .play-btn {
    width: 2.5rem;
    height: 2.5rem;
  }
  
  .play-icon {
    width: 1rem;
    height: 1rem;
  }
  
  .movie-stats {
    gap: 0.5rem;
  }
  
  .stat {
    font-size: 0.6875rem;
  }
  
  .stat-icon {
    width: 0.75rem;
    height: 0.75rem;
  }
}

@media (max-width: 480px) {
  .movie-title {
    font-size: 0.75rem;
    margin-bottom: 0.375rem;
  }
  
  .movie-stats {
    gap: 0.375rem;
  }
  
  .stat {
    font-size: 0.625rem;
  }
}
</style>