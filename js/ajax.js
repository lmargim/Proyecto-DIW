"use strict";

const rutaBackend = "http://localhost/Proyecto%202_%20Voayages%20Machados/backend/";

/**
 * Realiza peticiones AJAX de tipo GET
 * @param {string} url 
 * @param {FormData} parametros - Objeto FormData con los parámetros de la llamada 
 * @returns response
 */

async function peticionGET(url, parametros) {
    let oURL = new URLSearchParams(rutaBackend);
    oURL.pathname += url;

    // Agregamos los datos de los parámetros que vienen en un objeto FormData
    for (let [clave, valor] of parametros) {
        oURL.searchParams.append(clave, valor);
    }

    // Hacemos la peticion AJAX con el metodo fetch
    let respuestaServidor = await fetch(oURL, { method: 'GET' });
    // Datos devueltos por el servidor o datos de error
    let response;

    // Si es una respuesta http ok (200)
    if (respuestaServidor.ok) {
        //JSON.parse de los datos recibidos
        response = await respuestaServidor.json();
        // Respuesta distinta de http ok (200)
    } else {
        console.error("Error al acceder al servidor (STATUS != 200...299) Status: " + respuestaServidor.status);
        response = { ok: false, mensaje: "Error al acceder al servidor (STATUS != 200...299) Status: " + respuestaServidor.status, datos: null };

    }

    return response;


}

/**
 * Realiza peticiones AJAX de tipo POST
 * @param {string} url 
 * @param {FormData} parametros - Objeto FormData con los parámetros de la llamada 
 * @returns 
 */
async function peticionPOST(url, parametros){
    // Creamos el objeto URL que contiene la dirección url de la petición
    // y los datos que enviamos con la petición
    let oURL = new URL(rutaBackend);
    oURL.pathname += url;

    let respuestaServidor = await fetch(oURL, {
        body: parametros,  // objeto FormData
        method: "POST"
    });
    let response;

    if (respuestaServidor.ok) {  // Si es una respuesta http OK (200)

        // JSON.parse de los datos recibidos
        response = await respuestaServidor.json();

   } else { // Respuesta distinta de http OK (200)
       console.error("Error al acceder al acceder al servidor (STATUS != 200..299).Status: " + respuestaServidor.status);
       response = {
           ok: false,
           mensaje: "Error al acceder al acceder al servidor (STATUS != 200..299). Status: " + respuestaServidor.status,
           datos: null
       };
   }

   return response;
}
