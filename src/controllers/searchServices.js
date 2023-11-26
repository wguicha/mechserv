const { Servicio } = require('../db')
const { Op } = require("sequelize");

const searchServices = async  (req, res) => {
    try{
        let filteredServices = []

        const category = req.query.category && req.query.category.toLowerCase();
        const keyWord = req.query.keyWord;
        let orderBy = req.query.orderBy && req.query.orderBy.toLowerCase();
        let orderType = req.query.orderType && req.query.orderType.toUpperCase();

        !orderBy? orderBy = 'name' : orderBy;
        !orderType? orderType = 'asc' : orderType;

        if( keyWord && category ) {
            filteredServices = await Servicio.findAll({
                where : {
                    [Op.and]: [
                        {category: category[0].toUpperCase() + category.slice(1)},
                        {[Op.or]:[{description : {[Op.iLike] : `%${keyWord}%`} },
                                 {name : {[Op.like] : `%${keyWord}%`} }
                                ]}
                    ]
                },
                order: [[ orderBy , orderType ]]
            })

        } else if( !keyWord && category) {

            filteredServices = await Servicio.findAll({
                where : {
                    category: category[0].toUpperCase() + category.slice(1)
                },
                order: [[ orderBy , orderType ]]
            })
        } else if( keyWord && !category) {

            filteredServices = await Servicio.findAll({
                where : {[Op.or]:[{description : {[Op.iLike] : `%${keyWord}%`} },
                {name : {[Op.like] : `%${keyWord}%`} }
                ]},
                order: [[ orderBy , orderType ]]
            })
        } else {

            filteredServices = await Servicio.findAll({
                order: [[ orderBy , orderType ]]
            })
        }

        return res.status(200).json(filteredServices)

    } catch (err) {
        console.log(err)
        return res.status(500).json({message: err.message})
        //errorHandler(res, err)
    }
}

module.exports = searchServices;