<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const listas = ref([])

onMounted(async () => {
  try {
    const resp = await fetch(`http://localhost:3300/api/lista/getListas`)
    const datos = await resp.json()
    listas.value = datos
  } catch (e) {
    console.error('Error al cargar las listas:', e)
  }
})

const goToDetail = (idLista) => {
  router.push(`/listDetail/${idLista}`)
}
</script>

<template>
  <div class="listas-row">
    <div
      v-for="lista in listas"
      :key="lista.idLista"
      class="lista-card"
      @click="goToDetail(lista.idLista)"
    >
      <div class="lista-info">
        <h2 class="lista-title">{{ lista.nombreLista }}</h2>
        <p class="lista-description">{{ lista.descripcion }}</p>
      </div>
    </div>

    <div class="lista-card create-card" @click="router.push('/crearLista')">
      <div class="lista-info">
        <h2 class="lista-title">+ Crear nueva lista</h2>
        <p class="lista-description">Empieza a organizar tus películas</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.listas-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
}

.lista-card {
  background: #1f2937;
  border-radius: 12px;
  overflow: hidden;
  width: 200px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  cursor: pointer;
}

.lista-card:hover {
  transform: translateY(-5px);
}

.lista-info {
  padding: 1rem;
  color: #ffffff;
}

.lista-title {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.lista-description {
  font-size: 0.9rem;
  color: #9ca3af;
}

.create-card {
  background: rgba(75, 85, 99, 0.3);
  border: 2px dashed #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.create-card:hover {
  background: rgba(75, 85, 99, 0.5);
}
</style>
