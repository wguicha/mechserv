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
                include: [{
                    model: Turno,
                    attributes: ['id_turno', 'dia', 'hora', 'disponible']
                  }],
                attributes: ['idServicio', 'name','category', 'description', 'price', 'isActive'],
                order: [[ Turno, 'dia', 'ASC'],[ Turno, 'hora', 'ASC']]
            })

            const serviceToSend = serviceToSendFunction(service);

            res.status(200).json(serviceToSend);
        } else {
            const services = await Servicio.findAll({
                attributes : ["idServicio", "name", "category","price", "isActive"]
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

const serviceToSendFunction = (service) => {
    const dates = [... new Set(service.Turnos.map((x) => x.dia))];

    let serviceToSend =
    {
        idServicio : service.idService,
        category: service.category,
        name: service.name,
        description: service.description,
        price: service.price,
        isActive: service.isActive,
        turnos : dates.map((date) => {
        return {
            date: date,
            turnos: hoursPerDate(date, service)
        }
    })}

    return serviceToSend;
}

const hoursPerDate = (date, service) => {
    const turnos = service.Turnos.filter((turno) => turno.dia == date).map((turno) => {
        return { hora: turno.hora, id_turno: turno.id_turno, disponible: turno.disponible}
    })

    return turnos;

}

module.exports = getServices;