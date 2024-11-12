<?php
require_once("config.php");
$conexion = obtenerconexion();

// Recoger datos
$dni = $_POST["dni"];

// Consulta SQL para el borrado del cliente
$sql = "DELETE FROM Cliente WHERE dni = '$dni'";

$resultado = mysqli_query($conexion, $sql);

responder(null, true, "Datos eliminados", $conexion);