  // Get the modal
  var modal = document.getElementById("myModal");
  var modalEdit = document.getElementById("myModalEdit");

  // Get the button that opens the modal
  var btn = document.getElementById("myBtn");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];
  var spanEdit = document.getElementsByClassName("close")[1];
  // When the user clicks the button, open the modal 
  btn.onclick = function () {
    modal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  }

  spanEdit.onclick = function () {
    modalEdit.style.display = "none";
  }


  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    } else if (event.target == modalEdit) {
      modalEdit.style.display = "none";
    }
  }