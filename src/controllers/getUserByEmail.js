const { User } = require('../db');

const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({ message: 'Falta el parámetro de consulta email' });
        }

        const user = await User.findOne({
            where: { email: email },
        });

       

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = getUserByEmail;