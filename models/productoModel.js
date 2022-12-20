const mongoose = require("mongoose")

const ProductoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  detalles: {
    type: String,
    required: true,
  },
})

const Producto = mongoose.model("productos", ProductoSchema)

module.exports = { Producto }
