document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        
        const nombre = document.getElementById("nombre").value;
        const email = document.getElementById("email").value;
        const tema = document.getElementById("tema").value;
        const mensaje = document.getElementById("mensaje").value;

        // Validar que los campos requeridos no estén vacíos
        if (nombre && email && tema && mensaje) {
            const correoDestino = "srssdesing@gmail.com";
            const asunto = `Nuevo mensaje de ${nombre}`;
            const cuerpo = `Nombre: ${nombre}\nEmail: ${email}\nTema: ${tema}\nMensaje: ${mensaje}`;

            const url = `https://script.google.com/macros/s/AKfycbwY7Wte1jiWPJ3EnMw4tOnEep3CMljOcMPz9DX4gWYwC6Kc8pKXU_yPa0eTunMF-2Ob/exec?to=${correoDestino}&subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;

            fetch(url, { method: "GET" })
                .then(response => response.json())
                .then(data => {
                    if (data.result === "success") {
                        const mensajeConfirmacion = document.getElementById("mensaje-confirmacion");
                        mensajeConfirmacion.style.display = "block";
                        form.reset();
                        setTimeout(function () {
                            mensajeConfirmacion.style.display = "none";
                        }, 5000);
                    } else {
                        alert("There was an error sending the message. Please try again later.");
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                    alert("There was an error sending the message. Please try again.");
                });
        } else {
            alert("Please complete all required fields.");
        }
    });
});

// This email will not receive spam messages :P 
// If you see this message, hire me, I'm good :)
