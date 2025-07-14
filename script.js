// script.js

// Selecciona todos los botones con el texto "Agregar al carrito"

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const botonesAgregar = document.querySelectorAll('.btn-carrito');
const contador = document.getElementById('contador-carrito');
const listaCarrito = document.getElementById('lista-carrito');
const popup = document.getElementById('carrito-popup');
const verCarrito = document.getElementById('ver-carrito');

function actualizarContador() {
  contador.textContent = carrito.length;
}

function mostrarCarrito() {
  listaCarrito.innerHTML = '';
  carrito.forEach((producto, index) => {
    const li = document.createElement('li');
    li.textContent = producto;
    listaCarrito.appendChild(li);
  });
  popup.style.display = 'block';
}

function cerrarCarrito() {
  popup.style.display = 'none';
}

function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

botonesAgregar.forEach(btn => {
  btn.addEventListener('click', () => {
    const producto = btn.parentElement.querySelector('h3').textContent;
    carrito.push(producto);
    guardarCarrito();
    actualizarContador();
  });
});

verCarrito.addEventListener('click', mostrarCarrito);

function enviarWhatsApp() {
  if (carrito.length === 0) {
    alert('Tu carrito está vacío');
    return;
  }
  const mensaje = encodeURIComponent(`¡Hola! Quiero pedir:\n${carrito.map(p => '🕯️ ' + p).join('\n')}`);
  const url = `https://wa.me/573120000000?text=${mensaje}`;
  window.open(url, '_blank');

  // Limpiar carrito después de enviar
  carrito = [];
  guardarCarrito();
  actualizarContador();
  cerrarCarrito();
}

// Ejecutar al cargar la página para actualizar contador
actualizarContador();



document.body.addEventListener("click", () => {
  document.body.style.backgroundColor = "#ffe0b3";
});


window.addEventListener("scroll", function () {
  const headerFlotante = document.getElementById("menuScroll");
  if (window.scrollY > 100) {
    headerFlotante.classList.add("visible");
  } else {
    headerFlotante.classList.remove("visible");
  }
});

