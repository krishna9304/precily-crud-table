const table = require("../db/models/table");
const Table = require("../db/models/table");

const router = require("express").Router();

router.post("/create", (req, res, next) => {
  let data = req.body;
  let table = new Table(data);
  table
    .save()
    .then((doc) => {
      res.send({
        res: true,
        table: doc,
      });
    })
    .catch(next);
});

router.post("/getTable", (req, res, next) => {
  let { id } = req.body;
  table
    .findById(id)
    .then((doc) => {
      res.send({
        res: true,
        table: doc,
      });
    })
    .catch(next);
});

router.get("/getAll", (req, res, next) => {
  table
    .find({})
    .then((docs) => {
      res.send({
        res: true,
        tables: docs,
      });
    })
    .catch(next);
});

router.post("/delete", (req, res, next) => {
  let { id } = req.body;
  table
    .deleteOne({ _id: id })
    .then((result) => {
      res.send({
        res: true,
        msg: "Deleted table!",
      });
    })
    .catch(next);
});

router.post("/update", (req, res, next) => {
  let { data, id } = req.body;
  table
    .findById(id)
    .then((doc) => {
      doc.headers = data.headers;
      doc.rows = data.rows;
      doc
        .save()
        .then((doc) => {
          res.send({
            res: true,
            msg: "Data updated successfully!",
          });
        })
        .catch(next);
    })
    .catch(next);
});

module.exports = router;
