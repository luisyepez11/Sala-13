<script setup>
// Función para navegar al perfil
const navigateToProfile = () => {
  window.location.href = '/profile'
}

// Función para navegar al home
const navigateToHome = () => {
  window.location.href = '/'
}
</script>

<template>
<div class="header-nav">
<div class="nav-content">
        <div class="nav-left">
          <div class="logo-container">
            <button class="logo-circle" @click="navigateToProfile">
              <svg class="logo-icon" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
              </svg>
            </button>
          </div>
          <div class="nav-links">
            <button @click="navigateToHome" class="nav-link nav-button-link">Home</button>
            <a href="#" class="nav-link">Films</a>
            <a href="#" class="nav-link">Lists</a>
            <a href="#" class="nav-link">Communities</a>
          </div>
        </div>
        
        <div class="search-container">
          <div class="search-wrapper">
            <input type="text" class="search-input" placeholder="search">
            <button class="search-button">
              <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
</div>
</template>

<style>
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
  background: #2b3a6e;
  border-bottom: 1px solid #334155;
  position: relative;
}

.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: max-content;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 32px;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo-circle {
  width: 32px;
  height: 32px;
  background: #d1d5db;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
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

/* Estilos específicos para el botón Home */
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
  right: 8px;
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
</style>