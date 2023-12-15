const cloudinary = require('cloudinary').v2;

// Configuración de Cloudinary (asegúrate de configurar CLOUD_NAME, API_KEY y API_SECRET)
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

// Función para cargar una imagen a Cloudinary y devolver la URL segura
const uploadImage = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath);
    return result.secure_url;
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw error;
  }
};

module.exports = { uploadImage };