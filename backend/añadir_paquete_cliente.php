<?
require_once('config.php');
$conexion = obtenerConexion();

// Recogemos datos de entrada
$dni = $_POST['dni'];
$idPaquete = $_POST['idpaquete'];

// Consulta
$sql = "INSERT INTO Cliente_Paquete VALUES ('$dni', '$idPaquete')";

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    // Si hay un error, lo devuelve
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, false, "Se ha producido un error número $numerror que corresponde a: $descrerror", $conexion);
} else {
    // Si no hay error, se inserta el Paquete al Cliente
    responder(null, true, `Se ha insertado el Paquete $idPaquete al cliente con dni $dni`, $conexion);
}