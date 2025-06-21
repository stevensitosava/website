document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");

    if (!form) {
        console.error("Form with id='contact-form' not found");
        return;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const nombre = document.getElementById("nombre")?.value.trim();
        const email = document.getElementById("email")?.value.trim();
        const tema = document.getElementById("tema")?.value.trim();
        const mensaje = document.getElementById("mensaje")?.value.trim();

        if (!nombre || !email || !tema || !mensaje) {
            alert("Please complete all fields.");
            return;
        }

        const submitButton = form.querySelector("button[type='submit']");
        submitButton.textContent = "Sending...";
        submitButton.disabled = true;

        grecaptcha.ready(function () {
            grecaptcha.execute('6Ld5F2grAAAAAEMqnNIE_0KrSKA7A88htuDnBcei', { action: 'submit' }).then(function (token) {
                const data = {
                    nombre,
                    email,
                    tema,
                    mensaje,
                    recaptchaToken: token
                };

                fetch("https://script.google.com/macros/s/AKfycbwGdg1FYOn_Q2705uKle5M0F5huNlVRD-9i7Q-j8Ii96f5cY-hzisly3GVJ8jwU-fXDMg/exec", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                .then(response => {
                    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
                    return response.json();
                })
                .then(result => {
                    console.log("Respuesta del servidor:", result); // 👈 Agrega esta línea
                    if (result.success) {
                        document.getElementById("mensaje-confirmacion").style.display = "block";
                        form.reset();
                        setTimeout(() => {
                            document.getElementById("mensaje-confirmacion").style.display = "none";
                        }, 5000);
                    } else {
                        alert("Error: " + (result.error || "The message could not be validated."));
                    }
                })
                .catch(error => {
                    console.error("Error en fetch:", error);
                    alert("Could not connect to the server.");
                })
                .finally(() => {
                    submitButton.textContent = "Send Message";
                    submitButton.disabled = false;
                });
            });
        });
    });
});

