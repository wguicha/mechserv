const { Servicio } = require('../db')
const { Op } = require("sequelize");

const searchServices = async  (req, res) => {
    try{
        let filteredServices = []
        const category = req.query.category && req.query.category.toLowerCase();
        const keyWord = req.query.keyWord;

        if( !(!keyWord) && !(!category)) {
            filteredServices = await Servicio.findAll({
                where : {
                    [Op.and]: [
                        {categoria: category[0].toUpperCase() + category.slice(1)},
                        {[Op.or]:[{description : {[Op.iLike] : `%${keyWord}%`} },
                                 {name : {[Op.like] : `%${keyWord}%`} }
                                ]}
                    ]
                }
            })
            return res.status(200).json(filteredServices)
        }

        if( !keyWord && category) {
            filteredServices = await Servicio.findAll({
                where : {
                    categoria: category
                }
            })
            return res.status(200).json(filteredServices)
        }

        if( keyWord && !category) {

            filteredServices = await Servicio.findAll({
                where : {[Op.or]:[{description : {[Op.iLike] : `%${keyWord}%`} },
                {name : {[Op.like] : `%${keyWord}%`} }
               ]}
            })
            return res.status(200).json(filteredServices)
        }


    } catch (err) {
        console.log(err)
        return res.status(500).json({message: err.message})
        //errorHandler(res, err)
    }
}

let sortServ = (sortBy, sortType, services) => {
    console.log(sortBy, "-- ", sortType, "--", "")
    switch (sortBy) {
        case "price":
            console.log("Case price")
            return services.sort((x,y) => {
                if(sortType === "desc"){
                    console.log("desc")
                    return y.price > x.price;
                }else{
                    console.log("asc")
                    return x.price > y.price;
                }
            });
            break;
        default:
            return services;
    }

}

module.exports = searchServices;