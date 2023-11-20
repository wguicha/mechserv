const { User } = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const TOKEN_KEY = "x4TvnErxRETbVcqaL15dqMI115eNlp5y";

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null)
        return res.status(401).send("Token requerido");
    jwt.verify(token, TOKEN_KEY, (err, user) => {
        if (err) return res.status(403).send("Token invalido");
        req.user = user;
        next();
    });
}

const postUser = async (req, res) => {
    console.log(req.body)
    const {tipo_usuario,uuid, name, email, password ,vehiculo,telefono,imagen} = req.body;
    console.log(email, password);
    try {
        if (email && password) {
            // Hash de la contraseña utilizando bcrypt
            const hashedPassword = await bcrypt.hash(password, 10);

            // Crear un nuevo usuario con la contraseña hasheada
            const newUser = await User.create({
                tusuario: tipo_usuario,
                id:uuid,
                name:name,
                email:email,
                password: hashedPassword,
                vehiculo:vehiculo,
                telefono:telefono,
                imagen: imagen
            });

            const token = jwt.sign(
                { userId: newUser.uuid, email: newUser.email },
                TOKEN_KEY,
                { expiresIn: '2h' }
            );

            return res.status(201).json({
                newUser: {
                    id:newUser.uuid,
                    name: newUser.name,
                    email: newUser.email,
                    
                },
                token: token
            });

        } else {
            return res.status(400).json({ message: 'Faltan datos' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { postUser, verifyToken };