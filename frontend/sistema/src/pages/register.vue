<script setup>
import Form from '../components/formulario.vue'
import Footer from '../components/Footer.vue'
</script>

<template>
  <div class="content">
    <Form opcion="create"></Form>
  </div>
  <Footer />
</template>

<style scoped>
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 130vh; 
  width: 100%;
}
</style>