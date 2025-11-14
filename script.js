// Inicializa EmailJS con tu clave pública
emailjs.init("fksMZpFl9TQtslnTL");

// Funciones para manejar los modales
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('active');
    document.body.classList.add('modal-open');
    initModalCarousel(modal);
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
}

// Cerrar modal al hacer clic fuera del contenido
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        closeModal(e.target.id);
    }
});

// Cerrar con tecla ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(modal => {
            closeModal(modal.id);
        });
    }
});

// Funciones para el carrusel del modal
function initModalCarousel(modal) {
    const carousel = modal.querySelector('.carousel-inner');
    const images = carousel.querySelectorAll('img');
    const dots = modal.querySelectorAll('.modal-dot');
    let currentIndex = 0;

    function showSlide(index) {
        images.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        currentIndex = index;
    }

    // Event listeners para los botones de navegación
    modal.querySelectorAll('.modal-carousel-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });

    // Event listeners para los dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function(e) {
            e.stopPropagation();
            showSlide(index);
        });
    });
}

function prevSlide(btn) {
    const modal = btn.closest('.modal');
    const carousel = modal.querySelector('.carousel-inner');
    const images = carousel.querySelectorAll('img');
    let currentIndex = Array.from(images).findIndex(img => img.classList.contains('active'));
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showSlideInModal(modal, currentIndex);
}

function nextSlide(btn) {
    const modal = btn.closest('.modal');
    const carousel = modal.querySelector('.carousel-inner');
    const images = carousel.querySelectorAll('img');
    let currentIndex = Array.from(images).findIndex(img => img.classList.contains('active'));
    currentIndex = (currentIndex + 1) % images.length;
    showSlideInModal(modal, currentIndex);
}

function goToSlide(dot, index) {
    const modal = dot.closest('.modal');
    showSlideInModal(modal, index);
}

function showSlideInModal(modal, index) {
    const carousel = modal.querySelector('.carousel-inner');
    const images = carousel.querySelectorAll('img');
    const dots = modal.querySelectorAll('.modal-dot');

    images.forEach(img => img.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    images[index].classList.add('active');
    dots[index].classList.add('active');
}

// Smooth scrolling para los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Carrusel para imágenes de proyectos (tarjetas principales)
document.querySelectorAll('.carousel').forEach(carousel => {
    const images = carousel.querySelectorAll('.carousel-image');
    let currentIndex = 0;

    function showImage(index) {
        images.forEach((img, i) => {
            img.classList.toggle('hidden', i !== index);
            img.classList.toggle('active', i === index);
        });
    }

    // Si hay botones de navegación, mantener esta funcionalidad
    const prevButton = carousel.parentElement.querySelector('.carousel-prev');
    const nextButton = carousel.parentElement.querySelector('.carousel-next');
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        });
        nextButton.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        });
    }
});

// Manejo del formulario de contacto con Formspree (sin recarga)
document.getElementById("contact-form").addEventListener("submit", async function(event) {
    event.preventDefault();
    const formMessage = document.getElementById("form-message");
    formMessage.classList.remove("text-green-600", "text-red-600");
    formMessage.classList.add("hidden");
    const formData = new FormData(this);

    try {
        const response = await fetch("https://formcarry.com/s/r4kI5AhCMyK", {
            method: "POST",
            body: formData,
            headers: {
                "Accept": "application/json"
            }
        });

        if (response.ok) {
            formMessage.textContent = "¡Mensaje enviado con éxito!";
            formMessage.classList.add("text-green-600");
            formMessage.classList.remove("hidden");
            this.reset();
        } else {
            throw new Error("Error en la respuesta del servidor");
        }
    } catch (error) {
        formMessage.textContent = "Error al enviar el mensaje. Por favor, intenta de nuevo.";
        formMessage.classList.add("text-red-600");
        formMessage.classList.remove("hidden");
    }
});

// Protección contra clic derecho
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    alert('El código fuente está protegido. Contacta al desarrollador para más información.');
});

// Scroll Indicator
window.addEventListener('scroll', function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("scrollIndicator").style.width = scrolled + "%";
});

// Añadir el scroll indicator al body al cargar
document.addEventListener('DOMContentLoaded', function() {
    const scrollIndicator = document.createElement('div');
    scrollIndicator.id = 'scrollIndicator';
    document.body.appendChild(scrollIndicator);
});