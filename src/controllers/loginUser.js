const axios = require('axios');
const { User } = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const { AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET  } = process.env;
const TOKEN_KEY = process.env.TOKEN_KEY;

// Controlador para registrar un usuario
async function postUser(req, res) {
    console.log(req.body)
    const {tipo_usuario,uuid, name, email, password ,telefono,imagen} = req.body;
    console.log(email, password);
    try {
        if (email && password) {
            // Hash de la contraseña utilizando bcrypt
            const hashedPassword = await bcrypt.hash(password, 10);

            // Crear un nuevo usuario con la contraseña hasheada
            const newUser = await User.create({
                tipo_usuario: tipo_usuario,
                id:uuid,
                name:name,
                email:email,
                password: hashedPassword,
               
                telefono:telefono,
                imagen: imagen

            });

            const token = jwt.sign(
                { userId: newUser.uuid, email: newUser.email },
                TOKEN_KEY,
                { expiresIn: '2h' }
            );
            newUser.token=token;
            return res.status(201).json({
                newUser: {
                    id:newUser.uuid,
                    name: newUser.name,
                    email: newUser.email,
                    password:newUser.password,
                    token: newUser.token
                },
                
            });

        } else {
            return res.status(400).json({ message: 'Faltan datos' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// Controlador para el inicio de sesión con Auth0
async function loginUser(req, res) {
  const { code } = req.body;
  console.log('Código de autorización: ');
  try {
    // Intercambio del código de autorización por un token de acceso con Auth0
    const auth0TokenResponse = await axios.post(`https://${AUTH0_DOMAIN}/oauth/token`, {
      
        grant_type: 'authorization_code',
        client_id: AUTH0_CLIENT_ID,
        client_secret: AUTH0_CLIENT_SECRET,
        code,
        redirect_uri: 'http://localhost:3000',
      });
      if (auth0TokenResponse.status !== 200) {
        throw new Error('Error al intercambiar código por token de acceso');
      }

    // Obtener información del usuario desde Auth0
    const auth0UserInfoResponse = await axios.get(`https://${AUTH0_DOMAIN}/userinfo`, {
      headers: {
        Authorization: `Bearer ${auth0TokenResponse.data.access_token}`,
      },
    });

    // Crear o actualizar el usuario en tu base de datos
    const user = await User.findOrCreate({
      where: { email: auth0UserInfoResponse.data.email },
      defaults: {
        tipo_usuario: User.tipo_usuario,
        uuid: User.uuid, 
        name: auth0UserInfoResponse.data.name, 
        email: auth0UserInfoResponse.data.email,
        password:auth0UserInfoResponse.hashedPassword, 
        telefono: User.password,
        imagen: User.imagen,
      },
    });
    if (!user) {
        throw new Error('Error al crear o encontrar el usuario en la base de datos');
      }

    // Generar un token de acceso para tu aplicación
    const token = jwt.sign({ userId: user.id }, 'tu_secreto', { expiresIn: '1h' });

    res.json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}



axios.interceptors.request.use(request => {
    console.log('Starting Request', request)
    return request
  })
  
  axios.interceptors.response.use(response => {
    console.log('Response:', response)
    return response
  })

module.exports = { postUser, loginUser };