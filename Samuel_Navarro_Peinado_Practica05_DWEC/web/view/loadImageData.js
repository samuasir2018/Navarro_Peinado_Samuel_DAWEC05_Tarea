/*Utilizo session storage para poder almacenar los datos de la imagen, imprimirlos y despues los borro*/
function showImageData() {
    document.getElementById("titulo").value = sessionStorage.getItem("titulo");
    document.getElementById("descripcion").value = sessionStorage.getItem("descripcion");
    document.getElementById("url").value = sessionStorage.getItem("enlace");
    document.getElementById("latitud").value = sessionStorage.getItem("coordsLat");
    document.getElementById("longitud").value = sessionStorage.getItem("coordsLong");

    sessionStorage.removeItem("titulo");
    sessionStorage.removeItem("descripcion");
    sessionStorage.removeItem("enlace");
    sessionStorage.removeItem("coordsLat");
    sessionStorage.removeItem("coordsLong");
}