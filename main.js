function init() {
  const productos = JSON.parse(productosJSON)

  muestraProductos(productos)
}

function muestraProductos(productos) {
  let contenedorPrincipal = document.getElementById("catalogo")

  limpiaContenedor(contenedorPrincipal)

  for (const product of productos) {
    crearArticleProducto(product)
  }
}

function limpiaContenedor(contenedorPrincipal) {
  while (contenedorPrincipal.firstChild) {
    contenedorPrincipal.removeChild(contenedorPrincipal.firstChild)
  }
}

function crearArticleProducto(producto) {
  let colorInicial = producto.colores[0]
  let rutaImg = producto.imagenes[colorInicial]

  let contenedorPrincipal = document.getElementById("catalogo")

  // Articulo
  let articulo = creaArticulo(contenedorPrincipal)

  // Imagen
  let imagen = creaImagen(articulo, rutaImg, producto, colorInicial)

  // H2
  creaTitulo(articulo, producto)

  // P
  creaDescripcion(articulo, producto)

  // div precio y tag
  creaPrecioYTag(articulo, producto)

  // div tallas
  creaSelectTallas(articulo, producto)

  // div colores
  creaSelectColores(articulo, producto)

  // boton añadir carrito
  let btnAdd = creaBotonAdd(articulo)

  // Evento
  asignaEventoBoton(btnAdd)

  // (imagen está creada por si luego quieres usarla con evento de color)
  return { articulo, imagen, btnAdd }
}

function creaArticulo(contenedorPrincipal) {
  let articulo = document.createElement("article")
  articulo.setAttribute("class", "product")
  contenedorPrincipal.appendChild(articulo)
  return articulo
}

function creaImagen(articulo, rutaImg, producto, colorInicial) {
  let imagen = document.createElement("img")
  imagen.setAttribute("class", "product__img")
  imagen.setAttribute("src", rutaImg)
  imagen.setAttribute("alt", `Camiseta ${producto.nombre} color ${colorInicial}`)
  articulo.append(imagen)
  return imagen
}

function creaTitulo(articulo, producto) {
  let titulo2 = document.createElement("H2")
  titulo2.setAttribute("class", "product__title")
  let textoTitulo = document.createTextNode(producto.nombre)
  titulo2.appendChild(textoTitulo)
  articulo.appendChild(titulo2)
  return titulo2
}

function creaDescripcion(articulo, producto) {
  let paragrafo = document.createElement("p")
  paragrafo.setAttribute("class", "product__desc")
  let textoParagrafo = document.createTextNode(producto.descripcion)
  paragrafo.appendChild(textoParagrafo)
  articulo.appendChild(paragrafo)
  return paragrafo
}

function creaPrecioYTag(articulo, producto) {
  let divRow = document.createElement("div")
  divRow.setAttribute("class", "row")
  articulo.appendChild(divRow)

  let spanPrice = document.createElement("span")
  spanPrice.setAttribute("class", "price")
  let textoSpanPrice = document.createTextNode(producto.precioBase + "€")
  spanPrice.appendChild(textoSpanPrice)
  divRow.appendChild(spanPrice)

  let spanTag = document.createElement("span")
  spanTag.setAttribute("class", "tag")
  let textoSpanTag = document.createTextNode(producto.tags[0])
  spanTag.appendChild(textoSpanTag)
  divRow.appendChild(spanTag)

  return divRow
}

function creaSelectTallas(articulo, producto) {
  let divField = document.createElement("div")
  divField.setAttribute("class", "field")
  articulo.appendChild(divField)

  let labelTalla = document.createElement("label")
  labelTalla.setAttribute("for", `talla-${producto.id}`)
  labelTalla.appendChild(document.createTextNode("Talla"))
  divField.appendChild(labelTalla)

  let selectTalla = document.createElement("select")
  selectTalla.setAttribute("id", `talla-${producto.id}`)
  selectTalla.setAttribute("name", "talla")
  divField.appendChild(selectTalla)

  // Options
  for (const talla of producto.tallas) {
    let option = document.createElement("option")
    option.value = talla
    option.textContent = talla
    selectTalla.appendChild(option)
  }

  return selectTalla
}

function creaSelectColores(articulo, producto) {
  let divFieldColor = document.createElement("div")
  divFieldColor.setAttribute("class", "field")
  articulo.appendChild(divFieldColor)

  let labelColor = document.createElement("label")
  labelColor.setAttribute("for", `color-${producto.id}`)
  labelColor.textContent = "Color"
  divFieldColor.appendChild(labelColor)

  let selectColor = document.createElement("select")
  selectColor.setAttribute("id", `color-${producto.id}`)
  selectColor.setAttribute("name", "color")
  divFieldColor.appendChild(selectColor)

  for (const color of producto.colores) {
    let option = document.createElement("option")
    option.value = color
    option.textContent = color
    selectColor.appendChild(option)
  }

  return selectColor
}

function creaBotonAdd(articulo) {
  let btnAdd = document.createElement("button")
  btnAdd.setAttribute("type", "button")
  btnAdd.setAttribute("class", "btn-add")
  btnAdd.textContent = "Añadir al carrito"
  articulo.appendChild(btnAdd)
  return btnAdd
}

function asignaEventoBoton(btnAdd) {
  btnAdd.addEventListener("click", () => {
    console.log("Boton pulsado")
  })
}