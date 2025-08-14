<script setup>
import { ref } from 'vue';

const props = defineProps({
  userAvatar: {
    type: String,
    default: ''
  },
  userName: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    validator: (value) => value >= 0 && value <= 5
  },
  date: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  }
});

const stars = ref(Array(5).fill(false));

// Llenar estrellas basado en el rating
for (let i = 0; i < props.rating; i++) {
  stars.value[i] = true;
}
</script>

<template>
  <div class="review-comment">
    <div class="user-info">
      <div class="avatar-container">
        <img v-if="userAvatar" :src="userAvatar" :alt="userName" class="avatar">
        <div v-else class="avatar-placeholder">
          {{ userName.charAt(0).toUpperCase() }}
        </div>
      </div>
      <div class="user-details">
        <h3 class="username">{{ userName }}</h3>
        <div class="rating">
          <span v-for="(filled, index) in stars" :key="index" class="star">
            ★
          </span>
        </div>
        <span class="date">{{ date }}</span>
      </div>
    </div>
    <p class="comment-text">{{ comment }}</p>
  </div>
</template>

<style scoped>
.review-comment {
  background: rgba(17, 24, 39, 0.7);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.avatar-container {
  width: 48px;
  height: 48px;
  margin-right: 1rem;
  border-radius: 50%;
  overflow: hidden;
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  background: #374151;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: bold;
}

.user-details {
  flex: 1;
}

.username {
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
}

.rating {
  display: flex;
  gap: 0.25rem;
  margin-bottom: 0.25rem;
}

.star {
  color: #fbbf24;
  font-size: 1rem;
}

.date {
  color: #9ca3af;
  font-size: 0.875rem;
}

.comment-text {
  color: #d1d5db;
  font-size: 0.9375rem;
  line-height: 1.5;
  margin: 0;
}
</style>