<script setup>
import Form from '../components/formulario.vue'
import Nav from '../components/navegacio.vue'
import Footer from '../components/Footer.vue'
</script>

<template>

  <div class="content">
    <Form opcion="login"></Form>
  </div>
  <Footer />
</template>

<style scoped>
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; 
  width: 100%;
}
</style>