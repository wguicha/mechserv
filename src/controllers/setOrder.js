const { Orden } = require('../db');

async function setOrder (req, res) {
    const idOrder = req.params.idOrder;
    try{
        if (idOrder) {
            const order = await Orden.findByPk(idOrder);
            await order.update({
                isActive : !order.isActive
            })
            res.status(200).json({ message: 'La orden ha sido modificada' });
        } else {

            res.status(200).json({ message: 'Orden no encontrada' });
        }

    } catch (err) {
        console.log(err)
        //return res.status(500).json({message: err.message})
        //errorHandler(res, err)
    }
}

module.exports = setOrder;