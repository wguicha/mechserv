const { User } = require('../db');

const login = async (req, res) => {
    const { email, password } = req.body
    console.log(req.body)

    try {
        console.log("data:", email, password)
        if(email && password){
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

            return res.status(200).json({
                newUser: {
                    id:found.uuid,
                    name: found.name,
                    email: found.email,
                    
                },
                token: 'token'
            }) // devolver un usuario como en el postUser

        } else {
            return res.status(400).json({message: 'Faltan datos'})
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error en el servidor al intentar iniciar sesión' });
    }
}

module.exports = login;