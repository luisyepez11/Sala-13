<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
axios.defaults.withCredentials = true
const router = useRouter()

const props = defineProps({ idUsuario: String,nombre: String })
console.log(idPelicula)
</script>

<template>

</template>

<style scoped>

</style>