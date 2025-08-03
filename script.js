//script js

localStorage.removeItem('carrito');
let carrito = [];

// Elementos del DOM
const botonesAgregar = document.querySelectorAll('.btn-carrito');
const contador = document.getElementById('contador-carrito');
const listaCarrito = document.getElementById('lista-carrito');
const popup = document.getElementById('carrito-popup');
const verCarrito = document.getElementById('ver-carrito');

// Actualiza el número del carrito
function actualizarContador() {
  contador.textContent = carrito.length;
}

// Mostrar el carrito con productos y botón de eliminar
function mostrarCarrito() {
  listaCarrito.innerHTML = '';

  carrito.forEach((producto, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${producto}
      <button onclick="eliminarDelCarrito(${index})" style="margin-left: 10px; color: white;">Eliminar</button>
    `;
    listaCarrito.appendChild(li);
  });

  // Botón "Haz tu pedido"
  if (carrito.length > 0) {
    const botonPedido = document.createElement('button');
    botonPedido.textContent = "Haz tu pedido";
    botonPedido.style.cssText = "margin-top: 10px; background-color: #25d366; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;";
    botonPedido.onclick = enviarWhatsApp;
    listaCarrito.appendChild(botonPedido);
  }

  popup.style.display = 'block';
}

// Eliminar un producto del carrito
function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  guardarCarrito();
  actualizarContador();
  mostrarCarrito();
}

// Cerrar el popup del carrito
function cerrarCarrito() {
  popup.style.display = 'none';
}

// Guardar el carrito en localStorage
function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Agregar producto al carrito
botonesAgregar.forEach(btn => {
  btn.addEventListener('click', () => {
    const producto = btn.parentElement.querySelector('h3').textContent;
    carrito.push(producto);
    guardarCarrito();
    actualizarContador();
  });
});

// Mostrar carrito al hacer clic en el ícono
verCarrito.addEventListener('click', mostrarCarrito);

// Enviar mensaje por WhatsApp con los productos seleccionados
function enviarWhatsApp() {
  if (carrito.length === 0) {
    alert('Tu carrito está vacío');
    return;
  }

  const mensaje = encodeURIComponent(`¡Hola! Quiero pedir:\n${carrito.map(p => '🕯️ ' + p).join('\n')}`);
  const url = `https://wa.me/573120000000?text=${mensaje}`;
  window.open(url, '_blank');
}

// Al cargar la página
actualizarContador();

// Cambiar fondo al hacer clic
document.body.addEventListener("click", () => {
  document.body.style.backgroundColor = "#ffe0b3";
});

// Mostrar menú flotante al hacer scroll
window.addEventListener("scroll", function () {
  const headerFlotante = document.getElementById("menuScroll");
  if (window.scrollY > 100) {
    headerFlotante.classList.add("visible");
  } else {
    headerFlotante.classList.remove("visible");
  }
});
