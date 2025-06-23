<script setup>
import {ref} from "vue"
  const props = defineProps({
  opcion: String
  });
  console.log(props.opcion)
  const opcion = props.opcion
  function saludar(){
    alert("usuario fue registrado")
  }
</script>
<template>
  <div class="form">
    <div class="frame-10">
      <div class="login-to-your-account">{{ opcion==="login" ? "Login to your account" : "Create Account"}}</div>
    </div>
    <div class="frame-18">
      <div class="frame-26">
        <div v-if="opcion !=='login'" class="frame-27">
          <label  class="user">User</label>
        </div>
        <div v-if="opcion !=='login'" class="frame-17">
          <input type="text" class="input-text" placeholder="user.....">
        </div>
        
        <div class="frame-27">
          <label class="email">Email</label>
        </div>
        <div class="frame-17">
          <input type="email" class="input-text" placeholder="balamia@gmail.com">
        </div>
        
      </div>
      <div class="frame-28">
        <div class="frame-272">
          <label class="password">Password</label>
          <a v-if="opcion==='login'" class="forgot" href="#">Forgot？</a>
        </div>
        <div class="input">
          <input type="password" class="input-text2" placeholder="Enter your password">
        </div>
        
        <div v-if="opcion!=='login'" class="frame-272">
          <label class="password">Confirm your password</label>
        </div>
        <div v-if="opcion!=='login'" class="input">
          <input type="password" class="input-text2" placeholder="Confirm your password">
        </div>

      </div>
    </div>
    <div class="frame-30">
      <button class="button" @click="saludar">
        <div class="login-now">{{ opcion==="login" ? "Login now" : "Sign Up"}}</div>
      </button>
      <div class="frame-29">
        <div class="don-t-have-an-account">{{ opcion==="login" ? "Don't have an account ?" : "Already have an account ?"}}</div>
        <a class="sign-up" href="#">{{ opcion==="login" ? "Sign up" : "Sign in"}}</a>
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
.frame-10 {
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
.frame-18 {
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;
  justify-content: flex-start;
  align-self: stretch;
  flex-shrink: 0;
  position: relative;
}
.frame-26 {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
  justify-content: flex-start;
  align-self: stretch;
  flex-shrink: 0;
  position: relative;
}
.frame-27 {
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
.frame-17 {
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
.frame-28 {

  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
  justify-content: flex-start;
  align-self: stretch;
  flex-shrink: 0;
  position: relative;
}
.frame-272 {
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
.frame-30 {
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
.frame-29 {
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