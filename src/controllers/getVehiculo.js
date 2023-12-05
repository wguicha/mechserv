const { User, Vehiculo } = require('../db');

const getVehiculoUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({
      where: {
        uuid: userId,
      },
      include: [
        {
          model: Vehiculo,
          attributes: ['id_vehiculo', 'marca', 'modelo', 'date'],
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const vehiculos = user.Vehiculos.map((vehiculo) => {
      return {
        id_vehiculo : vehiculo.id_vehiculo,
        marca: vehiculo.marca,
        modelo: vehiculo.modelo,
        date: vehiculo.date ? (vehiculo.date.getFullYear() + 1).toString() : '', // Convierte a cadena de texto y obtiene el año + 1
      };
    });

    return res.status(200).json({ vehiculos });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getVehiculoUser;