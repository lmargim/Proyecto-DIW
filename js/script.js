"use strict"

inicio();

/* FORMULARIO */ 
let checkBoxSoloIda = document.getElementById("soloIda");
let dateVuelta = document.getElementById("dateVuelta");
let botonEnviar = document.getElementById("botonEnviar");

// habilitar/deshabilitar fecha de vuelta
checkBoxSoloIda.addEventListener('change', function() {
    if (checkBoxSoloIda.checked) {
        dateVuelta.disabled = true;
        dateVuelta.value = ""; 
    } else {
        dateVuelta.disabled = false; 
    }
});

// Manejar el evento de click en el botón "Enviar"
botonEnviar.addEventListener('click', function() {
    
    // Validar los campos
    let origen = document.getElementById("origen").value;
    let destino = document.getElementById("destino").value;
    let dateIda = document.getElementById("dateIda").value;

    if (origen !== "" && destino !== "" && dateIda !== "") {
        alert("Datos enviados correctamente.");
    } else {
        alert("Por favor, completa todos los campos requeridos.");
    }
});
/* FORMULARIO */ 

document.getElementById('toggleSidebar').addEventListener('click', function() {
    document.getElementById('ciudadesSidebar').classList.toggle('active');
});

document.getElementById('closeSidebar').addEventListener('click', function() {
    document.getElementById('ciudadesSidebar').classList.remove('active');
});

// ACEPTAR COOKIES
function acceptCookies() {
    // Guardar en localStorage para recordar la aceptación
    localStorage.setItem("cookiesAccepted", "true");

    // Cerrar el offcanvas de cookies
    const offcanvasEl = document.getElementById('cookieConsentCanvas');
    const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
    offcanvas.hide();
}

// Al cargar la página, verifica si las cookies han sido aceptadas
function inicio() {
    const cookiesAccepted = localStorage.getItem("cookiesAccepted");
    console.log("cookiesAccepted: ", cookiesAccepted)
    
    // Si no se ha aceptado, muestra el offcanvas
    if (cookiesAccepted !== "true") {
        const offcanvasEl = document.getElementById('cookieConsentCanvas');
        const offcanvas = new bootstrap.Offcanvas(offcanvasEl);
        offcanvas.show();
    } else {
        console.log("entra en el else")
        // Si se ha aceptado, oculta el offcanvas
        const offcanvasEl = document.getElementById('cookieConsentCanvas');
        offcanvasEl.classList.add("display-none"); // Cambiar a "display-none"
        offcanvasEl.classList.remove("show"); // Show es la clase que obscurece el body
    }
};

