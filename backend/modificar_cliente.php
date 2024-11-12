<?php
include_once("config.php");
$conexion = obtenerConexion();

// Recogemos los datos
$cliente = json_decode($_POST['cliente']);

$sql = "UPDATE Cliente SET 
            nombre = '" . $cliente->nombre . "', 
            email = '" . $cliente->email . "', 
            telefono = '" . $cliente->telefono . "', 
            direccion = '" . $cliente->direccion . "' 
        WHERE dni = '" . $cliente->dni . "'";


mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, false, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);
} else {
    responder(null, true, "Se ha modificado el cliente", $conexion);
}