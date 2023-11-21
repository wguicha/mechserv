const { User } = require('../db');

async function getUsers (req, res) {
    try{
        const usuarios = await User.findAll();

        res.status(200).json(usuarios);

    } catch (err) {
        console.log(err)
        //return res.status(500).json({message: err.message})
        //errorHandler(res, err)
    }
}

module.exports = getUsers;