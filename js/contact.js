document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        
        grecaptcha.ready(function() {
            // Reemplaza con tu CLAVE DE SITIO de reCAPTCHA (la pública)
            grecaptcha.execute('6Ld5F2grAAAAAEMqnNIE_0KrSKA7A88htuDnBcei', {action: 'submit'}).then(function(token) {
                
                const formData = {
                    nombre: document.getElementById("nombre").value,
                    email: document.getElementById("email").value,
                    tema: document.getElementById("tema").value,
                    mensaje: document.getElementById("mensaje").value,
                    recaptchaToken: token
                };

                if (formData.nombre && formData.email && formData.tema && formData.mensaje) {
                    
                    // --- ¡PEGA AQUÍ LA NUEVA URL QUE COPIASTE EN EL PASO 2! ---
                    const url = "https://script.google.com/macros/s/AKfycbziWyF_z8yPY25KWhX8Du3Y8014cZuYqEcKVVpUuxEO2JS129Oc3z_UtrpNdsCs5bc/exec"; 

                    const submitButton = form.querySelector("button[type='submit']");
                    submitButton.textContent = "Sending...";
                    submitButton.disabled = true;

                    fetch(url, {
                        method: "POST",
                        redirect: "follow",
                        muteHttpExceptions: true,
                        headers: { "Content-Type": "text/plain;charset=utf-8" },
                        body: JSON.stringify(formData), 
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success === true) {
                            const mensajeConfirmacion = document.getElementById("mensaje-confirmacion");
                            mensajeConfirmacion.style.display = "block";
                            form.reset();
                            setTimeout(() => {
                                mensajeConfirmacion.style.display = "none";
                            }, 5000);
                        } else {
                            alert("There was an error sending the message: " + (data.error || "Unknown error"));
                        }
                    })
                    .catch(error => {
                        console.error("Fetch Error:", error);
                        alert("Could not connect to the sending server.");
                    })
                    .finally(() => {
                        submitButton.textContent = "Send Message";
                        submitButton.disabled = false;
                    });
                } else {
                    alert("Please complete all required fields.");
                }
            });
        });
    });
});

