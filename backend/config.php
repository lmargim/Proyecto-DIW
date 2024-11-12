<?php

/* Array asociativo con la configuración de conexión a la base de datos */
$basedatos = array(
    "basedatos" => "db_voyagesMachado",
    "usuario" => "root",
    "password" => "test",
    "servidor" => "db",
    "puerto" => 3306
);

//Sólo se mostrarán errores, no Warnings ni otros errores. 
//Valores posibles: E_ERROR | E_WARNING | E_PARSE | E_NOTICE
error_reporting(E_ERROR);

// Reporte de errores para mysql sin excepciones
mysqli_report(MYSQLI_REPORT_OFF);

function obtenerConexion()
{
    global $basedatos;

    $conexion = mysqli_connect($basedatos["servidor"], $basedatos["usuario"], $basedatos["password"], $basedatos["basedatos"]) or die(mysqli_error($conexion));

    if ($conexion->connect_errno) {
        responder(null, true, "Error al conectar a la base de datos. \nCompruebe los parámetros de la conexión: " .
            $conexion->connect_error . " Código de error: " . $conexion->connect_errno, $conexion);
    }

    mysqli_set_charset($conexion, 'utf8');
    // Si no se produjo un error devolvemos el objeto de la conexion
    return $conexion;
}
function responder($datos, $ok, $mensaje, $conexion)
{
    // Formateamos array asociativo con los campos de la respuesta
    $respuesta["ok"] = $ok;             // Boolean true si error o false si OK
    $respuesta["datos"] = $datos;       // Datos devueltos
    $respuesta["mensaje"] = $mensaje;   // Información sobre la operación

    // Mandamos la respuesta al cliente
    echo json_encode($respuesta);

    // Cerramos la conexión
    mysqli_close($conexion);

    if ($ok == false) {
        exit(1); // Finalizamos el proceso del servidor indicando el error
    } else {
        exit(0);
    }
}
