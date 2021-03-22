import { ExcepcionMissingField } from './Exceptions.js';
/**
 * Constructor del objeto Author que define un autor de una imagen
 * @param nickname el nombre del autor
 * @param email el correo electronico del autor
 * @param avatar la foto de perfil del autor
 */
function Author(nickname, email, avatar) {
        if (nickname == null || email == null) {
        throw new ExcepcionMissingField("Error al crear el autor, nickname y email no pueden ser nulos");
    }
    this.nickname = nickname;
    this.email = email;
    this.avatar = avatar;

    //Getters y setters
    Object.defineProperty(this, "nick", {
        get: function () {
            return this.nickname;
        },
        set: function (nickname) {
            if (nickname == null) {
                throw new ExcepcionMissingField("Error al modificar el autor, nickname no puede ser nulo");
            }
            this.nickname = nickname;
        }
    });

    Object.defineProperty(this, "mail", {
        get: function () {
            return this.email;
        },
        set: function (email) {
            if (email == null) {
                throw new ExcepcionMissingField("Error al modificar el autor, email no puede ser nulo");
            }
            this.email = email;
        }
    });

    Object.defineProperty(this, "authorAvatar", {
        get: function () {
            return this.avatar;
        },
        set: function (avatar) {
            this.avatar = avatar;
        }
    });
}

//Exportamos el constructor para poder crear o referenciar objetos de este tipo en otro archivo js
export {Author};