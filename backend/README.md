# Backend

## Instalación

### Compilación
```sh
pipenv install
pipenv shell
```

### Ejecución

Asegurarse de tener corriendo las bases de datos necesarias, en este caso redis (`:6379`) y postgres (`:5432`) en los puertos indicados.

Luego correr con el siguiente comando:

```sh
uvicorn main:app --reload
```

Luego acceder a la url `http://localhost:8000/docs` en el navegador.

---