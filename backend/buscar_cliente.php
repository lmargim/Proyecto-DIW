<?
require_once('config.php');
$conexion = obtenerConexion();

// Recogemos datos de entrada
$dni = $_POST['dni'];

// Montamos la consulta
$sql = "SELECT Cliente.* FROM Cliente WHERE Cliente.dni = '$dni'";

$resultado = mysqli_query($conexion, $sql);

// Pedimos la fila
$fila = mysqli_fetch_assoc($resultado);

if ($fila) {
    responder($fila, true,"Datos recuperados", $conexion);
} else {
    responder(null, false, "No existe el cliente", $conexion);
}
