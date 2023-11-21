const { Servicio } = require('../db');

async function getServices (req, res) {
    try{
        const services = await Servicio.findAll();

        res.status(200).json(services);

    } catch (err) {
        console.log(err)
        //return res.status(500).json({message: err.message})
        //errorHandler(res, err)
    }
}

module.exports = getServices;