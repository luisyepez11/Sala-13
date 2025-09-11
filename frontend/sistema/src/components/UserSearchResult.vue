<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

defineProps({
  users: {
    type: Array,
    required: true,
    default: () => []
  }
});

const mockUsers = ref([
  { idcuenta: 1, nombreCuenta: 'Cinefilo77' },
  { idcuenta: 2, nombreCuenta: 'PeliFan' },
  { idcuenta: 3, nombreCuenta: 'Alejandro' },
  { idcuenta: 4, nombreCuenta: 'Maria_C' },
  { idcuenta: 5, nombreCuenta: 'GamerGod' },
  { idcuenta: 6, nombreCuenta: 'Laura_Art' },
  { idcuenta: 7, nombreCuenta: 'PedroP' },
  { idcuenta: 8, nombreCuenta: 'Sofia_R' },
]);

function followUser(userId) {
  console.log(`Siguiendo al usuario con ID: ${userId}`);
}

function goToProfile(userId) {
	router.push(`/profile/${userId}`);
}
</script>

<template>
  <div class="user-results-container">
    <div class="user-grid">
      <div v-for="user in mockUsers" :key="user.idcuenta" class="user-card" @click="goToProfile(user.idcuenta)">
        <div class="avatar-placeholder">
          <svg class="avatar-icon" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
          </svg>
        </div>
        <span class="user-name">{{ user.nombreCuenta }}</span>
        <button class="follow-button" @click.stop="followUser(user.idcuenta)">Seguir</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-results-container {
  padding-top: 2rem;
}
.user-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1.5rem;
}
.user-card {
  background-color: #3b82f6;
  border-radius: 12px;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}
.user-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
}
.avatar-placeholder {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}
.avatar-icon {
  width: 40px;
  height: 40px;
  color: #e0e7ff;
}
.user-name {
  color: #ffffff;
  font-weight: 600;
  font-size: 1.125rem;
  margin-bottom: 1rem;
}
.follow-button {
  background-color: #1e40af;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1.5rem;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.2s;
}
.follow-button:hover {
  background-color: #1d4ed8;
}
.no-results-message {
	text-align: center;
	padding: 3rem;
	color: #9ca3af;
	font-size: 1.2rem;
}
</style>

