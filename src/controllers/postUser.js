const { User } = require('../db');
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
        const [user , create] = await User.findOrCreate({
            where: {
             
              email :email,
              name: name

            },

          });
      
       

        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports =  postUser ;