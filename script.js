let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

async function cargarProductos() {
  const res = await fetch("productos.json");
  const productos = await res.json();
  const contenedor = document.getElementById("productos");

  productos.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}">
      <h3>${p.nombre}</h3>
      <p>${p.descripcion}</p>
      <p><strong>$${p.precio.toLocaleString("es-CO")}</strong></p>
      <p>Stock: ${p.stock}</p>
      <button onclick="agregarAlCarrito(${p.id})">Agregar al carrito</button>
    `;
    contenedor.appendChild(div);
  });
}

async function agregarAlCarrito(id) {
  const res = await fetch("productos.json");
  const productos = await res.json();
  const producto = productos.find(p => p.id === id);
  carrito.push(producto);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert("Producto agregado al carrito");
}

function mostrarCarrito() {
  const contenedor = document.getElementById("carrito-contenido");
  contenedor.innerHTML = "";
  let subtotal = 0;
  carrito.forEach((item, i) => {
    subtotal += item.precio;
    contenedor.innerHTML += `<div class="carrito-item">
      <h3>${item.nombre}</h3>
      <p>Precio: $${item.precio.toLocaleString("es-CO")}</p>
    </div>`;
  });
  document.getElementById("subtotal").innerText = "Subtotal: $" + subtotal.toLocaleString("es-CO");
}

function enviarWhatsApp() {
  let mensaje = "Hola, quiero finalizar mi compra:%0A";
  carrito.forEach(item => {
    mensaje += `- ${item.nombre} $${item.precio.toLocaleString("es-CO")}%0A`;
  });
  window.open("https://wa.me/573001112233?text=" + mensaje, "_blank");
}