const servicesData = require('../../serviceList.json')
const userMockList = require('../../userMockList.json')
const appointments = require('../../appointments.json')

/*
const types = require('../../types.json')
const vehiculos = require('../../vehiculos.json')
const ordens = require('../../ordens.json')
*/
const { Servicio, User, Vehiculo, Turno, Orden, UserType } = require('../db')
const { Op } = require("sequelize");

async function uploadData () {
    try{
//CARGAR VEHICULOS
/*
console.log("Vehiculos:", vehiculos)
        const vehiculoCargados = vehiculos.map((vehiculo) =>{
            Vehiculo.create({
                marca: vehiculo.marca,
                modelo: vehiculo.modelo,
                date: vehiculo.date,
                UserUuid: vehiculo.users
            });
        })

        await Promise.all(vehiculoCargados);
*/
 //CARGAR ORDENES
/*
        const ordenesCargadas = ordens.map((orden) =>{
            Orden.create({
                UserUuid: orden.idUser,
                VehiculoIdVehiculo: orden.idVehiculo,
                ServicioIdServicio: orden.idServicio,
                TurnoIdTurno: orden.idTurno,
                payment: true
            });
        })

        await Promise.all(ordenesCargadas);
*/
 //CARGAR TYPES
/*
        const typeCarga = types.map((type) =>{
            UserType.create({
                UserUuid: type.uuid
            });
        })

        await Promise.all(typeCarga);
*/
//CARGAR SERVICIOS
        //Crear servicios desde el archivo JSON
        const dates = ['2023-12-14', '2023-12-15', '2023-12-16', '2023-12-17']
        const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00']

        /*

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

//CREACION DE TURNOS DE LOS SERVICIOS
        const services = await Servicio.findAll();

        await Turno.destroy({
            where: {}, // Sin ninguna condición, selecciona todos los registros
          });

        console.log("Servicios Uplodad:", services.length)

        services.map((servicio) => {
            createdPerDay(servicio, dates, hours);
            console.log("Servicio creado: ", servicio.name)
        })

        

    } catch (err) {
        console.log("Error creando turnos: ", err)
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
        Turno.create({
            ServicioIdServicio:servicio.idServicio,
            dia: date,
            hora: hour,
            disponible: Math.random() < 0.5
        });
    })

    await Promise.all(turnosCreated);
*/
} catch (err) {
    console.log("Error creando turnos: ", err)
}
}

module.exports = uploadData;