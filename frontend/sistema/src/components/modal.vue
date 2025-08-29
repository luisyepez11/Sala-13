<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  isOpen: Boolean,
  showActions: { type: Boolean, default: true }
});

const emit = defineEmits(['close', 'confirm']);

const closeModal = () => {
  emit('close');
};
</script>

<template>

  <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">

    <div class="modal-container">

      <button class="modal-close" @click="closeModal">×</button>

      <slot></slot>

      <div class="modal-actions" v-if="showActions">
        <button @click="closeModal">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
}

.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}
</style>