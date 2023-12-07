//* MERCADO PAGO
const mercadopago = require("mercadopago");

const postMercadoPago = async (req, res) => {
  try {
    let preference = {
      items: [
        {
          title: req.body.description,
          unit_price: Number(req.body.price),
          quantity: Number(req.body.quantity),
        },
      ],
      back_urls: {
        success: "https://mechserv-pf.onrender.com/",
        failure: "https://mechserv-pf.onrender.com/",
        pending: "",
      },
      auto_return: "approved",
    };

    mercadopago.preferences
      .create(preference)
      .then(function (response) {
        res.json({
          id: response.body.id,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
module.exports = postMercadoPago;
