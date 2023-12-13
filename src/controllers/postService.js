const { Servicio, Turno } = require('../db');
const { Op } = require("sequelize");

async function postService (req, res) {
    const { name, description, category, price, isActive, dates } = req.body;
    const { idService } = req.params;
    const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00']
    try{
        if (idService) {
            const service = await Servicio.findByPk(idService);
            if(service){
                await service.update({
                    name: name,
                    category: category,
                    price: price,
                    isActive : isActive
                })
                res.status(200).json({ message: 'El servicio ha sido editado correctamente' });
            }else{
                res.status(200).json({ message: 'Servicio no encontrado' });
            }

        } else {
            const servicio = await Servicio.create({
                name: name,
                description: description,
                category: category,
                price: price,
                isActive : true
            })
            if (dates.length > 0){
                createdPerDay(servicio, dates, hours);
            }
            res.status(200).json({ message: 'El servicio ha sido creado correctamente' });
        }

    } catch (err) {
        console.log(err)
        //return res.status(500).json({message: err.message})
        //errorHandler(res, err)
    }
}

const createdPerDay = (servicio, dates, hours) =>{
        dates.map((date) => {
            createdPerHour(servicio, date, hours)
        })
}

const createdPerHour = async (servicio, date, hours) =>{
    try {
        let turnosCreated = hours.map((hour) => {
            Turno.findOrCreate({
                where: {[Op.and] : [
                    {ServicioIdServicio:servicio.idServicio},
                    {dia: date},
                    {hora: hour}
                ]},
                defaults :{
                    ServicioIdServicio:servicio.idServicio,
                    dia: date,
                    hora: hour,
                    disponible: true
                }
            });
        })

        await Promise.all(turnosCreated);

    } catch (err) {
        console.log("Error creando turnos: ", err)
    }
}

module.exports = postService;