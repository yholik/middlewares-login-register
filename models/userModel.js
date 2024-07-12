/**
 * Crearemos una estructura básica 
 * para almacenar usuarios en la aplicación. 
 * Este modelo se utiliza para almacenar y manejar los datos 
 * de los usuarios de manera temporal en la memoria 
 * durante el tiempo de ejecución de la aplicación. 
 */

/***
 * Nota: A los fines de centrar el ejercicio en JWT, 
 * almacenaremos los usuarios en memoria. 
 * En un proyecto real, 
 * los usuarios deben almacenarse en base de datos.
 * Es decir este archivo o archivos que resulten, 
 * manejarían la logica de gestión con la bbdd
 * * */

// Creación del array
const users = [];

// Exportacion del array
module.exports = users;

// Pasamos a configurar el controlador de autentificación authController.js