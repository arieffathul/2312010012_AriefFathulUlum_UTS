const mongoose = require("mongoose");

const timnasScheme = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  noPunggung: {
    type: Number,
    required: true,
  },
  posisi: {
    type: String,
    required: true,
  },
  foto: {
    type: String,
  },
  klub: {
    type: String,
    required: true,
  },
  naturalisasi: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Timnas", timnasScheme);