import { ExcepcionMissingField } from './Exceptions.js';
/**
 * Constructor de la clase Coords que define las coordenadas de una imagen
 * @param latitude la latitud de las coordenadas 
 * @param longitude la longitud de las coordenadas
 */
function Coords(latitude, longitude) {
    if (latitude == null || longitude == null) {
        throw new ExcepcionMissingField("Error al crear las coordenadas, latitud y longitud no pueden ser nulas");
    }
    this.latitude = latitude;
    this.longitude = longitude;

    //Getters y setters
    Object.defineProperty(this, "lat", {
        get: function () {
            return this.latitude;
        },
        set: function (latitude) {
            if (latitude == null) {
                throw new ExcepcionMissingField("Error al editar las coordenadas, latitud no puede ser nula");
            }
            this.latitude = latitude;
        }
    });

    Object.defineProperty(this, "long", {
        get: function () {
            return this.longitude;
        },
        set: function (longitude) {
            if (longitude == null) {
                throw new ExcepcionMissingField("Error al editar las coordenadas, longitud no puede ser nula");
            }
            this.longitude = longitude;
        }
    });
}

//Exportamos el constructor para poder crear o referenciar objetos de este tipo en otro archivo js
export { Coords };