const $ = (element) => document.getElementById(element)

const bodyd = document.getElementById("bodyd")


document.addEventListener("DOMContentLoaded", () => {
  mostrartabla()
})

async function mostrartabla() {
  const productos = await obtenerProductos()

  let contenidoTabla = ""

  productos.forEach((productos) => {
    const { nombre, precio, stock, detalles, carrito } = productos
    contenidoTabla += `
    <div class="product text-center">
                <div class="position-relative mb-3">
                  <div class="badge text-white bg-"></div><a class="d-block" href="detail.html"><img class="img-fluid w-100" src="img/product-1.jpg" alt="..."></a>
                  <div class="product-overlay">
                    <ul class="mb-0 list-inline">
                      <li class="list-inline-item m-0 p-0"><a class="btn btn-sm btn-outline-dark" href="#!"><i class="far fa-heart"></i></a></li>
                      <li class="list-inline-item m-0 p-0"><a class="btn btn-sm btn-dark" href="cart.html">Add to cart</a></li>
                      <li class="list-inline-item me-0"><a class="btn btn-sm btn-outline-dark" href="#productView" data-bs-toggle="modal"><i class="fas fa-expand"></i></a></li>
                    </ul>
                  </div>
                </div>
                <h6> <a class="reset-anchor" href="detail.html">${nombre}</a></h6>
                <p class="small text-muted">$${precio}</p>
                <p class="small text-muted">$${stock}</p>
                <p class="small text-muted">$${detalles}</p>
                <p class="small text-muted">$${carrito}</p>
              </div>
    `
  })

  bodyd.innerHTML = contenidoTabla
}

async function obtenerProductos() {
  const res = await fetch("http://localhost:3000/productos")
  const productos = await res.json()
  return productos
}


function editarProducto(producto) {
  fetch(`http://localhost:3000/productos/${producto.sku}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(producto),
  })
    .then((_) => {
      mostrartabla()
    })
    .catch((error) => {
      toast("Hubo un error", true)
      console.log(error)
    })
}


