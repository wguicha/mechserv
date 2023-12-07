const { Op } = require("sequelize");
const { Orden, Servicio, Turno, Vehiculo } = require('../db');

async function postOrder(req, res) {
  try {
    const { idUser, idVehiculo, idServicio, idTurno } = req.body;

    if(await validateUserPendingOrders(idUser)){
      return res.status(200).json({ message: 'El usuario tiene ordenes pendientes y no puede agendar' });
    }

    if(await !validateAvabilityTurno(idTurno)){
      return res.status(200).json({ message: 'El turno ya ha sido tomado' });
    }

    const order = await Orden.create({
        UserUuid: idUser,
        VehiculoIdVehiculo: idVehiculo,
        ServicioIdServicio: idServicio,
        TurnoIdTurno: idTurno
    });

    await setTurno(idTurno);

    console.log('La orden fue cargada:', order);

    return res.status(200).json({ message: 'Orden creada correcta correctamente' });
  } catch (error) {
    console.error('Error al cargar el vehículo:', error);
    return res.status(500).json({ message: 'Error al crear la orden' });
  }
}

//Valida si el usuario tiene ordenes pendientes devolviendo falso o verdadero
const validateUserPendingOrders = async (idUser) => {
  try {
    const userPendingOrders = await Orden.findAll({
      where: { [Op.and]: [{UserUuid : idUser}, {payment : false}, {isActive : true}]},
    })

    return userPendingOrders.length > 0;

  } catch (error) {
    console.error('Error al validar duplicados de órdenes:', error);
    throw error;
  }
};

//Valida si el turno aun esta disponible
const validateAvabilityTurno = async (idTurno) => {
  try {
    const turnoAvability = await Turno.findOne({
      where: { id_turno : idTurno },
      attributes : [ 'disponible' ]
    })
    return turnoAvability.length == 1;

  } catch (error) {
    console.error('Error al validar la disponibilidad del turno:', error);
    throw error;
  }
};

//Cambia el estado del turno a no disponible
const setTurno = async (idTurno) => {
    try{
        let getTurno = await Turno.findOne({
            where : { id_turno : idTurno }
        })

        if (getTurno) {
            const updatedTurno = await getTurno.update({
                disponible: !getTurno.disponible,
            });

            return 'Turno Actualizado:';
        } else {
            return 'Turno no encontrado.';
        }


    } catch (err) {
        console.log(err)
        return res.status(500).json({message: err.message})
        //errorHandler(res, err)
    }
};


module.exports =  postOrder;