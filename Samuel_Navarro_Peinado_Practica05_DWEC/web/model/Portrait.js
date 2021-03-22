import {Image} from './Image.js';
/**
 * Constructor del objeto Portrait que es un tipo de imagen dentro de la galeria
 * @param title el titulo de la imagen
 * @param description una breve descripcion de la imagen
 * @param url la url donde esta almacenada la imagen
 * @param coords las coordenadas donde se tomo la imagen
 */
function Portrait(title, description, url, coords){
    /*Usamos Call para llamar al constructor de la superclase*/
    Image.call(this, title, description, url, coords);
}

/*Asignamos al prototipo de la subclase el objeto cuyo prototipo es el de la superclase*/
Portrait.prototype = Object.create(Image.prototype);
/*Al prototipo de la subclase le añadimos la propiedad constructor que apunta a la funcion constructora de la subclase.*/
Portrait.prototype.constructor = Portrait;

//Exportamos el constructor para poder crear o referenciar objetos de este tipo en otro archivo js
export {Portrait};