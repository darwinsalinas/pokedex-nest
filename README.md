<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Levantar el proyecto en local

1. Clonar repo
2. Ejecutar

```
yarn install
```

3. Instalar Nest CLI

```
npm i -g @nestjs/cli
```

4. Clonar el archivo **.env.exmaple** y renombrar la copia a **.env**

5. Asignar los valores correspondientes a las variables de entorno

6. Levantar contenedor de base de datos

```
docker-compose up -d
```

7. Ejecutar la app

```
yarn start:dev
```

8. Alimentar la base de datos con datos de prueba haciendo una peticion al endpoint

```
http://localhost:{{port}}/api/{{version}}/seed
```

## Stack

- MongoDB
- Nestjs
