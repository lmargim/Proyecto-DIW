<?php 

include_once("config.php");
$conexion = obtenerConexion();

// Recogemos los datos
$nombre = $_POST['nombre'];
$dni = $_POST['dni'];
$telefono = $_POST['telefono'];
$email = $_POST['email'];
$direccion = $_POST['direccion'];

$sql = "INSERT INTO Cliente VALUES ('$dni','$nombre','$email','$telefono','$direccion')";

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    // Si hay un error, lo devuelve
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, false, "Se ha producido un error número $numerror que corresponde a: $descrerror", $conexion);
} else {
    // Si no hay error, se inserta el nuevo cliente
    responder(null, true, "Se ha insertado el cliente", $conexion);
}
