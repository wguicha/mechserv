//* MERCADO PAGO
const mercadopago = require("mercadopago");

const postMercadoPago = async (req, res) => {
  const service = req.body;
  try {
    const preference = {
      items: [
        {
          title: service.name,
          unit_price: service.price,
          quantity: 1,
          currency_id: "USD",
        },
      ],
      back_urls: {
        success: "https://mechserv-pf.onrender.com/orders",
        failure: "https://mechserv-pf.onrender.com/orders",
      },
      auto_return: "approved",
    };

    const resp = await mercadopago.preferences.create(preference);
    console.log(resp);
    res.status(200).json(resp.response.init_point);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
module.exports = postMercadoPago;
