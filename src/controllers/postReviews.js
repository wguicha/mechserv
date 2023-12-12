const { Review, User } = require('../db');

async function postReviews(req, res) {
  try {
    const { contenido, puntuacion, users } = req.body;

    // Verificar si el usuario existe
    const user = await User.findByPk(users);
    console.log(req.body)
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Crear la reseña y asignarlo al usuario
    const review = await Review.create({
      contenido: contenido,
      puntuacion: puntuacion,
      Useruuid: users
    });
    await user.addReview(review);

    console.log('Reseña cargada correctamente.');

    return res.status(200).json({ message: 'Reseña cargada correctamente' });
  } catch (error) {
    console.error('Error al cargar la Reseña:', error);
    return res.status(500).json({ message: 'Error al cargar la Reseña' });
  }
}

module.exports =  postReviews;