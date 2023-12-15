const { User , UserType } = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const {
    TOKEN_KEY
  } = process.env;





const postUser = async (req, res) => {

    try { 
        const { email , name } = req.body
        if (!email || !name) {
          return res.status(400).json({ message: 'Email and name are required fields.' });

      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format.' });
        }
        const user = await User.findOrCreate({
            where: {
              email :email,
              name: name
            },
          });

          console.log("User:", user[0].uuid)

          const userType = await UserType.findOrCreate({
            where:{
              UserUuid: user[0].uuid
            }
          });

          // await user.addVehiculo(userType);

        return res.status(200).json({ user, userType });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports =  postUser ;