const { Orden } = require('../db');

async function postOrder(req, res) {
  try {
    const { idUser, idVehiculo, idServicio, idTurno } = req.body;

    const order = await Orden.create({
        UserUuid: idUser,
        VehiculoIdVehiculo: idVehiculo,
        ServicioIdServicio: idServicio,
        TurnoIdTurno: idTurno
    });

    //await user.addVehiculo(vehiculo);

    console.log('La orden fue cargada:', order);

    return res.status(200).json({ message: 'Orden creada correcta correctamente' });
  } catch (error) {
    console.error('Error al cargar el vehículo:', error);
    return res.status(500).json({ message: 'Error al cargar el vehículo' });
  }
}

module.exports =  postOrder;