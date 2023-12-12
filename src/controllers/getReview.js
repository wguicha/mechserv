const { User, Review } = require('../db');

const getReviewUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({
      where: {
        uuid: userId,
      },
      include: [
        {
          model: Review,
          attributes: ['id', 'contenido', 'puntuacion'],
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const reviews = user.Reviews.map((review) => {
      return {
        id: review.id,
        contenido: review.contenido,
        puntuacion: review.puntuacion,
        
      };
    });

    return res.status(200).json({ reviews });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getReviewUser;