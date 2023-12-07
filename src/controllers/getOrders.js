const { Orden, Servicio, User, Vehiculo, Turno } = require('../db');

async function getOrders (req, res) {
    const idUser = req.params.idUser;

    try{
        if (idUser) {
            const order = await Orden.findAll({
                where: {UserUuid : idUser, isActive: true},
                attributes : ['id_orden', 'date', 'payment' ],
                include: [{
                    model : Servicio,
                    attributes : ['name', 'category', 'price']
                }, {
                    model: Turno,
                    attributes : ['id_turno', 'dia', 'hora']
                }, {
                    model: User,
                    attributes : ['uuid']
                 }, {
                    model: Vehiculo,
                    attributes : ['marca', 'modelo', 'date']
                }]
            })
            res.status(200).json(order);
        } else {
            const orders = await Orden.findAll({
                attributes : ['id_orden', 'date', 'payment', 'isActive' ],
                include: [{
                    model : Servicio,
                    attributes : ['name', 'category', 'price']
                }, {
                    model: Turno,
                    attributes : ['id_turno', 'dia', 'hora']
                }, {
                    model: User,
                    attributes : ['uuid']
                 }, {
                    model: Vehiculo,
                    attributes : ['marca', 'modelo', 'date']
                }]
            });

            res.status(200).json(orders);
        }

    } catch (err) {
        console.log(err)
        //return res.status(500).json({message: err.message})
        //errorHandler(res, err)
    }
}

module.exports = getOrders;