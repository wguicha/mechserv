const { Servicio } = require('../db');

async function getCategories (req, res) {
    try{
        const categories = await Servicio.findAll({
            raw: true,
            attributes : [ 'categoria' ],
            group: [ 'categoria' ]
        });

        console.log("categories:", categories.map((category) => category.categoria))

        res.status(200).json(categories.map((category) => category.categoria));

    } catch (err) {
        console.log(err)
        //return res.status(500).json({message: err.message})
        //errorHandler(res, err)
    }
}

module.exports = getCategories;