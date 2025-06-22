# Proyecto Reseña de peliculas

## 📌 Descripción

Este proyecto está estructurado con una arquitectura de **frontend** (Vue.js) y **backend** (Node.js). el flujo de trabajo con ramas y los pasos para instalar y ejecutar correctamente el entorno de desarrollo.

---

## 🧪 Flujo de Trabajo con Ramas

Para mantener un desarrollo organizado y controlado, se seguirá el siguiente flujo de ramas:

1. **main**  
   Contiene el código estable, listo para producción.

2. **develop**  
   Rama base donde se integran las funcionalidades que ya han sido probadas y funcionan correctamente.

3. **feature/nombre-funcionalidad**  
   - Cada nueva funcionalidad debe desarrollarse en una rama que se cree a partir de `develop`.
   - El nombre debe seguir el formato: `feature/nombre-de-lo-que-se-agrega`.  
     Ejemplo: `feature/registro-usuario`
   - Una vez completada y probada, esta rama debe fusionarse (*merge*) con `develop`.
   - Cuando todas las funcionalidades integradas en `develop` estén validadas, se realiza un *merge* final a `main`.

---

### Clonar el repositorio

git clone https://github.com/luisyepez11/Pagina-Calificacion-peliculas.git

### Actualizar a la version mas reciente (recomendable antes de realizar cualquier cambio)

git pull origin nombre_de_la_rama

### Subir cambios
<p>git add .</p>
<p>git commit -m "descripcion"</p>
git pull origin nombre_de_la_rama

### Recordar verificar que vayan a hacer el push a la rama correcta , antes de trabajar verifiquen que esten en la rama en la que desean trabajar
git branch 
