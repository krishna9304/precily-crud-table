const router = require("express").Router();
const table = require("./table");

router.use("/table", table);

module.exports = router;
