<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();


const props = defineProps({
    buscar: {
        type: Function,
        required: true,
    },
});

const logueado = ref(false);
const profilePictureUrl = ref(null);
const PROFILE_PIC_KEY = 'user_profile_picture';

const cargar = async () => {
    try {
        const usuarioId = await axios.get("http://localhost:3300/api/usuario/user");
        logueado.value = usuarioId.data.message !== "no registrado";
        
        if (logueado.value) {
            const storedPic = localStorage.getItem(PROFILE_PIC_KEY);
            if (storedPic) {
                profilePictureUrl.value = storedPic;
            }
        } else {
            profilePictureUrl.value = null;
        }
    } catch (error) {
        console.error("Error al verificar autenticación:", error);
        logueado.value = false;
        profilePictureUrl.value = null;
    }
};

const realizarBusqueda = async () => {
    try {
        const buscarInput = document.getElementById("busqueda");
        if (buscarInput && buscarInput.value) {
            await props.buscar(reemplazarEspacios(buscarInput.value));
        }
    } catch (error) {
        console.error('Error en la búsqueda:', error);
    }
};

const reemplazarEspacios = (texto) => {
    if (!texto) return '';
    return texto.replace(/\s+/g, '+');
};

const deleteUser = async () => {
    try {
        await axios.get("http://localhost:3300/api/usuario/delete");
        profilePictureUrl.value = null;
        logueado.value = false;
        router.push('/');
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
    }
};

const navigateToLogin = () => {
    router.push('/login');
};

const navigateToProfile = () => {
    router.push('/profile');
};

const navigateToHome = () => {
    router.push('/home');
};

onMounted(() => {
    cargar();
});
</script>

<template>
<div class="header-nav">
    <div class="nav-content">
        <div class="nav-left">
            <div class="app-logo-container">
                <button @click="navigateToHome" class="app-logo-button">
                    <img src="/src/assets/logo.png" alt="SALA 13 Logo" class="app-logo">
                </button>
            </div>
            <div class="logo-container">
                <button class="logo-circle" @click="navigateToProfile">
                    <img 
                        v-if="logueado && profilePictureUrl" 
                        :src="profilePictureUrl" 
                        alt="Foto de perfil" 
                        class="profile-image"
                    >
                    <svg v-else class="logo-icon" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                        <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
                    </svg>
                </button>
            </div>
            <div class="nav-links">
                <button @click="navigateToHome" class="nav-link nav-button-link">Inicio</button>
                <a href="/timeline" class="nav-link">Timeline</a>
                <a href="/homeListas" class="nav-link">Listas</a>
                <a href="/community" class="nav-link">Comunidades</a>
            </div>
        </div>
        
        <div class="search-container">
            <div class="search-wrapper">
                <input type="text" class="search-input" placeholder="Buscar" id="busqueda">
                <button class="search-button" @click="realizarBusqueda">
                    <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                </button>
            </div>
        </div>
        
        <div>
            <button v-if="logueado" class="edit-button" @click="deleteUser" style="margin-top: 0;">
                <p>Salir</p>
            </button>
            <button v-else class="edit-button" @click="navigateToLogin" style="margin-top: 0;">
                <p>Iniciar sesión</p>
            </button>
        </div>
    </div>
</div>
</template>

<style scoped>
.perfil-container,
.perfil-container * {
    box-sizing: border-box;
}

.perfil-container {
    background: #091f32;
    min-height: 100vh;
    color: #ffffff;
    font-family: "Poppins-Regular", sans-serif;
}

.header-nav {
    background: #10246f;
    border-bottom: 1px solid #10246f;
    position: relative;
}

.nav-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px 24px;
    display: flex;
    gap:5rem;
    align-items: center;
    justify-content: space-between;
    height: max-content;
}

.nav-left {
    display: flex;
    align-items: center;
    gap: 32px;
}

.app-logo-container {
    display: flex;
    align-items: center;
}

.app-logo-button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
}

.app-logo {
    height: 55px; 
    width: auto;
    display: block;
}

.logo-container {
    display: flex;
    align-items: center;
}

.logo-circle {
    width: 40px;
    height: 40px;
    background: #d1d5db;
    border-radius:50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    overflow: hidden;
}

.logo-circle:hover {
    background: #f3f4f6;
    transform: scale(1.05);
}

.logo-icon {
    width: 20px;
    height: 20px;
    color: #6b7280;
}

.nav-links {
    display: flex;
    gap: 24px;
}

.nav-link {
    color: #d1d5db;
    text-decoration: none;
    font-size: 1.2rem;
    font-weight: 600;
    transition: color 0.2s;
}

.nav-link:hover {
    color: #ffffff;
}

.nav-button-link {
    background: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
    font-size: 1.2rem;
    font-weight: 600;
    padding: 0;
}

.nav-button-link:hover {
    color: #ffffff;
}

.search-container {
    flex: 1;
    max-width: 400px;
    margin: 0 24px;
}

.search-wrapper {
    position: relative;
}

.search-input {
    width: 100%;
    background: #4a5c75;
    border: 1px solid #475569;
    border-radius: 6px;
    padding: 8px 40px 8px 16px;
    font-size: 14px;
    color: #ffffff;
    outline: none;
}

.search-input::placeholder {
    color: #9ca3af;
}

.search-button {
    position: absolute;
    right: -3rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
}

.search-icon {
    width: 16px;
    height: 16px;
    color: #9ca3af;
}

.profile-image {
    width: 150%;
    height: 150%;
    object-fit:fill;
    display: block;
}
</style>

