<script setup>
import Nav from '../components/navegacio.vue'
import Footer from '../components/Footer.vue'
</script>

<template>
	<div class="pdf-viewer-page">
		<Nav />
		<main class="main-content">
			<h1 class="page-title">Manual de Usuario</h1>
			<div class="pdf-container">
				<embed src="/manual_de_usuario.pdf" type="application/pdf" width="100%" height="100%">
			</div>
		</main>
		<Footer />
	</div>
</template>

<style scoped>
.pdf-viewer-page {
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
	padding: 2rem 1.5rem;
	flex-grow: 1;
	display: flex;
	flex-direction: column;
}
.page-title {
	font-size: 2rem;
	font-weight: 700;
	margin-bottom: 2rem;
	text-align: center;
}
.pdf-container {
	flex-grow: 1;
	width: 100%;
	height: 80vh;
	border-radius: 8px;
	overflow: hidden;
}
</style>
