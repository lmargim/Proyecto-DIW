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
}