const form = document.getElementById("contactForm");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = form.querySelector('input[type="text"]').value;
    const mensaje = form.querySelector('textarea').value;
    const telefono = document.getElementById("destino").value;

    const texto = 
        `Hola, soy ${nombre}%0A` +
        `Mensaje:%0A${mensaje}`;

    const url = `https://wa.me/${telefono}?text=${texto}`;

    window.open(url, "_blank");
    form.reset();
});
