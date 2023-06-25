const router = require("express").Router();

router.use("/contraptions", require("./contraption.routes"));

module.exports = router;
