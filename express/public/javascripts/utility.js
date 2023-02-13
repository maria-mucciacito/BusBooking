function addOrRemovePersone(id) {
  var posto = document.getElementById(id);
  var numPersone = parseInt(document.getElementById("persone").value);
  if (posto.className.includes("selected-outerColor")) {
    document.getElementById("persone").value = numPersone - 1;
  } else {
    document.getElementById("persone").value = numPersone + 1;
  }
}

function postiScelti() {
  var arrayPosti = document.getElementsByClassName("outer-seat");
  var count = 0;
  var idPostiList = [];
  for (const element of arrayPosti) {
    if (element.className == "outer-seat div-inline selected-outerColor") {
      count += 1;
      idPostiList.push(element.id);
    }
  }
  idPostiList = idPostiList.toString();
  return idPostiList;
}
