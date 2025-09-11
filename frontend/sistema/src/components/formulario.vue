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
const aceptaTerminos = ref(false)
const terminosModalIsOpen = ref(false)

const openTerminosModal = () => {
  terminosModalIsOpen.value = true
}

const closeTerminosModal = () => {
  terminosModalIsOpen.value = false
}


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
console.log("Modo:", opcion)
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
  <modal :is-open="terminosModalIsOpen" @close="closeTerminosModal">
  <div class="modal-content scrollable-modal">
    <h2 class="modal-title">Términos y Condiciones</h2>
    <div class="modal-text">
      <p><strong>Última actualización:</strong> 20 de agosto de 2025</p>

      <h3>PREÁMBULO</h3>
      <p>Bienvenido a Sala 13. Los presentes Términos y Condiciones ("Términos", "Acuerdo") constituyen un contrato legalmente vinculante entre usted ("Usuario", "Usted") y Sala 13 ("la Compañía", "Nosotros"), y rigen su acceso y uso de nuestro sitio web, servicios, aplicaciones, contenido y funcionalidades (en conjunto, el "Servicio"). Al acceder, navegar o utilizar el Servicio de cualquier manera, usted declara haber leído, comprendido y aceptado inequívocamente estar obligado por estos Términos y todas las políticas y directrices incorporadas por referencia, incluyendo nuestra Política de Privacidad. Si usted no está de acuerdo con la totalidad de estos Términos, debe abstenerse de utilizar el Servicio de inmediato.</p>

      <h3>1. Aceptación y Capacidad Legal</h3>
      <p>Al crear una cuenta, publicar contenido o utilizar de cualquier forma el Servicio, usted confirma que tiene al menos 13 años de edad o la mayoría de edad legal en su jurisdicción, lo que sea mayor, y que posee la capacidad legal para celebrar este Acuerdo. Si está utilizando el Servicio en nombre de una entidad, corporación u organización, usted declara y garantiza que tiene la autoridad legal para obligar a dicha entidad a estos Términos, en cuyo caso el término "Usuario" se referirá a dicha entidad.</p>

      <h3>2. Descripción y Alcance del Servicio</h3>
      <p>Sala 13 es una plataforma digital interactiva diseñada para que los aficionados al cine puedan descubrir, calificar, reseñar, catalogar y discutir obras cinematográficas; crear, curar y compartir listas de películas; e interactuar con otros usuarios en una comunidad global dedicada al séptimo arte. El Servicio integra y muestra datos, metadatos e imágenes de terceros, como The Movie Database (TMDb), para enriquecer la experiencia del usuario. El Servicio se ofrece "tal cual" y puede ser modificado, actualizado, interrumpido o suspendido a nuestra entera discreción sin previo aviso ni responsabilidad.</p>

      <h3>3. Cuentas de Usuario y Registro</h3>
      <p><strong>Creación de Cuenta:</strong> Usted se compromete a proporcionar información precisa, veraz, actual y completa durante el proceso de registro y a mantenerla diligentemente actualizada.</p>
      <p><strong>Seguridad de la Cuenta:</strong> Usted es el único responsable de salvaguardar la confidencialidad de sus credenciales de acceso.</p>
      <p><strong>Conducta de la Cuenta:</strong> Se prohíbe la creación de cuentas con fines fraudulentos, suplantación de identidad o elusión de políticas.</p>
      <p><strong>Terminación por parte del Usuario:</strong> Usted puede solicitar la eliminación de su cuenta en cualquier momento contactando a nuestro equipo de soporte.</p>

      <h3>4. Contenido del Usuario y Licencia</h3>
      <p><strong>Propiedad del Contenido:</strong> Usted retiene todos los derechos sobre el contenido que crea, sube y publica.</p>
      <p><strong>Licencia Otorgada:</strong> Usted otorga a Sala 13 una licencia mundial, perpetua, irrevocable y sublicenciable para operar y mejorar el Servicio.</p>
      <p><strong>Declaraciones y Garantías:</strong> Usted garantiza que posee los derechos necesarios sobre el contenido y que no infringe derechos de terceros ni leyes aplicables.</p>

      <h3>5. Normas Comunitarias y Usos Prohibidos</h3>
      <p>Usted se compromete a no realizar ninguna de las siguientes actividades:</p>
      <ul>
        <li>Publicar contenido ilegal, fraudulento, obsceno, acosador o difamatorio.</li>
        <li>Publicar spoilers sin advertencias claras.</li>
        <li>Vulnerar derechos de propiedad intelectual o privacidad.</li>
        <li>Suplantar identidades o distribuir spam.</li>
        <li>Recopilar datos de usuarios sin autorización.</li>
        <li>Intentar vulnerar la seguridad del sistema.</li>
        <li>Interferir con el acceso de otros usuarios.</li>
        <li>Realizar ingeniería inversa del Servicio.</li>
      </ul>

      <h3>6. Moderación, Suspensión y Terminación</h3>
      <p>Sala 13 se reserva el derecho de monitorear, editar o eliminar contenido que viole estos Términos. También puede suspender o cancelar cuentas sin previo aviso si se detectan violaciones.</p>

      <h3>7. Propiedad Intelectual de Terceros y DMCA</h3>
      <p>El Servicio utiliza contenido de terceros como TMDb. Sala 13 no reclama propiedad sobre dicho contenido y respeta los derechos de autor. Si cree que su obra ha sido infringida, puede contactar a nuestro agente de derechos de autor conforme a la DMCA.</p>

      <h3>8. Descargo de Garantías y Limitación de Responsabilidad</h3>
      <p>El Servicio se proporciona "tal cual", sin garantías de ningún tipo. Sala 13 no garantiza que el Servicio sea ininterrumpido, seguro o libre de errores. Usted lo utiliza bajo su propio riesgo.</p>
      <p>En ningún caso Sala 13 será responsable por daños indirectos, incidentales o consecuentes derivados del uso del Servicio.</p>

      <h3>9. Indemnización</h3>
      <p>Usted se compromete a indemnizar a Sala 13 por cualquier reclamación derivada de su uso del Servicio, violación de estos Términos o infracción de derechos de terceros.</p>

      <h3>10. Modificaciones a los Términos</h3>
      <p>Nos reservamos el derecho de modificar estos Términos en cualquier momento. Si el cambio es material, se notificará con al menos 30 días de antelación. El uso continuado del Servicio implica aceptación de los cambios.</p>

      <h3>11. Ley Aplicable, Jurisdicción y Disposiciones Generales</h3>
      <p><strong>Ley Aplicable:</strong> Estos Términos se rigen por las leyes de la República Bolivariana de Venezuela.</p>
      <p><strong>Jurisdicción:</strong> Cualquier disputa se resolverá en los tribunales de Valencia, Estado Carabobo.</p>
      <p><strong>Divisibilidad:</strong> Si alguna cláusula es inválida, las demás seguirán vigentes.</p>
      <p><strong>Renuncia:</strong> La renuncia a un término no implica renuncia futura.</p>
      <p><strong>Acuerdo Completo:</strong> Estos Términos constituyen el acuerdo completo entre usted y Sala 13.</p>

      <h3>12. Contacto</h3>
      <p>Para dudas o comentarios, contáctenos en <strong>sala13soporte@gmail.com</strong></p>
    </div>

    <button class="button" @click="closeTerminosModal">
      <div class="login-now">Cerrar</div>
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
</div>
<div class="input">
  <input type="password" class="input-text2" id="password" placeholder="Contraseña">
</div>
<p v-if="opcion === 'login'" class="forgot" @click="openModal">¿Olvidaste tu contraseña?</p>
        
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
    <div v-if="opcion === 'create'" class="terms-section">
  <label class="terms-label">
    <input type="checkbox" v-model="aceptaTerminos" class="terms-checkbox" />
    <span>
      Acepto los 
      <span class="terms-link" @click="openTerminosModal">términos y condiciones</span>
    </span>
  </label>
</div>

    <div class="form-actions">
      <button 
  class="button" 
  @click="saludar" 
  :disabled="opcion === 'create' && !aceptaTerminos"
  :class="{ 'button-disabled': opcion === 'create' && !aceptaTerminos }"
>
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
  align-items: center;
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
.modal-container {
		width: 95vw;
		max-width: 400px;
		max-height: 80vh;
		padding: 30px;
		border-radius: 16px;
		background-color: #0f172a;
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
		overflow-y: auto;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
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
.terms-section {
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: stretch;
}

.terms-label {
  color: #98a2b3;
  font-family: "Poppins-Regular", sans-serif;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 2px
}

.terms-checkbox {
  appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid #94b4c1;
  border-radius: 4px;
  background-color: transparent;
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease;
}

.terms-checkbox:checked {
  background-color: #94b4c1;
  border-color: #94b4c1;
}

.terms-checkbox:checked::after {
  content: "";
  position: absolute;
  top: 2px;
  left: 5px;
  width: 4px;
  height: 9px;
  border: solid #213448;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.terms-link {
  color: #ecefca;
  text-decoration: underline;
  cursor: pointer;
  align-items: center;
}
.button-disabled {
  background-color: #5f7a89 !important;
  cursor: not-allowed;
  opacity: 0.6;
  pointer-events: none;
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
.scrollable-modal {
  max-height: 80vh;
  overflow-y: auto;
  padding-right: 8px;
}

.modal-title {
  font-size: 24px;
  color: #ecefca;
  margin-bottom: 16px;
}

.modal-text {
  color: #98a2b3;
  font-family: "Poppins-Regular", sans-serif;
  font-size: 14px;
  line-height: 1.6;
  text-align: left;
}

.modal-text h3 {
  color: #ecefca;
  font-size: 16px;
  margin-top: 24px;
  margin-bottom: 8px;
}

.modal-text p {
  margin-bottom: 12px;
}

.modal-text ul {
  margin-left: 20px;
  padding-left: 0;
  list-style-type: disc;
}

.modal-text li {
  margin-bottom: 8px;
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
  font-size: 14px;
  margin-top: 4px;
  align-self: flex-end;
  cursor: pointer;
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