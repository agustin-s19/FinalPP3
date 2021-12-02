const router = require("express").Router();
const mercadopago = require("mercadopago")(process.env.MP_KEY);

router.post("/payment", (req, res) => {
  mercadopago.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "ars",
    },
    (mercadopagoErr, mercadopagoRes) => {
      if (mercadopagoErr) {
        res.status(500).json(mercadopagoErr);
      } else {
        res.status(200).json(mercadopagoRes);
      }
    }
  );
});

module.exports = router;


module.exports = router;