"use strict";

class Cliente {

    constructor(nombre, dni, email, telefono, direccion) {
        this.nombre = nombre;
        this.dni = dni;
        this.email = email;
        this.telefono = telefono;
        this.direccion = direccion;
    }
    toString() {
        return `Cliente:
        Nombre: ${this.nombre}
        DNI: ${this.dni}
        Email: ${this.email}
        Teléfono: ${this.telefono}
        Dirección: ${this.direccion}`;
    }

    async AltaCliente() {
        let datos = new FormData();

        datos.append("nombre", this.nombre);
        datos.append("dni", this.dni);
        datos.append("email", this.email);
        datos.append("telefono", this.telefono);
        datos.append("direccion", this.direccion);

        let respuesta = await peticionPOST("alta_cliente.php", datos);

        return respuesta;
    }

    async buscarCliente(dni) {
        let datos = new FormData();

        datos.append("dni", dni);

        let respuesta = await peticionPOST("buscar_cliente.php", datos);

        return respuesta;
    }

    async borrarCliente(dni) {
        let datos = new FormData();

        datos.append("dni", dni);

        let respuesta = await peticionPOST("borrar_cliente.php", datos);

        return respuesta;
    }

    async listarClientes() {
        let datos = new FormData();

        let respuesta = await peticionPOST("listar_clientes.php", datos);

        return respuesta;
    }

    async modificarCliente(oCliente) {
        let datos = new FormData();

        // datos.append("cliente", JSON.stringify(oCliente));
        datos.append("cliente", JSON.stringify({
            nombre: oCliente.nombre,
            email: oCliente.email,
            telefono: oCliente.telefono,
            direccion: oCliente.direccion,
            dni: oCliente.dni
        }));

        let respuesta = await peticionPOST("modificar_cliente.php", datos);

        return respuesta;
    }

    async añadirPaqueteACliente(dni, idPaquete) {
        let datos = new FormData();
        datos.append("dni", dni);
        datos.append("idpaquete", idPaquete);

        let respuesta = await peticionPOST("añadir_paquete_cliente.php", datos);
        
        return respuesta;
    }

    async listarPaquetesDeCliente(dni) {
        let datos = new FormData();
        datos.append("dni", dni);

        let respuesta = await peticionPOST("listar_paquetes_cliente.php", datos);

        return respuesta;
    }
}

class Paquete {

    constructor(nombrepaquete, tipopaquete, tipoalojamiento, fechainicio, fechafin, transporte, viaje_id) {
        this.nombrepaquete = nombrepaquete;
        this.tipopaquete = tipopaquete;
        this.tipoalojamiento = tipoalojamiento;
        this.fechainicio = fechainicio;
        this.fechafin = fechafin;
        this.transporte = transporte;
    }

    toString() {
        return `Paquete:
        Nombre del Paquete: ${this.nombrepaquete}
        Tipo de Paquete: ${this.tipopaquete}
        Tipo de Alojamiento: ${this.tipoalojamiento}
        Fecha Inicio: ${this.fechainicio}
        Fecha Fin: ${this.fechafin}
        Transporte: ${this.transporte}`;
    }

    async AltaPaquete() {
        let datos = new FormData();

        datos.append("nombrepaquete", this.nombrepaquete);
        datos.append("tipopaquete", this.tipopaquete);
        datos.append("tipoalojamiento", this.tipoalojamiento);
        datos.append("fechainicio", this.fechainicio);
        datos.append("fechafin", this.fechafin);
        datos.append("transporte", this.transporte);
        console.log(this.nombrepaquete);

        let respuesta = await peticionPOST("alta_paquete.php", datos);

        console.log("Respuesta del servidor:", respuesta); 
        return respuesta;
    }

    async getPaquetes() {
        let datos = new FormData();

        let respuesta = await peticionPOST("get_paquetes.php", datos);

        return respuesta;
    }
}


class Viaje {
    constructor(origen, destino, fechaInicio, fechaFin) {
        this.origen = origen;
        this.destino = destino;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
    }



}