# API Movies - Typescript

Es una api para guardar datos de películas.

## Instalación

Se creó utilizando lo siguiente instalado de manera global:
- mongodb 4.4.9
- node 14.17.6
- npm 6.14.15
- nodemon 2.0.12

Una vez clonado o descargado el proyecto, se debe crear un archivo `.env` con los siguientes valores en el root del proyecto.
```sh
PORT=3000
MONGO_HOST=localhost
MONGO_SCHEMA=api-movies
```

Luego abrir una terminal y ubicarse en el root del proyecto, para instalar las dependencias
```sh
cd api-movies
npm i
```

Gerenear el directorio `dist/` que será donde creará el código javascript que se utilizará en ambientes productivos, para hacer esto debemos ingresar a una terminal en el root del proyecto
```sh
npm run build
```

Para levantar nuestro proyecto con los archivos generados, corremos el siguiente comando en una terminal
```sh
npm start
```

La misma levanta en `http://localhost`, por el puerto configurado en el archivo`.env`.
- `http://localhost:3000`

La API se divide en 3 principales endpoints
- Género: `/api/genres`
- Autor: `/api/authors`
- Película: `/api/movies`

Para cada uno se utilizan los siguientes métodos GET, POST, PUT y DELETE.

- `/api/genres`
  - GET: devuelve `json` con lista de géneros creados
    - `/api/genres/[ID del género a consultar]`
    - Devuelve `json` con el género solicitado
  - POST: crea un nuevo género tomando el `name` del `body`
    - Se debe enviar el `name` en el `body`
    - ```sh
      {
        "name": "Nombre del género a crear"
      }
      ```
    - Devuelve `json` del género creado
  - PUT: edita el género
    - `/api/genres/[ID del género a editar]`
    - Se debe enviar el `name` en el `body`
    - ```sh
      {
        "name": "Nuevo nombre del género a editar"
      }
      ```
    - Devuelve `json` con el género editado
  - DELETE: elimina el género
    - `/api/genres/[ID del género a eliminar]`
    - Devuelve `json` con el género eliminado
- `/api/authors`
  - GET: devuelve `json` con lista de autores creados
    - `/api/authors/[ID del autor a consultar]`
    - Devuelve `json` con el autor solicitado
  - POST: crea un nuevo autor tomando el `name` del `body`
    - Se debe enviar el `name` en el `body`
    - ```sh
      {
        "name": "Nombre del autor"
      }
      ```
    - Devuelve `json` del autor creado
  - PUT: edita el autor
    - `/api/authors/[ID del autor a editar]`
    - Se debe enviar el `name` en el `body`
    - ```sh
      {
        "name": "Nuevo nombre del autor a editar"
      }
      ```
    - Devuelve `json` con el autor editado
  - DELETE: elimina el autor
    - `/api/authors/[ID del autor a eliminar]`
    - Devuelve `json` con el autor eliminado
- `/api/movies`
  - GET: devuelve `json` con lista de películas creadas
    - `/api/movies/[ID de la película a consultar]`
    - Devuelve `json` con la película solicitado
  - POST: crea una nueva película tomando el `title, genreId, authorId` del `body`
    - Se debe enviar `title, genreId, authorId` en el `body`
    - ```sh
      {
        "title": "Título de la película",
        "genreId": "ID del género",
        "authorId": "ID del autor"
      }
      ```
    - Devuelve `json` con la película creada
  - PUT: edita la película
    - `/api/movies/[ID del película a editar]`
    - Se debe enviar `title, genreId, authorId` en el `body`
    - ```sh
      {
        "title": "Nuevo título de la película a editar",
        "genreId": "Nuevo ID del género a editar",
        "authorId": "Nuevo ID del autor a editar"
      }
      ```
    - Devuelve `json` con el película editado
  - DELETE: elimina la película
    - `/api/movies/[ID del película a eliminar]`
    - Devuelve `json` con el película eliminado

##### Se utilizó Postman para realizar las pruebas a los endpoints