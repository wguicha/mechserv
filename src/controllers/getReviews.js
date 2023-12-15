const { Review } = require('../db');

const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.findAll();

        if (!reviews || reviews.length === 0) {
            return res.status(404).json({ message: 'No se encontraron Reseñas' });
        }

        const formattedReviews = reviews.map((review) => ({
            id: review.id,
            contenido: review.contenido,
            puntuacion: review.puntuacion,
            id_orden: review.id_orden,
                        
        }));

        return res.status(200).json({ reviews: formattedReviews });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports =  getAllReviews;