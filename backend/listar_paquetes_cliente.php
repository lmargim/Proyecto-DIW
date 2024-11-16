<?php 

include_once("config.php");
$conexion = obtenerConexion();

// Recogemos el dni
$dni = $_POST['dni'];

// Inicializar el array para evitar errores
$datos = [];

// Consulta
$sql = "SELECT *
        FROM Paquete AS pa
        INNER JOIN Cliente_Paquete AS cp
        ON pa.id = cp.id_paquete
        WHERE cp.dni_cliente = '$dni';";

$resultado = mysqli_query($conexion, $sql);

while ($fila = mysqli_fetch_assoc($resultado)) {
    $datos[] = $fila; // Insertar la fila en el array
}

responder($datos, true, "Datos recuperados", $conexion);