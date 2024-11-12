/* SCRIPT INICIAL */
"use strict";
var oCliente = new Cliente();


const frmViajes = document.getElementById("frmViajes");
const frmPaquetes = document.getElementById("frmPaquetes");
const frmClientes = document.getElementById("frmClientes");
const frmBuscarCliente = document.getElementById("frmBuscarCliente");
const frmModificarCliente = document.getElementById("frmModificarCliente");
// const frmListarPaquetesPorCliente = document.getElementById("frmListarPaquetesPorCliente");

registradorEventos();

function registradorEventos() {
    // Opciones de menú
    document.querySelector("#mnuAñadirViaje").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuAñadirPaquete").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuAñadirCliente").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuBuscarCliente").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuListarClientes").addEventListener("click", procesarListarClientes);
    // document.querySelector("#mnuListarPaquetesPorCliente").addEventListener("click", mostrarFormulario);

    // Botones
    frmClientes.btnAñadirCliente.addEventListener("click", procesarAltaCliente);
    frmBuscarCliente.btnBuscarCliente.addEventListener("click", procesarBuscarCliente);
    // frmModificarCliente.btnAñadirCambios.addEventListener("click", procesarModificarCliente);
    document.querySelector("#btnAñadirCambios").addEventListener("click",procesarModificarCliente);
    // frmListarPaquetesPorCliente.btnListarPaquetesPorCliente.addEventListener("click", procesarListarPaquetesPorCliente);
}

function mostrarFormulario(oEvento) {
    // Opción del menú pulsada (su id)
    let opcionMenu = oEvento.target.id;

    ocultarFormularios();

    switch (opcionMenu) {
        case "mnuAñadirViaje":
            frmViajes.style.display = "block";
            break;
        case "mnuAñadirPaquete":
            frmPaquetes.style.display = "block";
            break;
        case "mnuAñadirCliente":
            frmClientes.style.display = "block";
            break;
        case "mnuBuscarCliente":
            frmBuscarCliente.style.display = "block";
            break;
        // case "mnuListarPaquetesPorCliente":
        //     frmListarPaquetesPorCliente.style.display = "block";
        //     break;
    }
}

function ocultarFormularios() {
    frmViajes.style.display = "none";
    frmPaquetes.style.display = "none";
    frmClientes.style.display = "none";
    frmBuscarCliente.style.display = "none";
    frmModificarCliente.style.display = "none";
    // frmListarPaquetesPorCliente.style.display = "none";
    resultadoBusqueda.style.display = "none";

}

function resetearFormularios() {
    // TODO
}

async function procesarAltaCliente() {
    if (validarFormularioAltaCliente()) {
        let nombreCliente = frmClientes.txtnombre.value.trim();
        let dni = frmClientes.txtdni.value.trim();
        let cuerpoEmail = frmClientes.txtcuerpocorreo.value.trim();
        let extensionCorreo = frmClientes.txtextensioncorreo.value.trim();
        let email = cuerpoEmail + "@" + extensionCorreo;
        let extensionTelefono = frmClientes.txtextensiontelefono.value;
        let numeroTelefono = frmClientes.txttelefono.value;
        let telefono = extensionTelefono + "-" + numeroTelefono;
        let direccion = frmClientes.txtdireccion.value.trim();

        let cliente = new Cliente(nombreCliente, dni, email, telefono, direccion);
        console.log("cliente: " + cliente);

        let respuesta = await cliente.AltaCliente();


        alert(respuesta.mensaje);

        if (respuesta.ok) {
            frmClientes.reset();
            frmClientes.style.display = "none";
        }
    }
}

function validarFormularioAltaCliente() {

    let nombreCliente = frmClientes.txtnombre.value.trim();
    let dni = frmClientes.txtdni.value.trim();
    let cuerpoEmail = frmClientes.txtcuerpocorreo.value.trim();
    let extensionCorreo = frmClientes.txtextensioncorreo.value.trim();
    let email = cuerpoEmail + "@" + extensionCorreo
    let extensionTelefono = frmClientes.txtextensiontelefono.value.trim();
    let numeroTelefono = frmClientes.txttelefono.value.trim();
    let telefono = extensionTelefono + "-" + numeroTelefono;
    let direccion = frmClientes.txtdireccion.value.trim();

    let errores = "";
    let valido = true;

    if (nombreCliente.length == 0 || dni.length == 0 | email.length == 0 || telefono.length == 0 || direccion.length == 0) {
        valido = false;
        errores += "Existen campos sin rellenar"

    }

    // Existen errores
    if (!valido) {
        alert(errores);
    }

    return valido;
}

async function procesarBuscarCliente() {
    if (validarBuscarComponente()) {
        let dni = frmBuscarCliente.txtdniBuscarCliente.value.trim();

        let respuesta = await oCliente.buscarCliente(dni);

        if (respuesta.ok) {
            let resultadoBusqueda = document.querySelector("#resultadoBusqueda");

            // Escribimos el resultado
            let tabla = "<table>";
            tabla += "<thead><tr><th>NOMBRE</th><th>DNI</th><th>EMAIL</th><th>TELÉFONO</th><th>DIRECCIÓN</th><th>ACCIÓN</th></tr></thead>";
            tabla += "<tbody><tr>";
            tabla += "<td>" + respuesta.datos.nombre + "</td>";
            tabla += "<td>" + respuesta.datos.dni + "</td>";
            tabla += "<td>" + respuesta.datos.email + "</td>";
            tabla += "<td>" + respuesta.datos.telefono + "</td>";
            tabla += "<td>" + respuesta.datos.direccion + "</td>";
            tabla += "<td><button type='button' class='btn-person' value='' id='btnBorrarCliente' data-Cliente='" + respuesta.datos.dni + "'><i class='bi bi-trash3'></i></button></td>";
            tabla += "</tr></tbody></table>";

            resultadoBusqueda.innerHTML = tabla;
            resultadoBusqueda.style.display = 'block';
            // Borramos el formulario
            frmBuscarCliente.reset();
            // Ocultamos el formulario
            frmBuscarCliente.style.display = "none";

            // Registramos evento para el boton borrar
            document.querySelector("#btnBorrarCliente").addEventListener("click", borrarCliente);
        } else {
            alert(respuesta.mensaje);
        }
    }
}

function validarBuscarComponente() {
    let dni = frmBuscarCliente.txtdniBuscarCliente.value.trim();
    let valido = true;
    let errores = "";

    if (dni.length != 9) {
        valido = false;
        errores += "El DNI introducido no es válido"
    }

    if (!valido) {
        alert(errores);
    }

    return valido;
}

async function borrarCliente(oEvento) {
    // Seleccionamos el botón con `closest` para acceder a `data-Cliente`.
    // ya que de la forma boton = oEvento.target accedemos al icono, no al boton
    let boton = oEvento.target.closest("button");
    let dni = boton.dataset.cliente;

    let respuesta = await oCliente.borrarCliente(dni);

    alert(respuesta.mensaje);

    // En el caso que se haya borrado correctamente, borramos toda la tabla y ponemos el div display: none
    if (respuesta.ok) {
        document.querySelector("#resultadoBusqueda").innerHTML = "";
        resultadoBusqueda.style.display = 'none';
    }
}

async function procesarListarClientes() {

    let respuesta = await oCliente.listarClientes();

    let listado = "";

    if (!respuesta.ok) {
        listado = respuesta.mensaje;
    } else {
        listado += "<table id='listadoClientes'>";
        listado += "<thead><tr><th>NOMBRE</th><th>DNI</th><th>EMAIL</th><th>TELÉFONO</th><th>DIRECCIÓN</th><th>ACCIÓN</th></tr></thead>";
        listado += "<tbody>";

        for (let cliente of respuesta.datos) {
            listado += "<tr><td>" + cliente.nombre + "</td>";
            listado += "<td>" + cliente.dni + "</td>";
            listado += "<td>" + cliente.email + "</td>";
            listado += "<td>" + cliente.telefono + "</td>";
            listado += "<td>" + cliente.direccion + "</td>";
            listado += "<td><button type='button' class='btn-person' id='btnModificarCliente' data-cliente='" + JSON.stringify(cliente) + "'><i class='bi bi-pencil-square'></i></button></td></tr>";
        }
        listado += "</tbody></table>";

    }
    ocultarFormularios();
    resultadoBusqueda.innerHTML = listado;
    resultadoBusqueda.style.display = 'block';

    // Registramos evento para el boton Modificar
    document.querySelector("#listadoClientes").addEventListener("click", procesarBotonModificarCliente);

}

let modalModificarCliente = null;

function procesarBotonModificarCliente(oEvento) {
    let boton = null;

    // Verificamos si se ha hecho click al botón o al icono
    if (oEvento.target.nodeName === "I" || oEvento.target.nodeName === "BUTTON") {
        boton = oEvento.target.closest("button");
        
        // Mostrar el formulario de modificar cliente en el modal
        let cliente = JSON.parse(boton.dataset.cliente);
        frmModificarCliente.txtnombreModificarCliente.value = cliente.nombre;
        frmModificarCliente.txtdniModificarCliente.value = cliente.dni;
        
        // Separar email y teléfono en partes
        let emailParts = cliente.email.split('@');
        frmModificarCliente.txtcuerpocorreoModificarCliente.value = emailParts[0];
        frmModificarCliente.txtextensioncorreoModificarCliente.value = emailParts[1];
        
        let phoneParts = cliente.telefono.split('-');
        frmModificarCliente.txttelefonoModificarCliente.value = phoneParts[1];
        
        // Selecciona la extensión de teléfono en el <select>
        let selectExtension = frmModificarCliente.txtextensiontelefonoModificarCliente;
        for (let i = 0; i < selectExtension.options.length; i++) {
            if (selectExtension.options[i].value === phoneParts[0]) {
                selectExtension.selectedIndex = i;
                break;
            }
        }
        
        frmModificarCliente.txtdireccionModificarCliente.value = cliente.direccion;

        // Crear instancia de Bootstrap Modal y mostrarla solo si aún no está creada
        if (!modalModificarCliente) {
            modalModificarCliente = new bootstrap.Modal(document.getElementById('divModalModificarCliente'));
        }
        modalModificarCliente.show();
        frmModificarCliente.style.display = 'block';
    }
}

async function procesarModificarCliente() {
    // Recuperamos los datos del formulario frmModificarCliente
    let nombre = frmModificarCliente.txtnombreModificarCliente.value.trim();
    let dni = frmModificarCliente.txtdniModificarCliente.value.trim();
    let email = frmModificarCliente.txtcuerpocorreoModificarCliente.value.trim() + "@" + frmModificarCliente.txtextensioncorreoModificarCliente.value.trim();
    let telefono = frmModificarCliente.txtextensiontelefonoModificarCliente.value.trim() + "-" + frmModificarCliente.txttelefonoModificarCliente.value.trim();
    let direccion = frmModificarCliente.txtdireccionModificarCliente.value.trim();

    // Validamos los datos del formulario
    if (validarFormularioModificarCliente()) {

        let respuesta = await oCliente.modificarCliente(new Cliente(nombre, dni, email, telefono, direccion));

        alert(respuesta.mensaje);

        if(respuesta.ok) {
            // Resetear formulario
            frmModificarCliente.reset();
            // Cerrar el modal
            modalModificarCliente.hide();
            // Actualizar la lista de clientes
            await procesarListarClientes();
        }
    }
}

function validarFormularioModificarCliente() {

    let nombreCliente = frmModificarCliente.txtnombreModificarCliente.value.trim();
    let dni = frmModificarCliente.txtdniModificarCliente.value.trim();
    let cuerpoEmail = frmModificarCliente.txtcuerpocorreoModificarCliente.value.trim();
    let extensionCorreo = frmModificarCliente.txtextensioncorreoModificarCliente.value.trim();
    let email = cuerpoEmail + "@" + extensionCorreo
    let extensionTelefono = frmModificarCliente.txtextensiontelefonoModificarCliente.value.trim();
    let numeroTelefono = frmModificarCliente.txttelefonoModificarCliente.value.trim();
    let telefono = extensionTelefono + "-" + numeroTelefono;
    let direccion = frmModificarCliente.txtdireccionModificarCliente.value.trim();

    let errores = "";
    let valido = true;

    if (nombreCliente.length == 0 || dni.length == 0 | email.length == 0 || telefono.length == 0 || direccion.length == 0) {
        valido = false;
        errores += "Existen campos sin rellenar"

    }

    // Existen errores
    if (!valido) {
        alert(errores);
    }

    return valido;
}

// async function procesarListarPaquetesPorCliente() {
//     // TODO
// }
