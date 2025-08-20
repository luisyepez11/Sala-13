<script setup>
import { ref } from 'vue';
import CommunityMessage from './CommunityMessage.vue';
import io from "socket.io-client"

const socket = io("http://localhost:3300")
const props = defineProps({
  title: {
    type: String,
    default: 'Fans del Terror'
  }
});

const newMessage = ref("");
const messages = ref([
  {
    id: 1,
    userName: 'Yo',
    idCuenta: '1',
    comment: '¿Ustedes vieron Hereditary más de una vez? No sé por qué, pero me traumó más la segunda vez'
  },
  // ... otros mensajes existentes
]);

const submitReview = () => {
  if (newMessage.value.trim() !== "") {
    socket.emit("mensaje", {
      id: messages.value.length + 1, // Mejor generación de ID
      userName: 'Yo', // Deberías obtener esto de tu sistema de autenticación
      idCuenta: '1', // Esto también debería venir de tu auth
      comment: newMessage.value,
      sala: 1
    });
    newMessage.value = "";
  }
};

// Listener corregido
socket.on("mensaje", (nuevoMensaje) => {
  console.log("Nuevo mensaje recibido:", nuevoMensaje);
  // Agregar directamente al array de mensajes
  messages.value.push({
    id: messages.value.length > 0 
      ? Math.max(...messages.value.map(m => m.id)) + 1 
      : 1,
    userName: nuevoMensaje.userName,
    idCuenta: nuevoMensaje.idCuenta,
    comment: nuevoMensaje.mensaje
  });
});
</script>

<template>
  <div class="community-chat">
    <div class="chat-header">
      <div class="avatar-container">
          <div class="avatar-placeholder">{{ title[0] }}</div>
      </div>
      <h2 class="chat-title">{{ title }}</h2>
    </div>
    <div class="chat-messages">
      <CommunityMessage 
        v-for="message in messages" 
        :key="message.id"
        :userName="message.userName"
        :idCuenta="message.idCuenta"
        :comment="message.comment"
      />
    </div>
    <div class="message-container">
      <textarea 
        v-model="newMessage"
        placeholder="Comparte tu opinión aquí..."
        class="message-textarea"
        id="comentario"
      ></textarea>
      <button @click="submitReview" class="btn-submit">Enviar mensaje</button>    
    </div>
  </div>
</template>

<style scoped>
.community-chat {
  background: #111827;
  border-radius: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
}

.chat-header {
  display: flex;
  justify-content:flex-start;
  align-items: center;
  background: #1F2937;
  padding: 1rem;
  border-bottom: 1px solid #374151;
}
.avatar-container {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 0.75rem;
  flex-shrink: 0;
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
.chat-title {
  color: #ffffff;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.chat-messages {
  padding: 1rem;
  flex: 1;
  overflow-y: auto;
}

/* Estilo para la barra de desplazamiento */
.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-track {
  background: #1F2937;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: #4B5563;
  border-radius: 3px;
}

.chat-messages::-webkit-scrollbar-thumb:hover {
  background: #6B7280;
}
.message-container {
  padding: 1rem;
  background: #111827;
  border-top: 1px solid #374151;
  display: flex;
  align-items: center;
  flex-direction: row;
}

.message-textarea {
  width: 100%;
  min-height: 40px;
  padding: 0.75rem;
  background: #1F2937;
  color: #ffffff;
  border: 1px solid #374151;
  border-radius: 8px;
  resize: vertical;
  font-family: inherit;
  
}

.message-textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
}

.btn-submit {
  
  background: #3b82f6;
  margin-left: 5px;
  color: #ffffff;
  font-weight: 600;
  padding: 0.5rem 1.25rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-submit:hover {
  background: #2563eb;
}
</style>