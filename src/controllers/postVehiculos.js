const { Vehiculo, User } = require('../db');
const { uploadImage } = require('../cloudinary/upLoadImage'); // ajusta la ruta según tu estructura de archivos

async function postVehiculos(req, res) {
  try {
    // Obtén los datos de la solicitud, incluida la imagen si se proporciona
    const { marca, modelo, date, users, image } = req.body;

    // Verificar si el usuario existe
    const user = await User.findByPk(users);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // let imageUrl;

    // // Verificar si se proporcionó una imagen en la solicitud
    // if (image) {
    //   try {
    //     // Cargar la imagen a Cloudinary y obtener la URL segura
    //     imageUrl = await uploadImage(image);
    //   } catch (error) {
    //     console.error('Error al cargar la imagen:', error);
    //     return res.status(500).json({ message: 'Error al cargar la imagen' });
    //   }
    // }

    // Crear el vehículo y asignarlo al usuario
    const vehiculo = await Vehiculo.create({
      marca: marca,
      modelo: modelo,
      date: date,
      image: image, 
      UserUuid: users,
    });
    await user.addVehiculo(vehiculo);

    console.log('Vehículo cargado correctamente.');
    console.log('Vehículo creado:', vehiculo.toJSON());
    console.log('Usuario asociado al vehículo:', user.toJSON());

    return res.status(200).json({ message: 'Vehículo cargado correctamente' });
  } catch (error) {
    console.error('Error al cargar el vehículo:', error);
    return res.status(500).json({ message: 'Error al cargar el vehículo' });
  }
}

module.exports = postVehiculos;