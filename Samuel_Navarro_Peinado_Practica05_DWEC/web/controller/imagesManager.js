var arrayVentanas = []; //array para ver almacenar los objetos window para despues cerrarlos
var slideIndex = 1; //almaceno la posicion del carrusell
showDivs(slideIndex);
/*Tanto esta funcion como showdivs estan relacionadas con mostrar el carrusel*/
function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("imgSlide");
  if (n > x.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = x.length }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex - 1].style.display = "block";
}
/*Añado al array ventanas el objeto ventana*/
function saveWindow(window) {
  arrayVentanas.push(window);
}
/*Cierro tantas ventanas como obj window haya en el array*/
function closeWindows() {
  for (var i = 0; i < arrayVentanas.length; i++) {
    arrayVentanas[i].close();
  }
}