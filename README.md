# Página web en producción
[Ir a la página web en producción](http://3.12.114.18/)


# Documentación para Correr el Proyecto

Sigue estos pasos para configurar y ejecutar el proyecto correctamente:

---

```env
Crea un archivo `.env` en la carpeta del backend proyecto y define las siguientes variables de entorno:
WOMPI_API_BASE_URL=     # URL base para la API de Wompi
WOMPI_PUBLIC_KEY=       # Llave pública de Wompi
WOMPI_INTEGRITY_KEY=    # Llave de integridad de Wompi
CURRENCY=COP            # No es necesario cambiarlo
DATABASE_URL=postgres://myuser:mypassword@localhost:5435/mydatabase

Ejecuta el siguiente comando para construir el contenedor del proyecto:
docker-compose --build

Si necesitas detener los contenedores, usa:
docker-compose down

Para iniciar el proyecto, usa:
docker-compose up

Una vez que el backend esté funcionando, entra en la carpeta del backend y ejecuta las migraciones:
cd backend
npx prisma migrate dev

Ejecuta el script seed.ts para insertar los productos base en la base de datos:
cd prisma
npx ts-node --transpile-only seed.ts

## Puertos del Proyecto
Frontend: El frontend estará disponible en el puerto 3001.
Backend: El backend estará disponible en el puerto 3000.

La documentación Swagger de la API estará disponible en:
http://localhost:3000/api#/

## Ejecutar Tests y Ver Coverage
Backend:
Para ejecutar los tests y ver el coverage en el backend:

Entra en la carpeta del backend.
Ejecuta el siguiente comando:
npm test

Frontend:
Para ejecutar los tests y ver el coverage en el frontend:

Entra en la carpeta del frontend.
Ejecuta el siguiente comando:
npm test -- --coverage
```

# Imágenes del Proyecto

## Listado de Productos

<details>
<summary><strong>Ver imágenes</strong></summary>

### Navegador
![Listado de productos - Navegador](https://github.com/user-attachments/assets/c872e9ce-69fb-41f1-82f5-00c1d3719daa)

### Mobile
![Listado de productos - Mobile 1](https://github.com/user-attachments/assets/eaf132c5-e11b-447e-a36b-e361aac43b78)
![Listado de productos - Mobile 2](https://github.com/user-attachments/assets/ebebbe64-ed77-41e6-bdcb-ed457d41f1a9)

</details>

---

## Compra de Producto

<details>
<summary><strong>Ver imágenes</strong></summary>

### Navegador
![Compra de producto - Navegador](https://github.com/user-attachments/assets/66be674a-e447-4913-9077-a86d529d6593)

### Mobile
![Compra de producto - Mobile](https://github.com/user-attachments/assets/41505545-0f02-4c81-a53b-7acff8ad05de)

</details>

---

## Proceso de Compra

<details>
<summary><strong>Ver imágenes</strong></summary>

### Navegador
![Proceso de compra - Navegador 1](https://github.com/user-attachments/assets/b3d20b3a-f740-474c-85bf-ae6d45210fc0)
![Proceso de compra - Navegador 2](https://github.com/user-attachments/assets/688efd26-85a3-4d39-8c7e-fb35149db9e4)
![Proceso de compra - Navegador 3](https://github.com/user-attachments/assets/5fd023a1-59de-4f17-a5e4-fd9bad1249f7)

### Mobile
![Proceso de compra - Mobile 1](https://github.com/user-attachments/assets/fc3f7389-7e69-4121-8450-6f0b08145c66)
![Proceso de compra - Mobile 2](https://github.com/user-attachments/assets/d5c5c2fa-e505-4e8d-8645-1ccafdc53090)
![Proceso de compra - Mobile 3](https://github.com/user-attachments/assets/52c6e11d-c3c9-48a3-9443-d974597023f6)

</details>


"""
# Imágenes del Testing Coverage

## Coverage del Frontend

<details>
<summary><strong>Ver imágenes</strong></summary>

### Components en promedio por encima del 80%
![Coverage Frontend - Components](https://github.com/user-attachments/assets/cd1d8468-8e15-4baa-94af-2b77e4928a66)

</details>

---

## Coverage del Backend

<details>
<summary><strong>Ver imágenes</strong></summary>

### Coverage en promedio por encima del 80%
![Coverage Backend](https://github.com/user-attachments/assets/d18ebda5-aa60-4196-baed-de0ba7b33177)

</details>






