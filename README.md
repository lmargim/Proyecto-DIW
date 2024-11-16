---- Parte 2 del Proyecto de DIW ----
En esta fase del proyecto, se han desarrollado las siguientes funcionalidades:

- Gestión de Clientes
    - Añadir cliente.
    - Borrar cliente.
    - Modificar cliente.
    - Listar clientes.
    - Buscar cliente por DNI.
    - Asignar paquetes a clientes.
  
- Gestión de Paquetes
    - Añadir paquetes.

- Relación entre Clientes y Paquetes
Se ha implementado una relación N:M entre clientes y paquetes en la base de datos.
Para ello, se creó una tabla intermedia que almacena la información de los paquetes
contratados por cada cliente. Esta funcionalidad permite consultar fácilmente los
paquetes asociados al cliente que se seleccione
