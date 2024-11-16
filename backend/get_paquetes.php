<?php
require_once('config.php');
$conexion = obtenerConexion();

// No hay  datos de entrada

// Consulta sql

$sql = "SELECT * FROM Paquete";

$resultado = mysqli_query($conexion, $sql);

while ($fila = mysqli_fetch_assoc($resultado)) {
    $datos[] = $fila; // Añadir la fila al array de datos
}

responder($datos, true, "Datos recuperados", $conexion);