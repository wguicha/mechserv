const { Review, Orden } = require('../db');

const getReviewOrden = async (req, res) => {
  try {
    const { id_orden } = req.params;

    const review = await Review.findOne({
      where: {
        id_orden: id_orden,
      },
    });

    if (!review) {
      return res.status(200).json({ review: [] });
    }

    const formattedReview = {
      id: review.id,
      contenido: review.contenido,
      puntuacion: review.puntuacion,
      id_orden: review.id_orden,
    };

    return res.status(200).json({ review: formattedReview });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getReviewOrden;