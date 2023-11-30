const servicesData = require('../../serviceList.json')
const userMockList = require('../../userMockList.json')
const appointments = require('../../appointments.json')
const { Servicio, User, Vehiculo, Turno } = require('../db')
const { Op } = require("sequelize");

async function uploadData () {
    try{
        //Crear servicios desde el archivo JSON
        let servicesCreated = servicesData.map((servicio) => {
            return Servicio.findOrCreate({
                where: {name: servicio.name},
                defaults: {
                    category: servicio.category,
                    description: servicio.description,
                    price: servicio.price
                }
            })
        })

        await Promise.all(servicesCreated);
        //Crear dos usuarios de ejemplo desde el archivo JSON
        let userToCreate = userMockList.map((user) => {
            return User.findOrCreate({
                where: {email : user.email},
                defaults: {
                    tipo_usuario: user.tipo_usuario,
                    name: user.name,
                    password: user.password,
                    telefono: user.telefono
                },
            });
        })

        await Promise.all(userToCreate);
/*
        //Crear turnos desde archivo JSON para un servicio en especifico
        const servicioToUse = await Servicio.findOne({
            where: { name: 'Cambio Pastillas Delanteras'}
        })

        if (servicioToUse) {
            console.log('servicioId:', servicioToUse.idServicio);
            let appointmentToCreate = appointments.map((appointment) => {
                return Turno.findOrCreate({
                    where: {[Op.and] : [
                        {ServicioIdServicio:servicioToUse.idServicio},
                        {dia: appointment.dia},
                        {hora: appointment.hora}
                    ]},
                    defaults :{
                        ServicioIdServicio:servicioToUse.idServicio,
                        dia: appointment.dia,
                        hora: appointment.hora,
                        disponible: appointment.disponible
                    }
                });
            })
            await Promise.all(appointmentToCreate);

          } else {
            console.log('servicio not found');
          }
=====================================================================

//Crear turnos para todos los servicios
        const serviciosToUse = await Servicio.findAll();
        let appointmentToCreate = []

        serviciosToUse.map((servicio)=>{
            appointmentToCreate = appointments.map((appointment) => {
                return Turno.findOrCreate({
                    where: {[Op.and] : [
                        {ServicioIdServicio:servicio.idServicio},
                        {dia: appointment.dia},
                        {hora: appointment.hora}
                    ]},
                    defaults :{
                        ServicioIdServicio:servicio.idServicio,
                        dia: appointment.dia,
                        hora: appointment.hora,
                        disponible: appointment.disponible
                    }
                });
            })

        })

        await Promise.all(appointmentToCreate);
*/
        } catch (err) {
            console.log(err)
        //return res.status(500).json({message: err.message})
        //errorHandler(res, err)
    }
}

module.exports = uploadData;