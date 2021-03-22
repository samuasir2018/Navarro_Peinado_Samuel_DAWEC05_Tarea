import { Coords } from './Coords.js';
import { ExcepcionMissingField } from './Exceptions.js';
/**
 * Construtor de la clase Image que representa una imagen dentro de la galeria
 * @param title el titulo de la imagen
 * @param description una breve descripcion de la imagen
 * @param url la url donde esta almacenada la imagen
 * @param coords las coordenadas donde se tomo la imagen
 */
function Image(title, description, url, coords) {
    if (title == '' || title == ' ' || title == null) {
        throw new ExcepcionMissingField("Error al crear la imagen, el titulo no puede ser vacio");
    }
    if (url == null || url == '' || url == ' ') {
        throw new ExcepcionMissingField("Error al crear la imagen, la url no puede ser nula");
    }
    this.title = title;
    this.description = description;
    this.url = url;
    this.coords = coords;

    //Getters y setters
    Object.defineProperty(this, "titulo", {
        get: function () {
            return this.title;
        },
        set: function (title) {
            if (title == '' || title == ' ' || title == null) {
                throw new ExcepcionMissingField("Error al mosdificar la imagen, el titulo no puede ser vacio");
            }
            this.title = title;
        }
    });

    Object.defineProperty(this, "descripcion", {
        get: function () {
            return this.description;
        },
        set: function (description) {
            this.description = description;
        }
    });

    Object.defineProperty(this, "enlace", {
        get: function () {
            return this.url;
        },
        set: function (url) {
            if (url == null || url == '' || url == ' ') {
                throw new ExcepcionMissingField("Error al modificar la imagen, la url no puede ser nula");
            }
            this.url = url;
        }
    });

    Object.defineProperty(this, "coordenadas", {
        get: function () {
            return this.coords;
        },
        set: function (coords) {
            this.coords = coords;
        }
    });
}

//Exportamos el constructor para poder crear o referenciar objetos de este tipo en otro archivo js
export { Image };