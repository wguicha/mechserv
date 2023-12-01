const { User , Vehiculos } = require('../db');

const getUser = async (req, res) => {

    try {
        const {userId} = req.params
        const user = await User.findOne({
            where: {
              uuid: userId, 
            },
            include: Vehiculos,
          });
      
       

        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports =  getUser ;







