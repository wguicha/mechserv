const { Turno } = require('../db')

const setTurno = async  (req, res) => {
    try{
        const idTurno = req.params.idTurno;
        console.log("Turno id:", idTurno)
        let getTurno = await Turno.findOne({
            where : { id_turno : idTurno }
        })

        if (getTurno) {
            const updatedTurno = await getTurno.update({
                disponible: !getTurno.disponible,
            });

            console.log('Turno Actualizado:', updatedTurno.toJSON());
        } else {
            console.log('Turno no encontrado.');
        }

        return res.status(200).json('Turno Actualizado')

    } catch (err) {
        console.log(err)
        return res.status(500).json({message: err.message})
        //errorHandler(res, err)
    }
}

module.exports = setTurno;