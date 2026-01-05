const form = document.getElementById("contactForm");
const okMessage = document.getElementById("ok");
const selectButton = document.getElementById("selectButton");
const selectDropdown = document.getElementById("selectDropdown");
const destino = document.getElementById("destino");
const selectText = document.querySelector(".select-text");
const splash = document.getElementById("splash");

// Oculta el splash de logo después de cargar
window.addEventListener("load", () => {
    if (!splash) return;

    setTimeout(() => {
        splash.classList.add("hidden");
        document.body.classList.remove("no-scroll");

        setTimeout(() => splash.remove(), 650);
    }, 700);
});

// Validación de mensaje
function validateMessage(message) {
    return message.trim().length >= 5;
}

// Mostrar mensaje de éxito
function showSuccessMessage() {
    okMessage.style.display = "block";
    okMessage.style.animation = "slideInDown 0.5s ease-out";
    
    setTimeout(() => {
        okMessage.style.animation = "slideInDown 0.5s ease-out reverse";
        setTimeout(() => {
            okMessage.style.display = "none";
        }, 500);
    }, 3000);
}

// Custom Select Logic
selectButton.addEventListener("click", function () {
    selectDropdown.classList.toggle("active");
    selectButton.classList.toggle("active");
});

document.querySelectorAll(".select-option").forEach(option => {
    option.addEventListener("click", function () {
        const value = this.getAttribute("data-value");
        const name = this.querySelector(".option-name").textContent;
        
        destino.value = value;
        selectText.textContent = name;
        
        // Actualizar clase active
        document.querySelectorAll(".select-option").forEach(opt => {
            opt.classList.remove("active");
        });
        this.classList.add("active");
        
        // Cerrar dropdown
        selectDropdown.classList.remove("active");
        selectButton.classList.remove("active");
    });
});

// Cerrar dropdown al hacer click afuera
document.addEventListener("click", function (e) {
    if (!e.target.closest(".custom-select-wrapper")) {
        selectDropdown.classList.remove("active");
        selectButton.classList.remove("active");
    }
});

// Validación del formulario
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();
    const telefono = destino.value;

    // Validaciones
    if (nombre.length < 2) {
        alert("Por favor, ingresa tu nombre completo");
        return;
    }

    if (!validateMessage(mensaje)) {
        alert("El mensaje debe tener al menos 5 caracteres");
        return;
    }

    if (!telefono) {
        alert("Por favor, selecciona con quién deseas hablar");
        return;
    }

    // Crear mensaje para WhatsApp
    const texto = 
        `Hola, soy ${nombre}%0A` +
        `Mensaje:%0A${mensaje}`;

    const url = `https://wa.me/${telefono}?text=${texto}`;

    // Mostrar éxito y limpiar formulario
    showSuccessMessage();
    form.reset();
    selectText.textContent = "¿Con quién querés hablar?";
    destino.value = "";
    document.querySelectorAll(".select-option").forEach(opt => {
        opt.classList.remove("active");
    });
    
    // Abrir WhatsApp después de un pequeño delay
    setTimeout(() => {
        window.open(url, "_blank");
    }, 500);
});

// Animación de scroll para elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px"
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

// Observar elementos para animación
document.querySelectorAll(".service").forEach(el => {
    observer.observe(el);
});

// Efecto de scroll en navbar
let lastScrollTop = 0;
const nav = document.querySelector(".nav");

window.addEventListener("scroll", function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        nav.style.background = "rgba(10, 14, 39, 0.95)";
        nav.style.borderBottomColor = "rgba(0, 217, 255, 0.2)";
    } else {
        nav.style.background = "rgba(10, 14, 39, 0.8)";
        nav.style.borderBottomColor = "rgba(0, 217, 255, 0.1)";
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Smooth scroll para links de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});