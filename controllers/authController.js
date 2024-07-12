/***
 * El controlador de autenticación maneja las solicitudes 
 * de registro e inicio de sesión de los usuarios. 
 * Realiza las siguientes funciones principales:
 * 
 * Registro de usuario (register) :Recibe los datos del usuario, 
 * cifra la contraseña, almacena el usuario en el array de usuarios, 
 * genera un token JWT y lo envía como respuesta.
 * 
 * Inicio de Sesión (login): Verifica las credenciales del usuario, 
 * genera un token JWT si las credenciales son correctas 
 * y lo envía como respuesta.
 */

// Importa el módulo jsonwebtoken para manejar JWT
const jwt = require('jsonwebtoken');

// Importa el módulo bcryptjs para cifrar contraseñas
const bcrypt = require('bcryptjs');

// Importa el modelo de usuarios
const users = require('../models/userModel');

// Importa la configuración (clave secreta y duración del token)
const config = require('../config/config');

// Función para registrar un nuevo usuario
const register = (req, res) => {
    // Desestructuración: Extrae el nombre de usuario y la contraseña del cuerpo de la solicitud
    const { username, password } = req.body;
  
    // Cifra la contraseña usando bcrypt 
    const hashedPassword = bcrypt.hashSync(password, 8); 
    // Generar un salt con 8 rondas es decir aplica la funcion hash 2^8 (256) veces
  
    // Crea un nuevo objeto usuario con un id único y el nombre de usuario y contraseña cifrada
    const newUser = { id: users.length + 1, username, password: hashedPassword };
  
    // Agrega el nuevo usuario al array de usuarios
    users.push(newUser);
  
    // Genera un token JWT para el nuevo usuario PayLod(carga útil), claveSecreta, opciones
    const payload = { id: newUser.id, username: newUser.username}; 
    const secretKey = config.secretKey; // lo traemos del archivo config
    const options = { expiresIn: config.tokenExpiresIn } // parámetro opcional

    // Generamos el token
    const token = jwt.sign(payload, secretKey, options);
    
    // Envía el token como respuesta al cliente
    res.status(201).send({ auth: true, token });
  }

 // Función para iniciar sesión de un usuario
const login = (req, res) => {
    // Extrae el nombre de usuario y la contraseña del cuerpo de la solicitud
    const { username, password } = req.body;

    // Busca en el arreglo 'users' un usuario que coincida con el nombre de usuario
    // Si el usuario no se encuentra, devuelve un error 404 con el mensaje 'Usuario no encontrado'
    const user = users.find(u => u.username === username);

    if (!user) {
        return res.status(404).send({ message: 'Usuario no encontrado.' });
    }

    // Compara la contraseña proporcionada con la contraseña almacenada usando bcrypt
    // Si las contraseñas no coinciden, devuelve un error 401 con el mensaje 'Contraseña inválida'
    
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    

    // En caso de no verificar la clave
    if (!passwordIsValid) {
        return res.status(401).send({ auth: false, token: null });
        // Enviamos 401: no autorizado, false: fallo en autentificación , null: no hay token disponible
    }

    // Genera un token JWT para el usuario PayLod(carga útil), claveSecreta, opciones
    const payload = { id: user.id, username: user.username}; 
    const secretKey = config.secretKey; // lo traemos del archivo config
    const options = { expiresIn: config.tokenExpiresIn } // parámetro opcional

    // Generamos el token
    const token = jwt.sign(payload, secretKey, options);

    // Envía el token JWT al cliente con estado 200 (éxito)
    res.status(200).send({ auth: true, token });
};

// Exportacion de módulos
module.exports = {register, login};

// Pasamos a configurar la funcion de autentificacion middleware authMiddleware.js