const servicesData = require('../../serviceList.json')
const userMockList = require('../../userMockList.json')
const { Servicio, User } = require('../db')

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
            User.create({
                tipo_usuario: user.tipo_usuario,
                name: user.name,
                vehiculo: user.vehiculo,
                email: user.email,
                password: user.password,
                telefono: user.telefono
            })
        })

    } catch (err) {
        console.log(err)
        //return res.status(500).json({message: err.message})
        //errorHandler(res, err)
    }
}

module.exports = uploadData;