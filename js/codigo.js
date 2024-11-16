/* SCRIPT INICIAL */
"use strict";

var oCliente = new Cliente();
var oPaquete = new Paquete();
var oViaje = new Viaje();


const frmViajes = document.getElementById("frmViajes");
const frmPaquetes = document.getElementById("frmPaquetes");
const frmClientes = document.getElementById("frmClientes");
const frmBuscarCliente = document.getElementById("frmBuscarCliente");
const frmModificarCliente = document.getElementById("frmModificarCliente");
const frmListarPaquetesPorCliente = document.getElementById("frmListarPaquetesPorCliente");
const frmBuscarClienteParaPaquetes = document.getElementById("frmBuscarClienteParaPaquetes");

registradorEventos();

function registradorEventos() {
    // Opciones de menú
    document.querySelector("#mnuAñadirViaje").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuAñadirPaquete").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuAñadirCliente").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuBuscarCliente").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuListarClientes").addEventListener("click", procesarListarClientes);
    document.querySelector("#mnuAñadirPaquetesACliente").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuListarPaquetesPorCliente").addEventListener("click", mostrarFormulario);

    // Botones
    frmPaquetes.btnAñadirPaquete.addEventListener("click", procesarAltaPaquete);
    frmClientes.btnAñadirCliente.addEventListener("click", procesarAltaCliente);
    frmBuscarCliente.btnBuscarCliente.addEventListener("click", procesarBuscarCliente);
    frmAñadirPaquetesACliente.btnBuscarCliente.addEventListener("click", procesarBuscarClienteNombre);
    frmAñadirPaquetesACliente.btnAñadirPaqueteACliente.addEventListener("click", procesarAñadirPaqueteACliente);
    document.querySelector("#btnAñadirCambios").addEventListener("click", procesarModificarCliente);
    frmBuscarClienteParaPaquetes.btnBuscarClienteParaPaquetes.addEventListener("click", procesarListarPaquetesDeCliente);
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
        case "mnuAñadirPaquetesACliente":
            frmAñadirPaquetesACliente.style.display = "block";
            actualizarDesplegablePaquetes();
            break;
        case "mnuListarPaquetesPorCliente":
            frmBuscarClienteParaPaquetes.style.display = "block";
            break;
    }
}

function ocultarFormularios() {
    frmClientes.reset();
    frmBuscarCliente.reset();

    frmViajes.style.display = "none";
    frmPaquetes.style.display = "none";
    frmClientes.style.display = "none";
    frmBuscarCliente.style.display = "none";
    frmModificarCliente.style.display = "none";
    frmAñadirPaquetesACliente.style.display = "none";
    resultadoBusqueda.style.display = "none";
    frmBuscarClienteParaPaquetes.style.display = "none";

}
async function procesarAltaPaquete() {
    if (validarFormularioAltaPaquete()) {
        let nombrepaquete = frmPaquetes.nombrePaquete.value.trim();
        let tipopaquete = frmPaquetes.tipoPaquete.value.trim();
        let tipoalojamiento = frmPaquetes.alojamiento.value.trim();
        let fechainicio = frmPaquetes.fechaInicio.value.trim();
        let fechafin = frmPaquetes.fechaFin.value.trim();
        let transporte = frmPaquetes.transporte.value.trim();

        let paquete = new Paquete(nombrepaquete, tipopaquete, tipoalojamiento, fechainicio, fechafin, transporte);
        console.log("Paquete: " + paquete.toString());

        let respuesta = await paquete.AltaPaquete();

        alert(respuesta.mensaje);

        if (respuesta.ok) {
            frmPaquetes.reset();
            frmPaquetes.style.display = "none";
        }
    }
}

function validarFormularioAltaPaquete() {
    let nombrepaquete = frmPaquetes.nombrePaquete.value.trim();
    let tipopaquete = frmPaquetes.tipoPaquete.value;
    let alojamiento = frmPaquetes.alojamiento.value.trim();
    let fechainicio = frmPaquetes.fechaInicio.value;
    let fechafin = frmPaquetes.fechaFin.value;

    let transporteSeleccionado = [];
    document.querySelectorAll('input[name="transporte[]"]:checked').forEach((checkbox) => {
        transporteSeleccionado.push(checkbox.value);
    });
    let transporte = transporteSeleccionado.join(',');

    let errores = "";
    let valido = true;

    // Verificar que todos los campos obligatorios están llenos
    if (nombrepaquete.length == 0 || tipopaquete.length == 0 || alojamiento.length == 0 || fechainicio.length == 0 || fechafin.length == 0) {
        valido = false;
        errores += "Existen campos sin rellenar";
    }

    if (!valido) {
        alert(errores);
    }

    return valido;
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
    if (validarBuscarCliente()) {
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
            tabla += "<td><button type='button' class='btn-person' value='' id='btnBorrarCliente' data-Cliente='" + respuesta.datos.dni + "'><i class='bi bi-trash3'></i></button> </td>";
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

function validarBuscarCliente() {
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

        if (respuesta.ok) {
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

async function procesarBuscarClienteNombre() {
    if (validarBuscarCliente) {
        let dni = frmAñadirPaquetesACliente.txtdniañadirpaquetesacliente.value.trim();

        let respuesta = await oCliente.buscarCliente(dni);

        if (respuesta.ok) {

            frmAñadirPaquetesACliente.txtnombreañadirpaquetesacliente.value = respuesta.datos.nombre;
        }
    }
}



async function actualizarDesplegablePaquetes() {
    let respuesta = await oPaquete.getPaquetes();

    let options = "";

    for (let Paquete of respuesta.datos) {
        options += "<option value='" + Paquete.id + "'>" + Paquete.nombre + "</option>";
    }

    frmAñadirPaquetesACliente.lstPaquetes.innerHTML = options;
}

async function procesarAñadirPaqueteACliente() {
    let dni = frmAñadirPaquetesACliente.txtdniañadirpaquetesacliente.value.trim();
    let idPaquete = frmAñadirPaquetesACliente.lstPaquetes.value;


    if (dni.length > 0 && idPaquete >= 1) {
        console.log("dni: " + dni + " idpaquete: " + idPaquete);
        let respuesta = await oCliente.añadirPaqueteACliente(dni, idPaquete);

        
        if (respuesta.ok) {
            alert("Se ha añadido el paquete al cliente")
        } else {
            alert(respuesta.mensaje);
        }

    } else {
        alert("Debe seleccionar un Cliente y un Paquete");
    }
}

async function procesarListarPaquetesDeCliente() {
    let dni = frmBuscarClienteParaPaquetes.txtdniBuscarClienteParaPaquetes.value.trim();
    console.log(dni);

    let respuesta; // Definimos la variable aquí para que esté accesible en toda la función.

    if (dni.length > 0) {
        respuesta = await oCliente.listarPaquetesDeCliente(dni); // Asignar valor a la variable.
    } else {
        alert("Debe introducir un DNI válido");
        return; // Salir de la función si no hay un DNI válido.
    }

    let listado = "";

    if (!respuesta.ok) {
        listado = respuesta.mensaje;
    } else {
        listado += "<table id='listadoClientes'>";
        listado += "<thead><tr><th>NOMBRE</th><th>TIPOPAQUETE</th><th>TIPOALOJAMIENTO</th><th>FECHAINICIO</th><th>FECHAFIN</th><th>TRANSPORTE</th></tr></thead>";
        listado += "<tbody>";

        for (let paquete of respuesta.datos) {
            listado += "<tr><td>" + paquete.nombre + "</td>";
            listado += "<td>" + paquete.tipopaquete + "</td>";
            listado += "<td>" + paquete.tipoalojamiento + "</td>";
            listado += "<td>" + paquete.fechainicio + "</td>";
            listado += "<td>" + paquete.fechafin + "</td>";
            listado += "<td>" + paquete.transporte + "</td></tr>"
        }
        listado += "</tbody></table>";
    }

    ocultarFormularios();
    resultadoBusqueda.innerHTML = listado;
    resultadoBusqueda.style.display = 'block';
}

