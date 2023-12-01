const { User, Vehiculo } = require('../db');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            include: [ Vehiculo ]
        });

        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No se encontraron usuarios' });
        }

        const formattedUsers = users.map((user) => ({
            id: user.uuid,
            tipo_usuario: user.tipo_usuario,
            name: user.name,
            vehiculo: user.Vehiculos,
            email: user.email,
            telefono: user.telefono,
            imagen: user.imagen,
            password:user.password
        }));

        return res.status(200).json({ users: formattedUsers });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports =  getAllUsers ;