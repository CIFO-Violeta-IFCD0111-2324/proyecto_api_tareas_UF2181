// crear Modal
const crearMODAL = document.getElementById("crearMODAL");
// Get the button that opens the modal
const crearBTN = document.getElementById("crearBTN");
// Get the <span> element that closes the modal
const crearSpan = document.getElementsByClassName("close")[0];
// When the user clicks on the button, open the modal
crearBTN.onclick = function() {
  crearMODAL.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
crearSpan.onclick = function() {
  crearMODAL.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == crearMODAL) {
    crearMODAL.style.display = "none";
  }
}
// ------------------------------------------------------------
// editar Modal (IMPORTANTE! se añade en app.js ya que en primera instancia no se han creado las cajas de dato)
