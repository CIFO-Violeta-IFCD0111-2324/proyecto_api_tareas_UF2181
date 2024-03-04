// crear Modal
var crearMODAL = document.querySelector(".BTNMODAL");
// Get the button that opens the modal
var crearBTN = document.getElementById("crearBTN");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks on the button, open the modal
crearMODAL.onclick = function() {
  crearMODAL.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  crearMODAL.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == crearMODAL) {
    crearMODAL.style.display = "none";
  }
}
// ------------------------------------------------------------