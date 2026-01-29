<script setup>
import { ref, watch, onUnmounted,onMounted, nextTick} from 'vue';
import CommunityMessage from './CommunityMessage.vue';
import io from "socket.io-client"
import axios from 'axios'
axios.defaults.withCredentials = true

const socket = io("https://sala-13.onrender.com", {
	transports: ['websocket', 'polling'],
	withCredentials: true,
})


const props = defineProps({
	title: {
		type: String,
		default: 'Fans del Terror'
	},
	comunidadId: {
		type: String,
		default: null
	},fotoPoster: {
		type: String,
		default: 'Fans del Terror'
	}
});
const newMessage = ref("");
const messages = ref([]);
const currentRoom = ref(null);
const chatContainer = ref(null);

const joinRoom = (roomId) => {
	if (roomId) {
		if (currentRoom.value) {
			socket.emit('leaveRoom', currentRoom.value);
		}
		socket.emit('joinRoom', roomId);
		currentRoom.value = roomId;
		messages.value = [];
		console.log(`Unido a la sala: ${roomId}`);
	}
};


const loadPreviousMessages = async (roomId) => {
	try {
		await datos();
	} catch (error) {
		console.error('Error al cargar mensajes anteriores:', error);
	}
};
const idUsuario = ref("");
const NombreUsuario = ref("");
const fotoPerfil = ref("");
const datos = async () => {
	try {
		const usuarioResponse = await axios.get("https://sala-13.onrender.com/api/usuario/user");
		idUsuario.value = usuarioResponse.data.id;
		NombreUsuario.value = usuarioResponse.data.nombre
		const response = await axios.get(`https://sala-13.onrender.com/api/cuenta/getCuenta/${idUsuario.value}`);
		console.log(response.data)
		fotoPerfil.value = response.data.fotoPerfil
	} catch (error) {
		console.error("Error al obtener datos del usuario:", error);
	}
}


watch(() => props.comunidadId, (newComunidadId, oldComunidadId) => {
	if (newComunidadId && newComunidadId !== oldComunidadId) {
		joinRoom(newComunidadId);
		loadPreviousMessages(newComunidadId);
	}
}, { immediate: true });


const submitReview = () => {
	if (newMessage.value.trim() !== "" && currentRoom.value) {
		console.log("mensaje")
		const userData = {
			id: Date.now(),
			userName: NombreUsuario.value,
			idCuenta: idUsuario.value,
			fotoPerfil:fotoPerfil.value,
			comment: newMessage.value,
			sala: currentRoom.value
		};
		socket.emit("mensaje", userData);
		newMessage.value = "";
	}
};

socket.on("mensaje", (nuevoMensaje) => {
	if (nuevoMensaje.sala === currentRoom.value) {
		messages.value.push({
			id: messages.value.length > 0
				? Math.max(...messages.value.map(m => m.id)) + 1
				: 1,
			userName: nuevoMensaje.userName,
			idCuenta: nuevoMensaje.idCuenta,
			fotoPerfil:nuevoMensaje.fotoPerfil,
			comment: nuevoMensaje.mensaje,
			timestamp: nuevoMensaje.timestamp
		});
		console.log(messages.value)
	}
});

watch(messages, () => {
	nextTick(() => {
		if (chatContainer.value) {
			chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
		}
	});
}, { deep: true });


onUnmounted(() => {
	if (currentRoom.value) {
		socket.emit('leaveRoom', currentRoom.value);
	}
	socket.off("mensaje");
});
</script>

<template>
	<div class="community-chat">
		<div class="chat-header">
			<div class="avatar-container">
				<img :src="props.fotoPoster" alt="Avatar de la comunidad" class="avatar-image">
			</div>
			<h2 class="chat-title">{{ title }}</h2>
			<span class="room-indicator">Sala: {{ currentRoom }}</span>
		</div>
		<div class="chat-messages" ref="chatContainer">
			<div v-if="messages.length === 0" class="no-messages">
				<p>No hay mensajes en esta comunidad</p>
			</div>
			<CommunityMessage 
				v-for="message in messages" 
				:key="message.id"
				:userName="message.userName"
				:fotoPerfil="message.fotoPerfil"
				:idCuenta="message.idCuenta"
				:comment="message.comment"
				:timestamp="message.timestamp"
			/>
		</div>
		<form class="message-container" @submit.prevent="submitReview">
			<textarea 
				v-model="newMessage"
				placeholder="Comparte tu opinión aquí..."
				class="message-textarea"
				id="comentario"
				@keypress.enter.exact.prevent="submitReview"
			></textarea>
			<button type="submit" class="btn-submit">Enviar</button>    
		</form>
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
	justify-content: flex-start;
	align-items: center;
	background: #1F2937;
	padding: 1rem;
	border-bottom: 1px solid #374151;
	position: relative;
}

.avatar-container {
	width: 40px;
	height: 40px;
	border-radius: 50%;
	overflow: hidden;
	margin-right: 0.75rem;
	flex-shrink: 0;
	background-color: #374151;
}

.avatar-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.chat-title {
	color: #ffffff;
	font-size: 1.25rem;
	font-weight: 600;
	margin: 0;
}

.room-indicator {
	position: absolute;
	right: 1rem;
	top: 50%;
	transform: translateY(-50%);
	color: #9ca3af;
	font-size: 0.8rem;
}

.chat-messages {
	padding: 1rem;
	flex: 1;
	overflow-y: auto;
}

.no-messages {
	text-align: center;
	color: #9ca3af;
	padding: 2rem;
}

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
	gap: 0.5rem;
}

.message-textarea {
	flex: 1;
	min-height: 40px;
	max-height: 120px;
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
	color: #ffffff;
	font-weight: 600;
	padding: 0.5rem 1rem;
	border: none;
	border-radius: 6px;
	cursor: pointer;
	transition: background-color 0.3s ease;
	white-space: nowrap;
}

.btn-submit:hover {
	background: #2563eb;
}

.btn-submit:disabled {
	background: #374151;
	cursor: not-allowed;
}
</style>

