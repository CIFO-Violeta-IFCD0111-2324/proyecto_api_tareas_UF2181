// reset forms 
function resetForms() {
  const forms = document.querySelectorAll("form");
  for (let i = 0; i < forms.length; i++) {
    forms[i].reset();
  }
}

export default resetForms;