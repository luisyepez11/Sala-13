<script setup>
</script>

<template>
	<footer class="page-footer">
		<div class="footer-content">
			<div class="footer-section">
				<h3 class="footer-title">Películas</h3>
				<ul class="footer-links">
					<li><router-link to="/home/#seccion-populares" class="footer-link">Populares</router-link></li>
					<li><router-link to="/home/#seccion-accion" class="footer-link">Acción</router-link></li>
					<li><router-link to="/home/#seccion-aventura" class="footer-link">Aventura</router-link></li>
					<li><router-link to="/home/#seccion-animacion" class="footer-link">Animación</router-link></li>
				</ul>
			</div>
			
			<div class="footer-section">
				<h3 class="footer-title">Comunidad</h3>
				<ul class="footer-links">
					<li><router-link to="/homeListas" class="footer-link">Listas</router-link></li>
					<li><router-link to="/timeline" class="footer-link">Reseñas</router-link></li>
					<li><router-link to="/community" class="footer-link">Comunidades</router-link></li>
				</ul>
			</div>
			
			<div class="footer-section">
				<h3 class="footer-title">Soporte</h3>
				<ul class="footer-links">
					<li><router-link to="/ayuda" class="footer-link">Ayuda</router-link></li>
					<li><router-link to="/contacto" class="footer-link">Contacto</router-link></li>
				</ul>
			</div>
			
			<div class="footer-section">
				<h3 class="footer-title">Síguenos</h3>
				<div class="social-links">
					<a href="https://www.tiktok.com/@sala13_tiktok?is_from_webapp=1&sender_device=pc" class="social-link" target="_blank" rel="noopener noreferrer">
						<img src="/src/assets/tiktoklogo.png" alt="Logo de tiktok" class="social-icon">
					</a>
					<a href="https://x.com/sala13991245" class="social-link" target="_blank" rel="noopener noreferrer">
						<img src="/src/assets/xlogo.png" alt="Logo de X" class="social-icon">
					</a>
					<a href="https://www.instagram.com/sala13_ig" class="social-link" target="_blank" rel="noopener noreferrer">
						<img src="/src/assets/iglogo2.png" alt="Logo de instagram" class="social-icon">
					</a>
				</div>
			</div>
		</div>
		
		<div class="footer-bottom">
			<p class="copyright-text">© 2025 Sala 13. Todos los derechos reservados.</p>
		</div>
	</footer>
</template>

<style scoped>
.page-footer {
	background: #0f172a;
	border-top: 1px solid #334155;
	margin-top: 4rem;
}

.footer-content {
	max-width: 1200px;
	margin: 0 auto;
	padding: 3rem 1.5rem 2rem;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	gap: 2rem;
}

.footer-section {
	display: flex;
	flex-direction: column;
}

.footer-title {
	color: #ffffff;
	font-size: 1.125rem;
	font-weight: 600;
	margin-bottom: 1rem;
}

.footer-links {
	list-style: none;
	padding: 0;
	margin: 0;
}

.footer-links li {
	margin-bottom: 0.5rem;
}

.footer-link {
	color: #9ca3af;
	text-decoration: none;
	font-size: 0.875rem;
	transition: color 0.3s ease;
}

.footer-link:hover {
	color: #3b82f6;
}

.social-links {
	display: flex;
	gap: 1rem;
}

.social-link {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 2.5rem;
	height: 2.5rem;
	background: rgba(59, 130, 246, 0.1);
	border-radius: 50%;
	color: #3b82f6;
	transition: all 0.3s ease;
}

.social-link:hover {
	background: #3b82f6;
	color: white;
	transform: translateY(-2px);
}

.social-icon {
	width: 1.25rem;
	height: 1.25rem;
}

.footer-bottom {
	border-top: 1px solid #334155;
	padding: 1.5rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	gap: 1rem;
}

.copyright-text {
	color: #6b7280;
	font-size: 0.875rem;
	margin: 0;
}
</style>

