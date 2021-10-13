const mongoose = require("mongoose");

const Table = mongoose.Schema({
  headers: {
    type: Array,
    default: [],
  },
  rows: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("table", Table);
