require('dotenv').config();

async function getUsers (req, res) {
    try{
        const users = [{ user: 'user1'}, { user: 'user2'} ];

        res.status(200).json(users);

    } catch (err) {
        console.log(err)
        return res.status(500).json({message: err.message})
        //errorHandler(res, err)
    }
}

module.exports = getUsers;