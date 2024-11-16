<?php 

include_once("config.php");
$conexion = obtenerConexion();

// Recogemos los datos
$nombrepaquete = $_POST['nombrepaquete'];
$tipopaquete = $_POST['tipopaquete'];
$tipoalojamiento = $_POST['tipoalojamiento'];
$fechainicio = $_POST['fechainicio'];
$fechafin = $_POST['fechafin'];
$transporte = $_POST['transporte'];



// Consulta
$sql = "INSERT INTO Paquete (nombre, tipopaquete, tipoalojamiento, fechainicio, fechafin, transporte) 
        VALUES ('$nombrepaquete','$tipopaquete','$tipoalojamiento','$fechainicio','$fechafin', '$transporte')";

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    // Si hay un error, lo devuelve
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, false, "Se ha producido un error número $numerror que corresponde a: $descrerror", $conexion);
} else {
    // Si no hay error, se inserta el nuevo paquete
    responder(null, true, "Se ha insertado el paquete", $conexion);
}
