import { Author } from '../model/Author.js';
import { Category } from '../model/Category.js';
import { Coords } from '../model/Coords.js';
import { Image } from '../model/Image.js';
import { Landscape } from '../model/Landscape.js';
import { Portrait } from '../model/Portrait.js';
import { Gallery } from '../model/Gallery.js';
import { ExcepcionMissingField, ExcepcionCampoNoValido, ExcepcionAlreadyExists } from '../model/Exceptions.js';

let galeria;
var clicks = [];
var position = 0;
var primera = true;

/*Carga las categorias y autores de la pagina*/
function cargarDatos() {
    var categoryDefault = new Category("por defecto", "La categoria asignada a las imagenes que no tienen categoria concreta");
    var defaultCategory = {
        category: categoryDefault,
        images: []
    }
    var defaultAuthor = new Author("DefaultAuth", "defaultmail@mail.com", "default.jpg");
    galeria = new Gallery("El coleccionista de imagenes", defaultCategory, defaultAuthor);


    var categoryPaisajes = new Category("Paisajes", "Fotos de paisajes de montañas, campo, bosques...");
    var categoryAnimales = new Category("Animales", "Fotos de animales");
    var categoryCiudades = new Category("Ciudades", "Fotos de ciudades");


    try {
        galeria.addCategory(categoryPaisajes);
        galeria.addCategory(categoryAnimales);
        galeria.addCategory(categoryCiudades);
    } catch (excepcion) {
        console.log(excepcion.mensaje);
    }

    var autorAlonso = new Author("Alonso", "alonso.correo@gmail.com", "photo.jpg");
    var autorJavier = new Author("Javier", "javier.correo@gmail.com", "photo.jpg");
    var autorLucia = new Author("Lucia", "lucia.correo@gmail.com", "photo.jpg");

    try {
        galeria.addAuthor(autorAlonso);
        galeria.addAuthor(autorJavier);
        galeria.addAuthor(autorLucia);
    } catch (excepcion) {
        console.log(excepcion.mensaje);
    }

    var coordsMont = new Coords("1223", "-12123");
    var imagenMont = new Image("Mountain", "Foto de cuando fui a la sierra", "./images/mont.jpg", coordsMont);

    var coordsPerro = new Coords("167783", "12123");
    var imagenPerro = new Image("Perro", "Foto mi perro corriendo en el parque", "./images/perro.jpg", coordsPerro);

    var coordsMadrid = new Coords("588", "-457");
    var imagenMadrid = new Portrait("GranVia", "Foto la gran via cuand fui de viaje a madrid", "./images/madrid.jpg", coordsMadrid);

    var coordsPlaya = new Coords("2332", "-12443");
    var imagenPlaya = new Image("Playa", "Foto de cuando fui a la playa", "./images/playa.jpg", coordsPlaya);

    var coordsSerpiente = new Coords("6787", "3234");
    var imagenSerpiente = new Image("Serpiente", "Foto una serpiente que encontre en la selva", "./images/serpiente.jpg", coordsSerpiente);

    var coordsCadiz = new Coords("987", "-1234");
    var imagenCadiz = new Landscape("Cadiz", "Foto Cadiz cuando fui de vacaciones", "./images/cadiz.jpg", coordsCadiz);


    try {
        galeria.addImage(imagenMont, categoryPaisajes, autorAlonso);
        galeria.addImage(imagenPerro, categoryAnimales, autorJavier);
        galeria.addImage(imagenMadrid, categoryCiudades, autorLucia);
        galeria.addImage(imagenPlaya, categoryPaisajes, autorJavier);
        galeria.addImage(imagenSerpiente, categoryAnimales, autorLucia);
        galeria.addImage(imagenCadiz, categoryCiudades, autorAlonso);
    } catch (excepcion) {
        console.log(excepcion.mensaje);
    }

}

/*Carga las imagenes en el carrusel de la categoria y borra las imagenes anteriores para mostrar las nuevas*/
function loadCarruselCat(galeria, categoria) {
    var img = galeria.getCategoryImages(categoria);
    var objImg = [];
    var imgHtm = '';
    for (var i = 0; i < img.length; i++) {
        objImg.push(img[i].image);
    }
    for (var j = 0; j < objImg.length; j++) {
        imgHtm += '<img title="' + objImg[j].descripcion + '"class="imgSlide" id="imagen" src="' + objImg[j].enlace + '" onclick="abrirImagen' + j + '()" style="width:50%"></img>\n'
            + '<script>\n function abrirImagen' + j + '() {\nsessionStorage.setItem("titulo","' + objImg[j].titulo + '");\n' +
            'sessionStorage.setItem("descripcion","' + objImg[j].descripcion + '");\n' +
            'sessionStorage.setItem("enlace","' + objImg[j].enlace + '");\n' +
            'sessionStorage.setItem("coordsLat","' + objImg[j].coords.lat + '");\n' +
            'sessionStorage.setItem("coordsLong","' + objImg[j].coords.long + '");\n' +
            'ventana = (window.open("imageData.html", "", "width=1920,height=1080"));\n'
            + 'saveWindow(ventana);\n}\n</script>\n';

    }
    $("#imagen").remove();
    $("#imagen").remove();
    $("#imagen").remove();
    $("#imagen").remove();
    $("#imagen").remove();
    $("#imagen").remove();
    $("#imagen").remove();
    $("#carrouselImagenes").append(imgHtm);
}

/*Muestra las imagenes dependiendo de la categoria en el carrusel*/
function mostrarImagenesCategoria(nombre) {
    var cat;
    for (var i = 0; i < galeria.categorias.length; i++) {
        if (galeria.categorias[i].category.titulo == nombre) {
            cat = galeria.categorias[i].category;
        }
    }
    loadCarruselCat(galeria, cat);
}
/*Muestra las imagenes dependiendo del autor en el carrusel*/
function mostrarImagenesAutor(nombre) {
    var auth;
    for (var i = 0; i < galeria.autores.length; i++) {
        if (galeria.autores[i].nick == nombre) {
            auth = galeria.autores[i];
        }
    }
    loadCarruselAut(galeria, auth);
}
/*Carga las imagenes en el carrusel del autor y borra las imagenes anteriores para mostrar las nuevas*/
function loadCarruselAut(galeria, autor) {
    var img = galeria.getAuthorImages(autor);
    var urlImg = [];
    var imgHtm = '';
    for (var i = 0; i < img.length; i++) {
        urlImg.push(img[i].enlace);
    }

    for (var j = 0; j < img.length; j++) {
        imgHtm += '<img title="' + img[j].descripcion + '" class="imgSlide" id="imagen" src="' + img[j].enlace + '" onclick="abrirImagen' + j + '()" style="width:50%"></img>\n'
            + '<script>\n function abrirImagen' + j + '() {\nsessionStorage.setItem("titulo","' + img[j].titulo + '");\n' +
            'sessionStorage.setItem("descripcion","' + img[j].descripcion + '");\n' +
            'sessionStorage.setItem("enlace","' + img[j].enlace + '");\n' +
            'sessionStorage.setItem("coordsLat","' + img[j].coords.lat + '");\n' +
            'sessionStorage.setItem("coordsLong","' + img[j].coords.long + '");\n' +
            'ventana = (window.open("imageData.html", "", "width=1920,height=1080"));\n'
            + 'saveWindow(ventana);\n}\n</script>\n';
    }
    $("#imagen").remove();
    $("#imagen").remove();
    $("#imagen").remove();
    $("#imagen").remove();
    $("#imagen").remove();
    $("#imagen").remove();
    $("#imagen").remove();
    $("#carrouselImagenes").append(imgHtm);
}

/*Utilizo un array donde voy almacenando que categorias o autores se van viendo para despues poder utilizar la navegacion a modo de "historial" */
function generarHistorial(accion) {
    if (position < clicks.length-1) {
        for (var i = position; i < clicks.length; i++) {
            clicks.pop();
        }
    }
    clicks.push(accion);
    if(position == 0 && primera) {
        primera = false;
    } else {
        ++position;
    }
}
/*Ir atras en el historial*/
function historyBack() {
    if (position == 0){
        window.alert("Ya estás en la primera foto");
    } else {
        position = position - 1;
        let mostrar = clicks[position];
        if (mostrar == "Ciudades" || mostrar == "Paisajes" || mostrar == "Animales") {
            mostrarImagenesCategoria(mostrar);
        } else {
            mostrarImagenesAutor(mostrar);
        }
    }
}
/*Ir a delante en el historial*/
function historyNext() {
    ++position;
    if (position >= clicks.length) {
        --position;
        window.alert("Ya estás en la ultima foto");
    } else {
        let mostrar = clicks[position];
        if (mostrar == "Ciudades" || mostrar == "Paisajes" || mostrar == "Animales") {
            mostrarImagenesCategoria(mostrar);
        } else {
            mostrarImagenesAutor(mostrar);
        }
    }
}

export { cargarDatos, mostrarImagenesCategoria, mostrarImagenesAutor, generarHistorial, historyBack, historyNext};