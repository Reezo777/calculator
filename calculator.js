(function() {

  // Переменные
  var premise = document.getElementById('premise');
  var allFloors = floorPrice();
  var calcItem = document.getElementsByClassName('calc_item');
  var cargoVolume = document.getElementById('cargoVolume');
  var floor = document.getElementById('floor');
  var result = document.getElementById('result');
  var isLift = document.getElementById('isLift');
  var sum = document.getElementById("sum");
  var hidden_premise = document.getElementById("hidden_premise");
  var hidden_floor = document.getElementById("hidden_floor");
  var hidden_cargo = document.getElementById("hidden_cargo");

  // Цены за этаж
  function floorPrice() {
    var allFloors = [0];

    for (var i = 2; i <= 10; i++) {
      if (i % 2 === 0) {
        allFloors.push(allFloors[allFloors.length - 1] + 300);
      }
      if (i % 2 === 1) {
        allFloors.push(allFloors[allFloors.length - 1]);
      }
    }

    return allFloors;
  }

  function getSelectedText(elementId) {
      var elt = document.getElementById(elementId);

      if (elt.selectedIndex == -1)
          return null;

      return elt.options[elt.selectedIndex].text;
  }

  // Генерация этажей
  function floorsGenerator(select) {
    for (var i = 1; i <= 10; i++) {
      var option = document.createElement('option');
      option.value = allFloors[i - 1];
      option.innerHTML = i;
      select.appendChild(option);
    }
  }

  floorsGenerator(floor);

  function calculation() {
    var premiseVal = premise.value;
    var volume = parseInt(cargoVolume.value).toFixed(2);
    var floorVal = (isLift.value == "ДА") ? 0 : floor.value;
    var resultPrice
    if (volume) {
      if (volume < 6) {
        volume = 6;
      }
      resultPrice = volume * parseInt(premiseVal) + parseInt(floorVal)

      //console.log(volume + ' ' + premiseVal + ' ' + floorVal);
      result.innerHTML = resultPrice;
      sum.value = resultPrice;
      hidden_floor.value = floor.selectedIndex + 1;
      hidden_cargo.value = volume;
      hidden_premise.value = getSelectedText('premise');
      hidden_lift.value = getSelectedText('isLift');
      if (result.innerHTML.indexOf("NaN") !== -1) {
        result.innerHTML = 0;
      }
    } else {
      result.innerHTML = "";
    }

  }

  for (var i = 0; i < calcItem.length; i++) {
    calcItem[i].addEventListener('input', calculation, false);

  }

  function onlyNumbers() {
    this.value = parseInt(this.value) | '';
    
  }

  cargoVolume.addEventListener('keyup', onlyNumbers, false);
})()