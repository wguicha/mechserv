const { Vehiculo, User } = require('../db');

async function postVehiculos(req, res) {
  try {
    const { marca, modelo, date, users } = req.body;

    // Verificar si el usuario existe
    const user = await User.findByPk(users);
    console.log(req.body)
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Crear el vehículo y asignarlo al usuario
    const vehiculo = await Vehiculo.create({
      marca: marca,
      modelo: modelo,
      date: date,
      UserUuid: users
    });
    await user.addVehiculo(vehiculo);

    console.log('Vehículo cargado correctamente.');

    return res.status(200).json({ message: 'Vehículo cargado correctamente' });
  } catch (error) {
    console.error('Error al cargar el vehículo:', error);
    return res.status(500).json({ message: 'Error al cargar el vehículo' });
  }
}

module.exports =  postVehiculos;