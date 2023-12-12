const { User, UserType } = require('../db');

const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({ message: 'Falta el parámetro de consulta email' });
    }

    const user = await User.findOne({
      where: { email: email },
      attributes: ['uuid', 'name', 'email'],
      include: [{
        model: UserType,
        attributes: ['isAdmin']
      }],
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    return res.status(200).json({ user: user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getUserByEmail;