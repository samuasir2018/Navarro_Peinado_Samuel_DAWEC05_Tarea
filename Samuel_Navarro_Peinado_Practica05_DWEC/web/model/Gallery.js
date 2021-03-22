import { Author } from './Author.js';
import { Category } from './Category.js';
import { Coords } from './Coords.js';
import { Image } from './Image.js';
import { Landscape } from './Landscape.js';
import { Portrait } from './Portrait.js';
import { ExcepcionMissingField, ExcepcionCampoNoValido, ExcepcionAlreadyExists } from './Exceptions.js';
/**
 * Constructor del objeto Gallery que gestiona una galeria de imagenes
 * @param title el titulo de la galeria
 * @param defaultCat la categoria por defecto de la galeria
 * @param defaultAuth el autor por defecto de la galeria
 */
function Gallery(title, defaultCat, defaultAuth) {
    this.title = title;
    this.images = [];
    this.categories = [];
    this.authors = [];
    this.defaultCat = defaultCat;
    this.categories.push(this.defaultCat);
    this.defaultAuth = defaultAuth;
    this.authors.push(this.defaultAuth);

    //Getters y setters
    Object.defineProperty(this, "titulo", {
        get: function () {
            return this.title;
        },
        set: function (title) {
            if (title == null) {
                throw new ExcepcionMissingField("Error al modificar el titulo de la galeria, el titulo no puede ser nulo");
            }
            this.title = title;
        }
    });

    Object.defineProperty(this, "categorias", {
        get: function () {
            return this.categories;
        }
    });

    Object.defineProperty(this, "autores", {
        get: function () {
            return this.authors;
        }
    });

    //Funciones del objeto
    /**
     * Añade una categoria dada
     * @param category la categoria a añadir
     * @throws ExcepcionAlreadyExists si la categoria ya existe y ExcepcionCampoNoValido si la categoria es nula
     */
    this.addCategory = function (category) {
        if (category != null) {
            var exists = false;
            //Recorremos el array y comprobamos que la categoria no existe
            this.categories.forEach(function (elem) {
                if (elem.category.titulo === category.titulo) {
                    exists = true;
                }
            });

            //Si la categoria no existe la añadimos
            if (!exists) {
                var newCategory = {
                    category: category,
                    images: []
                };
                this.categories.push(newCategory);
            } else {
                //Excepcion de que la categoria ya existe
                throw new ExcepcionAlreadyExists("Error al añaidr categoria, la categoria ya existe");
            }
            return this.categories.length;
        } else {
            throw new ExcepcionCampoNoValido("Error al añaidr categoria, la categoria no puede ser nula");
        }
    };
    /**
     * Elimina una categoria dada
     * @param category la categoria a eliminar
     * @throws ExcepcionCampoNoValido si la categoria no existe
     */
    this.removeCategory = function (category) {
        var index = this.categories.indexOf(category);
        if (index > -1) {
            this.categories.splice(index, 1);
        } else {
            //Excepcion de que la categoria no existe
            throw new ExcepcionCampoNoValido("Error al añaidr categoria, la categoria no existe");
        }
        return this.categories.length;
    };
    /**
     * Añade una imagen dada la imagen, su categoria y su autor. Si no se indica categoria o autor se asigna el por defecto
     * @param image la imagen a añadir
     * @param category la categoria de la imagen
     * @param author el autor de la imagen
     * @throws ExcepcionCampoNoValido si la imagen es nula
     */
    this.addImage = function (image, category, author) {
        if (image != null) {
            var existsCat = false;
            var newImage;
            var authIndex = this.authors.indexOf(author);
            var numImages = 0;
            if (authIndex == -1) {
                ///Si el autor no existe se añade el autor por defecto
                newImage = {
                    image: image,
                    author: this.defaultAuth
                };
            } else {
                newImage = {
                    image: image,
                    author: this.authors[authIndex].nickname
                };
            }


            for (var i = 0; i < this.categories.length; i++) {
                if (this.categories[i].category === category) {
                    existsCat = true;
                    this.categories[i].images.push(newImage);
                    numImages = this.categories[i].images.length;
                }
            }
            if (!existsCat) {
                //Si la categoria no existe, se añade la categoria por defecto
                this.categories[0].images.push(newImage);
            }
            this.images.push(newImage);
            return numImages;
        } else {
            //Excepcion la imagen no puede ser null
            throw new ExcepcionCampoNoValido("Error al añadir la imagen, La imagen no puede ser null");
        }
    };
    /**
     * Elimina la imagen dada
     * @param image la imagen a eliminar
     * @throws ExcepcionCampoNoValido si la imagen es nula
     */
    this.removeImage = function (image) {
        var existsImage = false;
        var imageFound;
        for (var i = 0; i < this.categories.length; i++) {
            var imagenes = this.categories[i].images;
            for (var j = 0; j < imagenes.length; j++) {
                if (imagenes[j].image === image) {
                    imageFound = imagenes[j];
                    existsImage = true;
                }
                if (existsImage) {
                    break;
                }
            }
            if (existsImage) {
                var indexImage = this.categories[i].images.indexOf(imageFound);
                this.categories[i].images.splice(indexImage, 1);
                indexImage = this.images.indexOf(imageFound);
                this.images.splice(indexImage, 1);
                return this.categories[i].images.length;
            }
        }
        if (!existsImage) {
            //Excepcion porque la imagen no existe
            throw new ExcepcionCampoNoValido("Error al eliminar la imagen, la imagen no existe");
        }
    };
    /**
     * Devuelve las imagenes que pertenecen a una categoria dada
     * @param category la categoria de la que obtendremos las imagenes
     * @throws ExcepcionCampoNoValido si la categoria no existe o si la categoria es nula
     */
    this.getCategoryImages = function (category) {
        if (category != null) {
            for (var i = 0; i < this.categories.length; i++) {
                if (this.categories[i].category == category) {
                    return this.categories[i].images;
                }
            }
            throw new ExcepcionCampoNoValido("Error al recuperar las imagenes, la categoria no existe");
        } else {
            //Errror la categoria no puede ser null
            throw new ExcepcionCampoNoValido("Error al recuperar las imagenes, la categoria no puede ser nula");
        }
    };
    /**
     * Añade un autor dado
     * @param author el autor que queremos añadir
     * @throws ExcepcionCampoNoValido si el autor es nulo
     */
    this.addAuthor = function (author) {
        if (author != null) {
            this.authors.push(author);
            return this.authors.length;
        } else {
            //Error el autor no puede ser null
            throw new ExcepcionCampoNoValido("Error al añadir el autor, el autor no puede ser nulo");
        }
    };
    /**
     * Elimina a un autor dado
     * @param author el autor que queremos eliminar
     * @throws ExcepcionCampoNoValido si el autor es nulo
     */
    this.removeAuthor = function (author) {
        var indexAuthor = this.authors.indexOf(author);
        if (indexAuthor > -1) {
            this.authors.splice(indexAuthor, 1);
            return this.authors.length;
        } else {
            //Error el autor no existe
            throw new ExcepcionCampoNoValido("Error al eliminar el autor, el autor no existe");
        }
    };
    /**
     * Devuelve las imagenes pertenecientes a un autor dado
     * @param author el autor del que queremos recuperar las imagenes
     * @throws ExcepcionCampoNoValido el autor es nulo
     */
    this.getAuthorImages = function (author) {
        if (author != null) {
            var imagenesAutor = [];
            this.images.forEach(function (elem) {
                if (elem.author == author.nick) {
                    imagenesAutor.push(elem.image);
                }
            });
            return imagenesAutor;
        } else {
            //Error el autor no puede ser null
            throw new ExcepcionCampoNoValido("Error al obtener las imagnes, el autor no puede ser nulo");
        }
    };
    /**
     * Devuelve todas las imagenes que sean de tipo Portrait
     */
    this.getPortraits = function () {
        var portraits = [];
        this.images.forEach(function (elem) {
            if (elem.image instanceof Portrait) {
                portraits.push(elem.image);
            }
        });
        return portraits;
    };
    /**
     * Devuelve todas las imagenes que sean de tipo Landscape
     */
    this.getLandscapes = function () {
        var landscapes = [];
        this.images.forEach(function (elem) {
            if (elem.image instanceof Landscape) {
                landscapes.push(elem.image);
            }
        });
        return landscapes;
    };

}

export { Gallery };