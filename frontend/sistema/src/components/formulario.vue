<script setup>
import { ref } from "vue";
import axios from "axios";
import modal from "./modal.vue";
import { useRouter } from "vue-router";

const router = useRouter();

axios.defaults.withCredentials = true;

const props = defineProps({
  opcion: String,
});

const opcion = props.opcion;

async function saludar() {
  const nombre = document.getElementById("user").value;
  const contraseña = document.getElementById("password").value;

  if (opcion === "login") {
    try {
      await axios.post(
        "http://localhost:3300/api/usuario/login",
        { user: nombre, password: contraseña },
        { withCredentials: true }
      );
      router.push("/profile");
    } catch (error) {
      console.error("Error en login:", error);
    }
  } else {
    try {
      await axios.post(
        "http://localhost:3300/api/usuario/create",
        { user: nombre, password: contraseña },
        { withCredentials: true }
      );
      router.push("/login");
    } catch (error) {
      console.error("Error al registrar:", error);
    }
  }
}

const modalIsOpen = ref(false);
const newPasswordModalIsOpen = ref(false);
const newPassword = ref('');
const confirmPassword = ref('');
const passwordMismatch = ref(false);

const openModal = () => {
  modalIsOpen.value = true;
};

const closeModal = () => {
  modalIsOpen.value = false;
};

const openNewPasswordModal = () => {
  closeModal(); // Cierra el modal de la pregunta de seguridad
  newPasswordModalIsOpen.value = true;
};

const closeNewPasswordModal = () => {
  newPasswordModalIsOpen.value = false;
  newPassword.value = '';
  confirmPassword.value = '';
  passwordMismatch.value = false;
};

const updatePassword = () => {
  if (newPassword.value !== confirmPassword.value) {
    passwordMismatch.value = true;
    return;
  }
  passwordMismatch.value = false;
  // Lógica para enviar la nueva contraseña al backend
  console.log("Nueva contraseña:", newPassword.value);
  alert("Contraseña actualizada con éxito!");
  closeNewPasswordModal();
};
</script>

<template>
  <modal :is-open="modalIsOpen" @close="closeModal">
    <div class="modal-content">
      <h2>Recuperar Contraseña</h2>
      <p>Selecciona tu pregunta de seguridad y escribe la respuesta para continuar.</p>
      
      <div class="modal-form-fields">
        <select class="custom-select">
          <option value="" disabled selected>Selecciona una pregunta...</option>
          <option value="infancia">Apodo de la infancia</option>
          <option value="abuelo">Nombre de abuelo materno</option>
          <option value="nacimiento">Lugar de nacimiento</option>
        </select>
        <input type="text" class="input-text2" placeholder="Tu respuesta secreta">
      </div>

      <button class="button" @click="openNewPasswordModal">
        <div class="login-now">Enviar</div>
      </button>
    </div>
  </modal>

  <modal :is-open="newPasswordModalIsOpen" @close="closeNewPasswordModal">
    <div class="modal-content">
      <h2>Actualizar Contraseña</h2>
      <p>Ingresa tu nueva contraseña. Debe ser diferente a la actual.</p>

      <div class="modal-form-fields">
        <input 
          type="password" 
          class="input-text2" 
          placeholder="Nueva Contraseña" 
          v-model="newPassword"
        >
        <input 
          type="password" 
          class="input-text2" 
          placeholder="Confirmar Nueva Contraseña" 
          v-model="confirmPassword"
        >
      </div>
      <p v-if="passwordMismatch" style="color: red; margin-top: -10px;">Las contraseñas no coinciden.</p>

      <button class="button" @click="updatePassword">
        <div class="login-now">Actualizar</div>
      </button>
    </div>
  </modal>
  
  <div class="form">
    <div class="form-header">
      <div class="login-to-your-account">{{ opcion === "login" ? "Iniciar Sesión" : "Crear Cuenta" }}</div>
    </div>
    <div class="form-fields">
      <div class="user-email-section">
        <div class="field-label">
          <label class="user">Nombre de Usuario</label>
        </div>
        <div class="field-input">
          <input type="text" class="input-text" id="user" placeholder="Nombre de Usuario">
        </div>
        
        <div v-if="opcion !== 'login'" class="field-label">
          <label class="email">Email</label>
        </div>
        <div v-if="opcion !== 'login'" class="field-input">
          <input type="email" class="input-text" placeholder="ejemplo@gmail.com">
        </div>
      </div>

      <div class="password-section">
        <div class="password-label-row">
          <label class="password">Contraseña</label>
          <p v-if="opcion === 'login'" class="forgot" @click="openModal">¿Olvidaste tu contraseña?</p>
        </div>
        <div class="input">
          <input type="password" class="input-text2" id="password" placeholder="Contraseña">
        </div>
        
        <div v-if="opcion !== 'login'" class="password-label-row">
          <label class="password">Confirmar Contraseña</label>
        </div>
        <div v-if="opcion !== 'login'" class="input">
          <input type="password" class="input-text2" placeholder="Confirmar contraseña">
        </div>

        <div v-if="opcion !== 'login'" class="password-label-row">
          <label class="password">Pregunta de seguridad</label>
        </div>
        <div v-if="opcion !== 'login'" class="input">
          <select class="custom-select">
            <option value="">Apodo de la infancia</option>
            <option value="">Nombre de abuelo materno</option>
            <option value="">Lugar de nacimiento</option>
          </select>
        </div>
        <div v-if="opcion !== 'login'" class="input">
          <input type="text" class="input-text2" placeholder="Respuesta">
        </div>
      </div>
    </div>
    
    <div class="form-actions">
      <button class="button" @click="saludar">
        <div class="login-now">{{ opcion === "login" ? "Iniciar Sesión" : "Registrar" }}</div>
      </button>
      <div class="account-links">
        <div class="don-t-have-an-account">{{ opcion === "login" ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?" }}</div>
        <a class="sign-up" :href="opcion === 'login' ? '/register' : '/login'">{{ opcion === "login" ? "Regístrate" : "Inicia Sesión" }}</a>
      </div>
    </div>
  </div>
</template>
<style>

.form,
.form * {
  box-sizing: border-box;
}
.form {
  background: #213448;
  border-radius: 20px;
  padding: 48px 72px 48px 72px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 500px
}
.form-header {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  justify-content: flex-start;
  align-self: stretch;
  flex-shrink: 0;
  position: relative;
}
.modal-content {
  background: #213448; 
  border-radius: 20px;
  padding: 32px 48px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  text-align: center;
  width: 90%;
  max-width: 450px;
}

.modal-content h2 {
  color: #ecefca;
  font-family: "Poppins-SemiBold", sans-serif;
  font-size: 24px;
  margin: 0;
}

.modal-content p {
  color: #98a2b3;
  font-family: "Poppins-Regular", sans-serif;
  font-size: 16px;
  margin: 0 0 16px 0; 
}

.modal-form-fields {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}


.modal-content .button {
  align-self: stretch;
}


.form,
.form * {
  box-sizing: border-box;
}
.login-to-your-account {
  color: #ecefca;
  text-align: left;
  font-family: var(--heading-font-family, "Poppins-SemiBold", sans-serif);
  font-size: var(--heading-font-size, 28px);
  line-height: var(--heading-line-height, 100%);
  font-weight: var(--heading-font-weight, 600);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.form-fields {
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;
  justify-content: flex-start;
  align-self: stretch;
  flex-shrink: 0;
  position: relative;
}
.user-email-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
  justify-content: flex-start;
  align-self: stretch;
  flex-shrink: 0;
  position: relative;
}
.field-label {
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: flex-start;
  justify-content: flex-start;
  align-self: stretch;
  flex-shrink: 0;
  position: relative;
}
.email,.user {
  color: var(--foreground-low, #98a2b3);
  text-align: left;
  font-family: var(
    --body-large-regular-font-family,
    "Poppins-Regular",
    sans-serif
  );
  font-size: var(--body-large-regular-font-size, 16px);
  line-height: var(--body-large-regular-line-height, 100%);
  font-weight: var(--body-large-regular-font-weight, 400);
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.field-input {
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: flex-start;
  justify-content: flex-start;
  align-self: stretch;
  flex-shrink: 0;
  height: 48px;
  position: relative;
}
.input-text {
  border-radius: 8px;
  border-style: solid;
  border-color: var(--outline-primary, #d1e9ff);
  border-width: 3px;
  padding: 12px 16px;
  display: flex;
  align-self: stretch;
  flex: 1;
  position: relative;
  background: transparent;
  color: var(--foreground-low, #98a2b3);
  font-family: var(
    --body-medium-regular-font-family,
    "Poppins-Regular",
    sans-serif
  );
  font-size: var(--body-medium-regular-font-size, 14px);
}
.password-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
  justify-content: flex-start;
  align-self: stretch;
  flex-shrink: 0;
  position: relative;
}
.password-label-row {
  display: flex;
  flex-direction: row;
  gap: 0px;
  align-items: flex-start;
  justify-content: flex-start;
  align-self: stretch;
  flex-shrink: 0;
  position: relative;
}
.password {
  color: #94b4c1;
  text-align: left;
  font-family: var(
    --body-large-regular-font-family,
    "Poppins-Regular",
    sans-serif
  );
  font-size: var(--body-large-regular-font-size, 16px);
  line-height: var(--body-large-regular-line-height, 100%);
  font-weight: var(--body-large-regular-font-weight, 400);
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.forgot {
  color: #ecefca;
  text-align: right;
  font-family: var(
    --body-large-regular-font-family,
    "Poppins-Regular",
    sans-serif
  );
  font-size: var(--body-large-regular-font-size, 16px);
  line-height: var(--body-large-regular-line-height, 100%);
  font-weight: var(--body-large-regular-font-weight, 400);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.input {
  border-style: solid;
  border-color: rgba(0, 0, 0, 0);
  border-width: 1px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
  justify-content: flex-start;
  align-self: stretch;
  flex-shrink: 0;
  height: 48px;
  position: relative;
}
.input-text2 {
  border-radius: 8px;
  border-style: solid;
  border-color: #ffffff;
  border-width: 2px;
  padding: 12px 16px;
  display: flex;
  align-self: stretch;
  flex: 1;
  position: relative;
  background: transparent;
  color: #9998b3;
  font-family: var(
    --body-medium-regular-font-family,
    "Poppins-Regular",
    sans-serif
  );
  font-size: var(--body-medium-regular-font-size, 14px);
}

/* Estilos específicos para el select */
.custom-select {
  border-radius: 8px;
  border: 2px solid #ffffff;
  padding: 12px 16px;
  width: 100%;
  height: 100%;
  background: transparent;
  color: #9998b3;
  font-family: var(
    --body-medium-regular-font-family,
    "Poppins-Regular",
    sans-serif
  );
  font-size: var(--body-medium-regular-font-size, 14px);
  appearance: none; /* Elimina el estilo por defecto del navegador */
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239998b3' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  background-size: 16px;
  cursor: pointer;
}

.custom-select:focus {
  outline: none;
  border-color: #94b4c1;
}

.custom-select option {
  background: #213448;
  color: #ecefca;
}

/* Para navegadores WebKit (Chrome, Safari) */
.custom-select::-webkit-scrollbar {
  width: 8px;
}

.custom-select::-webkit-scrollbar-track {
  background: #213448;
  border-radius: 4px;
}

.custom-select::-webkit-scrollbar-thumb {
  background: #94b4c1;
  border-radius: 4px;
}

.form-actions {
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  justify-content: flex-start;
  align-self: stretch;
  flex-shrink: 0;
  position: relative;
}
.button {
  background: #94b4c1;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
  justify-content: center;
  align-self: stretch;
  flex-shrink: 0;
  height: 52px;
  position: relative;
  border: none;
  cursor: pointer;
}
.login-now {
  color: var(--foreground-high, #101828);
  text-align: left;
  font-family: var(
    --body-large-semibold-font-family,
    "Poppins-SemiBold",
    sans-serif
  );
  font-size: var(--body-large-semibold-font-size, 16px);
  line-height: var(--body-large-semibold-line-height, 100%);
  font-weight: var(--body-large-semibold-font-weight, 600);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.account-links {
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: flex-start;
  justify-content: flex-start;
  flex-shrink: 0;
  position: relative;
}
.don-t-have-an-account {
  color: var(--foreground-low, #98a2b3);
  text-align: left;
  font-family: var(
    --body-large-regular-font-family,
    "Poppins-Regular",
    sans-serif
  );
  font-size: var(--body-large-regular-font-size, 16px);
  line-height: var(--body-large-regular-line-height, 100%);
  font-weight: var(--body-large-regular-font-weight, 400);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.sign-up {
  color: #ecefca;
  text-align: left;
  font-family: var(
    --body-large-regular-font-family,
    "Poppins-Regular",
    sans-serif
  );
  font-size: var(--body-large-regular-font-size, 16px);
  line-height: var(--body-large-regular-line-height, 100%);
  font-weight: var(--body-large-regular-font-weight, 400);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
</style>