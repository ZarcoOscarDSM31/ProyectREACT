GUÍA DE INSTALACIÓN DEL PROYECTO

Clonar el repositorio de GITHUB desde la liga:
https://github.com/ZarcoOscarDSM31/ProyectREACT.git

(Nota: NO colocarlo en la carpeta de Xampp/Wampp/Lampp...)


[NOTA: NO INSTALAR NADA SOLO EN CASO DE QUE AL ABRIR LOS SERVIDORES CON EL COMANDO "npm run dev" CADA UNO
EN SU RESPECTIVA CARPETA, EN CASO DE HABER ALGÚN FALLO SE DEBE DE INSTALAR ALGUNO DE LOS SIGUIENTES MÓDULOS:]


**Proceso de instalación**
Paso 1: Clonar el repositorio

Paso 2: Acceder al proyecto desde VISUAL STUDIO CODE 

NOTA: El proyecto cuenta con dos partes, el backend (Carpeta principal "PROYECTO") y el frontend (ASHA);
esto es importante, pues dependiendo de la carpeta se hacen diferentes instalaciones.

Paso 3: En el BACKEND (carpeta principal) instalar con el código "npm i" los siguientes módulos:
(ESTO PUEDE SER REDUCIDO A COLOCAR EL COMANDO "npm i" dentro de la carpeta raiz (/))
    + npm i mongoose
    + npm i cookie-parser
    + npm i morgan
    + npm i cors
    + npm i zod
    + npm i jsonwebtoken
    + npm i bcryptjs
    + npm i nodemon
    + npm i axios


Paso 4: En el FRONTEND (carpeta ASHA) instalar con el código "npm i"
(ESTO PUEDE SER REDUCIDO A COLOCAR EL COMANDO "npm i" dentro de la carpeta /ASHA)

    + npm i -D tailwindcss postcss autofixer
    + npx tailwind init -p
    + npm i react-router-dom
    + npm i react-hook-form

Paso 5: Correr el servidor del backend con el comando:
    + npm run dev 
    en la carpeta "proyecto":
   Ejemplo:  ~/Escritorio/proyecto npm run dev  

Paso 6: Correr el servidor del frontend con el comando:
    + npm run dev
   Ejemplo:  ~/Escritorio/proyecto/ASHA npm run dev 
