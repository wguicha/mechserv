const { User, UserType } = require('../db');

async function setUser (req, res) {
    const idUser = req.params.idUser;
    const { name, email, isAdmin, isActive} = req.body
    try{
        if (idUser) {
            const user = await User.findByPk(idUser);
            if(user){
                await user.update({
                    name : name,
                    email: email,
                })
                const userType =  await UserType.findOne({
                    where: { UserUuid : idUser}
                });
                await userType.update({
                    isAdmin : isAdmin,
                    isActive: isActive,
                })
                res.status(200).json({ message: 'El Usuario ha sido modificado' });
            } else {
                res.status(500).json({ message: 'Usuario no encontrado' });
            }
        }

    } catch (err) {
        console.log(err)
        //return res.status(500).json({message: err.message})
        //errorHandler(res, err)
    }
}

module.exports = setUser;