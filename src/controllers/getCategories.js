const { Servicio } = require('../db');

async function getCategories (req, res) {
    try{
        const categories = await Servicio.findAll({
            raw: true,
            attributes : [ 'category' ],
            group: [ 'category' ]
        });

        console.log("categories:", categories.map((category) => category.category))

        res.status(200).json(categories.map((category) => category.category));

    } catch (err) {
        console.log(err)
        //return res.status(500).json({message: err.message})git
        //errorHandler(res, err)
    }
}

module.exports = getCategories;