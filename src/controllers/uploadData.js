const servicesData = require('../../serviceList.json')
const userMockList = require('../../userMockList.json')
const { Servicio, User, Vehiculo } = require('../db')

async function uploadData () {
    try{
        servicesData.map((servicio) => {
            Servicio.create({
                name: servicio.name,
                categoria: servicio.category,
                description: servicio.description,
                price: servicio.price
            })
        })

        userMockList.map((user) => {
            console.log("Vehiculo:", user.vehiculo)
            User.findOrCreate({
                where: {email : user.email},
                defaults: {
                    tipo_usuario: user.tipo_usuario,
                    name: user.name,
                    vehiculos: user.vehiculo,
                    password: user.password,
                    telefono: user.telefono
                },
                include: [ Vehiculo ]
                },
            );
        })

    } catch (err) {
        console.log(err)
        //return res.status(500).json({message: err.message})
        //errorHandler(res, err)
    }
}

module.exports = uploadData;