<script setup>
import { ref } from 'vue';
  import { useRouter } from 'vue-router';
const props = defineProps({
  userAvatar: {
    type: String,
    default: ''
  },
  userName: {
    type: String,
    required: true
  },
  idCuenta: {
    type: String,
    required: true
  }
  ,
  comment: {
    type: String,
    required: true
  }
});

const router = useRouter()
const cargarUsuario =()=>{
  router.push('/otherProfile/'+props.idCuenta);
}
</script>

<template>
  <div class="message-comment" >
    <div class="user-info" >
      <div class="avatar-container" @click="cargarUsuario" @touchstart="cargarUsuario">
        <img v-if="userAvatar" :src="userAvatar" :alt="userName" class="avatar" >
        <div v-else class="avatar-placeholder">
          {{ userName.charAt(0).toUpperCase() }}
        </div>
      </div>
      <div class="user-details" >
        <h3 class="username" >{{ userName }}</h3>
        <p class="comment-text">{{ comment }}</p>
      </div>
    </div>
    
  </div>
</template>

<style scoped>
.message-comment {
  background: rgba(17, 24, 39, 0.7);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 0.5rem;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.avatar-container {
  pointer-events: auto ;
  position: relative;
  z-index: 10;
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

.comment-text {
  color: #d1d5db;
  background: #2b3a6e;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;
}
</style>