# Documentación para Correr el Proyecto

Sigue estos pasos para configurar y ejecutar el proyecto correctamente:

---

```env
Crea un archivo `.env` en la raíz del proyecto y define las siguientes variables de entorno:
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
npx prisma migrate dev

Ejecuta el script seed.ts para insertar los productos base en la base de datos:
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
