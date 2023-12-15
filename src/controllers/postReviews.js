const { Review, Orden } = require('../db');

async function postReviews(req, res) {
  try {
    const { contenido, puntuacion, id_orden } = req.body;

    // Verificar si la orden existe
    const orden = await Orden.findByPk(id_orden);
    console.log(req.body)
    if (!orden) {
      return res.status(404).json({ message: 'Orden No Encontrada' });
    }

    // Crear la reseña y asignarla a la orden
    const review = await Review.create({
      contenido: contenido,
      puntuacion: puntuacion,
      id_orden: id_orden,//
    });
    

    console.log('Reseña cargada correctamente.');

    return res.status(200).json({ message: 'Reseña cargada correctamente' });
  } catch (error) {
    console.error('Error al cargar la Reseña:', error);
    return res.status(500).json({ message: 'Error al cargar la Reseña', error: error.message });
  }
}

module.exports = postReviews;