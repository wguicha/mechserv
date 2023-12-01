const { Orden, Servicio, User, Vehiculo, Turno } = require('../db');

async function getOrders (req, res) {
    const idUser = req.params.idUser;

    try{
        if (idUser) {
            const order = await Orden.findOne({
                where: {UserUuid : idUser},
                include: [Servicio, Turno, User, Vehiculo]
            })
            res.status(200).json(order);
        } else {
            const orders = await Orden.findAll({
                include: [Servicio, Turno, User, Vehiculo],
                order: [['date', 'DESC']]
                }
            );

            res.status(200).json(orders);
        }

    } catch (err) {
        console.log(err)
        //return res.status(500).json({message: err.message})
        //errorHandler(res, err)
    }
}

module.exports = getOrders;