const { Servicio, Turno } = require('../db');

async function getServices (req, res) {
    const idService = req.params.idService;
    const idTurno = req.params.idTurno;

    try{
        if(idService && idTurno){
            //"Aqui el codigo si viene turno y servicio"
        } else if (idService && !idTurno) {
            const service = await Servicio.findOne({
                where: {idServicio : idService},
                include: Turno
            })
            res.status(200).json(service);
        } else {
            const services = await Servicio.findAll({
                attributes : ["idServicio", "name", "category","price"]
                }
            );

            res.status(200).json(services);
        }

    } catch (err) {
        console.log(err)
        //return res.status(500).json({message: err.message})
        //errorHandler(res, err)
    }
}

module.exports = getServices;