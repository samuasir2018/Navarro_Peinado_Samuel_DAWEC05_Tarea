import { ExcepcionMissingField } from './Exceptions.js';
/**
 * Constructor del objeto Category que define la categoria de una foto dentro de la galeria
 * @param title el titulo de la categoria
 * @param description una breve descripcion de la categoria
 */
function Category(title, description) {
    if (title == '' || title == ' ') {
        throw new ExcepcionMissingField("Error al crear la categoria, el titulo no puede ser vacio");
    }
    this.title = title;
    this.description = description;

    //Getters y setters
    Object.defineProperty(this, "titulo", {
        get: function () {
            return this.title;
        },
        set: function (title) {
            if (title == '' || title == ' ') {
                throw new ExcepcionMissingField("Error al modificar el titulo, el titulo no puede ser vacio");
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
}

//Exportamos el constructor para poder crear o referenciar objetos de este tipo en otro archivo js
export { Category };