/**
 * El objetivo de este trabajo 
 * es proporcionar una práctica introductoria 
 * para el desarrollo de autientificación de usuarios 
 * utilizando Node.js y los frameworks Express, Bcrypt y JsonWebToken.
 * Aplicamos los siguientes pasos
 * 1- Diseñamos la estructura de carpetas
 * 2- Inicializamos NPM: npm init -y
 * 3- Instalamos las dependencias: npm i express bcriptjs jsonwebtoken router
 * 4- Configuramos el servidor en index.js
 * 5- Configurar start
 * 6- Para compatibilizar con un front de puerto 5000 importar cors
 */

// Importando el módulo Express
const express = require('express');

// Creando una instancia de Express que será nuestro servidor
const app = express();

// Importar cors para hacer pruebas con el front
const cors = require('cors');

// Importando rutas desde el archivo 'authRoutes' ubicado en la carpeta 'routes'
const authRoutes = require("./routes/authRoutes");

// Definiendo un número de puerto. 
const PORT = 3000;

//Middleware que permite conexiones de puertos distintos por ejemplo de un front port 5000
//IMPORTANTE al desplegar en la web no incluir la linea cors
app.use(cors());

// Middleware para analizar las solicitudes entrantes con cargas JSON
app.use(express.json());

// Middleware para manejar rutas de autenticación utilizando las rutas importadas 
// 'authRoutes'
app.use('/auth', authRoutes);

// Iniciando el servidor en el puerto definido y registrando un mensaje 
// en la consola cuando sea exitoso.
app.listen(PORT, () => {
  console.log(`El servidor está funcionando en el puerto ${PORT}`);
});

// Pasamos a configurar config.js
