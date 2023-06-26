const router = require("express").Router();

router.use("/contraptions", require("./contraption.routes"));
router.use("/auth", require("./auth.routes"));

module.exports = router;

// recuerda!!!! en la autenficacion del BACK , comprueba en postman solo los POST los GET obvio !! te dan error
