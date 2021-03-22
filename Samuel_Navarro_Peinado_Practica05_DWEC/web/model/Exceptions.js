/**
 * Constructor de la excepcion personalizada para cuando un campo es nulo o no esta disponible
 * @param mensaje el mensaje que mostraremos cuando salte la excepcion
 */
function ExcepcionMissingField(mensaje) {
    this.mensaje = mensaje;
    this.nombre = "ExcepcionMissingField";
}
/**
 * Constructor de la excepcion personalizada para cuando un campo no es valido
 * @param mensaje el mensaje que mostraremos cuando salte la excepcion
 */
function ExcepcionCampoNoValido(mensaje) {
    this.mensaje = mensaje;
    this.nombre = "ExcepcionCampoNoValido";
}
/**
 * Constructor de la excepcion personalizada para cuando el objeto que queremos añadir ya existe en la galeria
 * @param mensaje el mensaje que mostraremos cuando salte la excepcion
 */
function ExcepcionAlreadyExists(mensaje) {
    this.mensaje = mensaje;
    this.nombre = "ExcepcionAlreadyExists";
}

export { ExcepcionMissingField, ExcepcionCampoNoValido, ExcepcionAlreadyExists };