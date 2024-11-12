<?php
require_once("config.php");
$conexion = obtenerConexion(); 

// En este caso no existen datos de entrada que recoger

// Consultamos todos los clientes de la base de datos
$sql = "SELECT * FROM Cliente";

$resultado = mysqli_query($conexion, $sql);

while ($fila = mysqli_fetch_assoc($resultado)) {
    $datos[] = $fila; // Insertamos la fila en un array
}

responder($datos, true, "Datos recuperados", $conexion);