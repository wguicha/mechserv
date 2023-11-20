const dummyData = require('../../serviceList.json')
const getServices = require('../controllers/getServices');

const searchServices = async  (req, res) => {
    try{
        console.log("Services db:", getServices())
        const { orderBy, orderType, keyWord } = req.query;
        let filterServ = [];

        if(!orderBy && !orderType && !keyWord){
            console.log("Caso 1")
            res.status(200).json(dummyData);
            return
        }

        if(keyWord){
            console.log("Filtrado")
            filterServ = dummyData.filter((serv) =>{
                return serv.name.toLowerCase().includes(keyWord.toLowerCase())
            })
        }

        if(orderBy && keyWord){
            console.log("Caso 2")
            res.status(200).json(sortServ(orderBy, orderType, filterServ))
            return
        }

        if(orderBy){
            console.log("Caso 3")
            console.log("Services db 2:", getServices())
            res.status(200).json(sortServ(orderBy, orderType, dummyData))
            return
        }else{
            console.log("Caso 4")
            res.status(200).json(dummyData);
            return
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