const { Vehiculo } = require('../db');

const getAllVehiculos = async (req, res) => {
    try {
        const vehiculos = await Vehiculo.findAll();

        if (!vehiculos || vehiculos.length === 0) {
            return res.status(404).json({ message: 'No se encontraron Vehiculos' });
        }

        const formattedVehiculos = vehiculos.map((vehiculo) => ({
            id: vehiculo.id_vehiculo,
            marca: vehiculo.marca,
            modelo: vehiculo.modelo,
            date: vehiculo.date,
        }));

        return res.status(200).json({ vehiculos: formattedVehiculos });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports =  getAllVehiculos;