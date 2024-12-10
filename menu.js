// JavaScript para cerrar el menú hamburguesa al hacer clic en un enlace
document.querySelectorAll('.menu-container a').forEach((link) => {
    link.addEventListener('click', () => {
        document.querySelector('nav').classList.remove('active'); // Cerrar el menú
    });
});

// Activar el menú al hacer clic en el ícono de hamburguesa
document.querySelector('.hamburger-menu').addEventListener('click', () => {
    document.querySelector('nav').classList.toggle('active');
});

// Función para generar el array de productos
function menu() {
    const productos = [
        {
            ID: 1,
            Nombre: "Cerveza Artesanal",
            Descripcion: "Birra tirada de Marca Session, está en IPA, Golden, APA, Irish Red y Porter.",
            Precio: 2000,
            Imagen: "img/Menu/pinta.jpg"
        },
        {
            ID: 2,
            Nombre: "Pizza",
            Descripcion: "Típica pizza estilo Napolitana: Muzza, Especial, 4 Quesos y Napo.",
            Precio: 15000,
            Imagen: "img/Menu/pizza.jpg"
        },
        {
            ID: 3,
            Nombre: "Hamburguesa",
            Descripcion: "Hamburguesa de la casa, doble medallón, cheddar, panceta, pepinillos y cebolla.",
            Precio: 7000,
            Imagen: "img/Menu/hambur.jpg"
        },
        {
            ID: 4,
            Nombre: "Picada Caliente",
            Descripcion: "Bastones de muzza, Papas fritas, Rabas.",
            Precio: 20000,
            Imagen: "img/Menu/frituras.jpg"
        },
        {
            ID: 5,
            Nombre: "Papas con Cheddar",
            Descripcion: "Papas rústicas con cheddar, panceta y verdeo.",
            Precio: 5000,
            Imagen: "img/Menu/papas.jpg"
        }
    ];

    console.log("Productos generados:", productos);
    return productos;
}

// Renderizar los productos
function renderProductos() {
    const productos = menu(); // Llama a la función menu para obtener los productos
    const container = document.getElementById("productos-container");

    productos.forEach((producto) => {
        // Crear tarjeta
        const card = document.createElement("div");
        card.classList.add("producto-card");

        // Contenido de la tarjeta
        card.innerHTML = `
            <img src="${producto.Imagen}" alt="${producto.Nombre}" class="producto-imagen">
            <h4>${producto.Nombre}</h4>
            <p><strong>Precio:</strong> $${producto.Precio}</p>
            <button class="btn-agregar" data-id="${producto.ID}">Agregar al Carrito</button>
            <button class="btn-descripcion" data-id="${producto.ID}">Ver descripción</button>
        `;

        // Agregar la tarjeta al contenedor
        container.appendChild(card);

        // Añadir evento al botón de agregar al carrito
        const btnAgregar = card.querySelector(".btn-agregar");
        btnAgregar.addEventListener("click", () => agregarAlCarrito(producto));

        // Añadir evento al botón de descripción
        const btnDescripcion = card.querySelector(".btn-descripcion");
        btnDescripcion.addEventListener("click", () => mostrarDescripcion(card, producto.Descripcion));
    });
}

// Mostrar la descripción del producto al hacer clic en el botón
function mostrarDescripcion(card, descripcion) {
    // Verificar si ya existe la descripción para evitar duplicados
    if (!card.querySelector(".descripcion")) {
        const p = document.createElement("p");
        p.classList.add("descripcion");
        p.textContent = descripcion;
        card.appendChild(p);
    }
}

// Renderizar los productos al cargar la página
document.addEventListener("DOMContentLoaded", renderProductos);

// Agregar un producto al carrito y guardar en localStorage
function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderCarrito();
}

// Renderizar el contenido del carrito
function renderCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoContainer = document.getElementById("carrito-container");

    carritoContainer.innerHTML = ""; // Limpiar contenido previo

    carrito.forEach((item, index) => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("carrito-item");
        itemElement.innerHTML = `
            <p>${item.Nombre} - $${item.Precio}</p>
            <button class="eliminar-item" data-index="${index}">Eliminar</button>
        `;
        carritoContainer.appendChild(itemElement);
    });

    // Añadir evento para eliminar productos
    const botonesEliminar = carritoContainer.querySelectorAll(".eliminar-item");
    botonesEliminar.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            eliminarDelCarrito(e.target.dataset.index);
        });
    });
}

// Eliminar un producto del carrito
function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderCarrito();
}

// Vaciar el carrito completamente
function vaciarCarrito() {
    localStorage.removeItem('carrito');
    renderCarrito();
}

// Evento para vaciar el carrito
document.getElementById("vaciar-carrito").addEventListener("click", vaciarCarrito);

