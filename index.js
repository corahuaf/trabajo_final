const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const { Producto } = require("./models/productoModel")

const port = 3000
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())

const start = async () => {
  try {
    mongoose.set("strictQuery", false)
    mongoose.set("autoIndex", true)
    await mongoose.connect("mongodb://localhost:27017/tienda")
    app.listen(port, () => console.log("Server started on port 3000"))
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}
start()

app.get("/productos", async (req, res) => {
  try {
    const allVentas = await Producto.find({}, { _id: 0 })
    return res.status(200).json(allVentas)
  } catch (error) {
    console.log(error)
  }
})

app.get("*", (req, res) => {
  res.status(404).send(`
  <style>
  body{
    background-color:#1e1e1e;
    color:#fff;
  }
  h1{
    color:red;
  }
  </style>
  <h1>Ruta no válida</h1>
  `)
})
