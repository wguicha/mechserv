const { User } = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {
    TOKEN_KEY
  } = process.env;


const login = async (req, res) => {
    
    console.log(req.body)

    try {
        const { email, password } = req.body
        console.log("data:", email, password)

        if (!(email && password)) {
            return res.status(400).json({ message: 'faltan datos' });
        }

       
        const found = await User.findOne({
                where: { email }
            });

           
        if (!found) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        
        const passwordMatch = await bcrypt.compare(password, found.password);
        
        if (!passwordMatch) {
            return res.status(403).json({ message: 'Contraseña incorrecta' });
        }

        const token = jwt.sign(
            { userId: found.uuid, email: email },
            TOKEN_KEY,
            { expiresIn: '2h' }
        );
        found.token=token;

        return res.status(200).json({
            userFound: {
                id:found.uuid,
                name: found.name,
                email: found.email,
                password:found.password,
                token: token
            },
            
        }) // devolver un usuario como en el postUser

         
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = login;