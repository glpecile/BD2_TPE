# Backend

## Instalación de Bases de Datos

### Instalación de Redis

Para instalar Redis, debemos descargar de Docker la [imagen](https://hub.docker.com/r/redislabs/redisearch/) que contiene integrado Redisearch,
con el siguiente comando:
```sh
docker pull redislabs/redisearch
```
Una vez descargada la imagen, debemos ejecutar el contenedor con el siguiente comando:
```sh
docker run --name redis-search -p 6379:6379 -d redislabs/redisearch
```
Con esto realizado, tendremos Redis corriendo en el puerto `:6379`.

### Instalación de PostgreSQL

Para instalar PostgreSQL, debemos descargar de Docker la [imagen](https://hub.docker.com/_/postgres), con el siguiente comando:
```sh
docker pull postgres
```
Una vez descargada la imagen, debemos ejecutar el contenedor con el siguiente comando:
```sh
docker run -e POSTGRES_PASSWORD=123456789 -e POSTGRES_USER=postgres --name postgresql -p 5432:5432 -d postgres
```
Con esto realizado, tendremos PostgreSQL corriendo en el puerto `:5432`. El usuario en este caso será `postgres` y la password `123456789`.
Podemos cambiar los parámetros de ejecución de ser necesario, y en ese caso en el archivo `crud/database.py` setear los nuevos valores en la siguiente línea:
```py
SQLALCHEMY_DATABASE_URL = "postgresql://<user>:<password>@localhost:<port>/<database>"
```
Luego debemos crear la base de datos. Para ello, una vez conectados a la misma, mediante CLI o un entorno gráfico, ejecutar el siguiente comando:
```sh
CREATE DATABASE maverick WITH ENCODING 'UTF-8';
```

## Instalación entorno de Python

### Sistemas Operativos soportados

El backend es compatible con sistemas Linux y MacOS.

En caso de tener Windows, se deberá instalar [WSL2](https://docs.microsoft.com/es-es/windows/wsl/install) debido a que existen dependencias
de fastApi que aún no son compatibles con el sistema operativo de MS. Es decir, se debe correr el backend en Python dentro de WSL. Docker 
permite vincular fácilmente los contenedores dentro de WSL, habilitando la [integración con WSL](https://docs.microsoft.com/en-us/windows/wsl/tutorials/wsl-containers) dentro las opciones.

### Instalación de dependencias

Para ejecutar el backend, debemos tener instalado [`Python 3.9`](https://ubunlog.com/python-3-9-como-instalar-en-ubuntu-20-04/) y 
[`pipenv`](https://installati.one/ubuntu/20.04/pipenv/) instalados.
```sh
sudo apt-get -y install pipenv
```
Luego ejecutar los siguientes comandos:
```sh
pipenv shell
pipenv install
```
Con dichos comandos se iniciará un entorno virtual de ejecución de Python, y luego se instalarán todas las dependencias necesarias para ejecutar el backend.

### Ejecución

Asegurarse de tener corriendo las bases de datos necesarias, en este caso redis (`:6379`) y postgres (`:5432`) en los puertos indicados.

Luego correr con el siguiente comando:

```sh
uvicorn main:app --reload
```

La Api corre en `http://localhost:8000`. Para acceder a la documentación de swagger, ir a `http://localhost:8000/docs` en el navegador.

---
