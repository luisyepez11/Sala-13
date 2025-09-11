<script setup>
import Nav from '../components/navegacio.vue'
import Footer from '../components/Footer.vue'
</script>

<template>
	<div class="contact-page-container">
		<Nav />
		<main class="main-content">
			<div class="contact-card">
				<h1 class="page-title">Contacto de Soporte</h1>
				<p class="contact-description">
					Si necesitas ayuda, tienes alguna pregunta o quieres reportar un problema, no dudes en escribirnos. Nuestro equipo de soporte está aquí para ayudarte.
				</p>
				<div class="email-container">
					<a href="mailto:sala13soporte@gmail.com" class="email-link">sala13soporte@gmail.com</a>
				</div>
			</div>
		</main>
		<Footer />
	</div>
</template>

<style scoped>
.contact-page-container {
	background: #091f32;
	min-height: 100vh;
	color: #ffffff;
	font-family: "Poppins", sans-serif;
	display: flex;
	flex-direction: column;
}
.main-content {
	max-width: 1200px;
	width: 100%;
	margin: 0 auto;
	padding: 4rem 1.5rem;
	flex-grow: 1;
	display: flex;
	justify-content: center;
	align-items: center;
}
.contact-card {
	background-color: #1f2937;
	border-radius: 1rem;
	padding: 3rem;
	text-align: center;
	max-width: 600px;
	width: 100%;
	border: 1px solid #334155;
}
.page-title {
	font-size: 2rem;
	font-weight: 700;
	margin: 0 0 1rem 0;
}
.contact-description {
	color: #d1d5db;
	font-size: 1rem;
	line-height: 1.6;
	margin-bottom: 2rem;
}
.email-container {
	background-color: #374151;
	border-radius: 8px;
	padding: 1rem 1.5rem;
	display: inline-block;
	transition: background-color 0.3s ease;
}
.email-container:hover {
	background-color: #4b5563;
}
.email-link {
	color: #ffffff;
	font-weight: 600;
	font-size: 1.125rem;
	text-decoration: none;
}
</style>

