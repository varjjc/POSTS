Aplicación de Gestión de Posts

Esta aplicación de tipo web ha sido desarrollada con React y consume la API REST de JSONPlaceholder. La aplicación permite:

Listar posts con paginación. Crear nuevos posts. Editar posts existentes. Eliminar posts. 

Incluye SOLID principios, TDD y pruebas unitarias con Jest y React Testing Library

Tecnologías utilizadas
React: Framework o biblioteca principal para la construcción de la interfaz de usuario de la aplicación.
React Router: Gestión de rutas y navegación.
Material UI (MUI): Estilizado de componentes y diseño responsivo.
JSONPlaceholder API: Proveedor de datos para los posts.
Jest y React Testing Library: Herramientas para pruebas unitarias.
Requisitos
Asegúrate de tener previamente instalado lo siguiente:
Node.js (v14 o superior).
npm o yarn.
Instalación
Clona este repositorio localmente. 
bash
Copy code
git clone https://github.com/varjjc/POSTS
cd tu-repositorio

Instala las dependencias: 
bash
Copy code
npm install

Inicia el servidor de desarrollo: 
bash
Copy code
npm start

La aplicación estará disponible en http://localhost:3000. Uso
Navegación
Página Principal (/): Muestra lista de posts paginados y permite eliminar posts con su correspondiente botón de eliminar.
Nuevo Post (/new): Posibilita crear nuevos posts generando vista previa del contenido antes de guardar.
Editar Post (/edit/:id): Posibilita editar los posts existentes generando vista previa del contenido antes de guardar.
Funciones
Paginación: La lista de posts está paginada para facilitar la navegación.
Eliminar: Persisten los posts junto a su botón de eliminar.
Crear - Editar: Formulario para crear un nuevo post - formulario para editar un post existente, manteniendo validaciones básicas sobre título y contenido, además de una vista previa del contenido antes de su respectivo proceso de creación/ edición/ eliminación.
Estructura del proyecto
bash
Copy code
src/
├── components/
│ ├── postForm.jsx          # Componente que puede ser reutilizado para formularios de posts.
│ ├── postTable.jsx         # Tabla para listar posts, incluyendo su botón de eliminar.
│ ├── modalNotification.jsx  
├── pages/
│ ├── homePage.jsx          # Página principal que lista los posts.
│ ├── newPostPage.jsx       # Página para crear un nuevo post.
│ ├── editPostPage.jsx      # Página para editar un post existente.
├── services/
│ ├── apiClient.js 
│ ├── postService.js        # Lógica para interactuar con la API REST.
├── tests/
├── App.js                    # Configuraciones de rutas principales.