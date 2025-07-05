<script setup>
import {ref} from "vue"
import axios from 'axios';
axios.defaults.withCredentials = true;
  const props = defineProps({
  opcion: String
  });
  console.log(props.opcion)
  const opcion = props.opcion
  async function saludar(){
    const nombre = document.getElementById("user").value
    const contraseña = document.getElementById("password").value
    if (opcion=="login"){
      try {
        const result = await axios.post(`http://localhost:3300/api/usuario/login`,{
          user: nombre,
          password:contraseña
        })
      } catch (error) {
        
      }
    }
    else{
      try {
        const result = await axios.post(`http://localhost:3300/api/usuario/create`,{
          user: nombre,
          password:contraseña
        })
      } catch (error) {
        
      }
    }
  }
</script>
<template>
  <div class="form">
    <div class="form-header">
      <div class="login-to-your-account">{{ opcion==="login" ? "Login to your account" : "Create Account"}}</div>
    </div>
    <div class="form-fields">
      <div class="user-email-section">
        <div class="field-label">
          <label  class="user">User</label>
        </div>
        <div  class="field-input">
          <input type="text" class="input-text" id="user" placeholder="user.....">
        </div>
        
        <div v-if="opcion !=='login'" class="field-label">
          <label  class="email">Email</label>
        </div>
        <div v-if="opcion !=='login'" class="field-input">
          <input  type="email" class="input-text" placeholder="balamia@gmail.com">
        </div>
        
      </div>
      <div class="password-section">
        <div class="password-label-row">
          <label class="password">Password</label>
          <a v-if="opcion==='login'" class="forgot" href="#">Forgot？</a>
        </div>
        <div class="input">
          <input type="password" class="input-text2" id="password" placeholder="Enter your password">
        </div>
        
        <div v-if="opcion!=='login'" class="password-label-row">
          <label class="password">Confirm your password</label>
        </div>
        <div v-if="opcion!=='login'" class="input">
          <input type="password" class="input-text2"  placeholder="Confirm your password">
        </div>

      </div>
    </div>
    <div class="form-actions">
      <button class="button" @click="saludar">
        <div class="login-now">{{ opcion==="login" ? "Login now" : "Sign Up"}}</div>
      </button>
      <div class="account-links">
        <div class="don-t-have-an-account">{{ opcion==="login" ? "Don't have an account ?" : "Already have an account ?"}}</div>
        <a class="sign-up" :href="opcion === 'login' ? '/register' : '/login'">{{ opcion === "login" ? "Sign up" : "Sign in" }}</a>
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