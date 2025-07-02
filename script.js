// Variables para el carrito
let cart = [];
let total = 0;

// Funcionalidad del carrito
function toggleCart() {
    document.getElementById('carrito').classList.toggle('active');
}

function addToCart(productName, price) {
    const existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name: productName, price: price, quantity: 1 });
    }
    
    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('carrito-items');
    cartItems.innerHTML = '';
    
    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'carrito-item';
        itemDiv.innerHTML = `
            <div>
                <p>${item.name}</p>
                <p>Cantidad: ${item.quantity}</p>
                <p>$${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <button onclick="removeFromCart(${index})">Eliminar</button>
        `;
        cartItems.appendChild(itemDiv);
    });
    
    total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('total').textContent = total.toFixed(2);
    document.getElementById('cart-count').textContent = cart.length;
}

function enviarWhatsApp() {
    if (cart.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }

    let mensaje = 'Hola, quiero hacer un pedido:\n\n';
    cart.forEach(item => {
        mensaje += `${item.quantity} x ${item.name} - $${(item.price * item.quantity).toFixed(2)}\n`;
    });
    mensaje += `\nTotal: $${total.toFixed(2)}`;
    
    const numero = '+573001234567'; // Reemplazar con número real
    const url = `https://wa.me/ ${numero}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

// Carrusel
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-container img');

function showSlide(n) {
    currentSlide = n;
    const carousel = document.getElementById('carousel');
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide)
}



// Menú responsive
document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    loadPromociones();
    
    // Carrusel automático
    setInterval(() => {
        nextSlide();
    }, 5000);
});





// Cargar promoción desde Google Sheets CSV
async function cargarPromocion() {
    const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRafczvpXgIsb-YvFKfGGHxY3Ch2U85HgWIj90KMVP24kD-yTSxyTAkl1jV9O1xp_UQC2ZxKH_IqUE-/pub?gid=0&single=true&output=csv';

    try {
        const res = await fetch(sheetURL);
        const data = await res.text();

        const [headers, ...rows] = data.split('\n').map(r => r.split(','));
        const [imagen_url, texto_promocion] = rows[0];

        const container = document.getElementById('promo-container');
        container.innerHTML = `
            <img src="${imagen_url}" alt="Promoción" style="max-width:100%;border-radius:10px;box-shadow:0 2px 10px rgba(0,0,0,0.2);"><br>
            <p style="font-size:1.2rem;margin-top:1rem;">${texto_promocion}</p>
        `;
    } catch (error) {
        document.getElementById('promo-container').innerHTML = '<p>Todavia no hay promocion, vuelve mas tarde !!</p>';
    }
}

// Llama a la función cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    cargarPromocion();
    
    // Carrusel automático
    setInterval(() => {
        nextSlide();
    }, 5000);
});





document.addEventListener('DOMContentLoaded', function () {
    // Carrusel automático
    const track = document.getElementById('carouselTrack');
    const items = document.querySelectorAll('.carousel-item');
    const cloneCount = 5; // Número de elementos a clonar

    // Crear clones para bucle infinito
    if (track && items.length > 0) {
        for (let i = 0; i < cloneCount; i++) {
            const clone = items[i].cloneNode(true);
            track.appendChild(clone);
        }
    }
});