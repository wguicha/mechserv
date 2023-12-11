const { Servicio } = require('../db');

async function serService (req, res) {
    const { idService, name, category, price, isActive } = req.body;
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
                await Servicio.create({
                    name: name,
                    category: category,
                    price: price,
                    isActive : true
                })
                res.status(200).json({ message: 'El servicio ha sido creado correctamente' });
            }


        } else {

            res.status(200).json({ message: 'Servicio no encontrado' });
        }

    } catch (err) {
        console.log(err)
        //return res.status(500).json({message: err.message})
        //errorHandler(res, err)
    }
}

module.exports = serService;