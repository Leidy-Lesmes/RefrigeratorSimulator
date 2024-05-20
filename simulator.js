const cop = 5.00;
const power = 500;

const imgSubstance = document.getElementById('imgSubstance');
const imgFridge = document.getElementById('fridgeImg');
const temp = document.getElementById('initial-temp');
var tempText = document.getElementById('temp-text');
var initialTemp = 0;
const opciones = [
  { nombre: "water", capacidadCalorifica: 4186, masa:0.5, temperature: 0, img: "./images/water.png" },
  { nombre: "apple", capacidadCalorifica: 3350, masa: 0.18, temperature: -1.5, img: "./images/apple.png"  },
  { nombre: "banana", capacidadCalorifica: 3350, masa: 0.18, temperature: -1.5, img: "./images/bananas.png"  },
  { nombre: "orange", capacidadCalorifica: 3790, masa: 0.25, temperature: -1.8, img: "./images/orange.png"  },
  { nombre: "grape", capacidadCalorifica: 3600, masa: 0.7, temperature: -1.8, img: "./images/grapes.png"  },
  { nombre: "strawberry", capacidadCalorifica: 3780, masa: 0.02, temperature: -0.78, img: "./images/strawberry.png"}
];
var subtanceImg;
document.getElementById('cop-value').textContent = `COP: ${cop}`;
document.getElementById('power-value').textContent = `COP: ${power}`;

temp.oninput = ()=>{
  tempText.innerHTML = `${temp.value} °C`;
  initialTemp = temp.value;
}

function calculate() {
    const substance = document.getElementById('substance');
    var substanceName = substance.options[substance.selectedIndex].value;
    const mass = selectMass(substanceName);
    if (substanceName === "null"){
      modal("Es necesario que seleccione una sustancia");
    } else if(Number.isNaN(initialTemp)){
      modal("Es necesario que suministre la temperatura inicial");
    } else if(Number.isNaN(mass)){
      modal("Es necesario que suministre la masa de la sustancia");
    } else{
      imgFridge.setAttribute("src", "./images/fridge1.png");
      imgSubstance.setAttribute("src", "./images/clock.gif");
      setTimeout(function(){
        imgFridge.setAttribute("src", "./images/fridge.png");
        imgSubstance.setAttribute("src", subtanceImg);
        operations(substanceName, initialTemp, mass);
      }, 3000);
    }
  }

  function selectMass(substance){
    let mass;
    if(substance !== "water"){
      mass = parseFloat(document.getElementById('mass-value').value);
    } else{
      opciones.forEach((opcion, index) => {
        if(substance === "water" && opcion.nombre === "water"){
         mass = opcion.masa;
        }
      });
    }
    return mass;
  }

  function modal(text){
    document.getElementById('messageAdvertence').textContent = text;
    $('#deleteLastMessage').modal('show');
  }

  function operations(substanceName, initialTemp, mass){
    var heatCapacity = selectHeatCapacity(substanceName);
      var result = 0;
      if(substanceName === "water"){
        result = ((mass)*((heatCapacity*-initialTemp)-(3.33*Math.pow(10, 5)))) / (power*cop);
      } else {
        var temperature = selectTemperature(substanceName);
        result = ((mass)*(heatCapacity*(temperature-initialTemp))) / (power*cop);;
      }
      if(result<0){
        result = result*-1;
      }
      document.getElementById('time-result').textContent = `${result.toFixed(2)} s`;
  }

function selectHeatCapacity(substance){
  let heatCapacity;
  opciones.forEach((opcion, index) => {
    if(substance === opcion.nombre){
      heatCapacity = opcion.capacidadCalorifica;
    }
  });
  return heatCapacity;
}

  function selectTemperature(substance){
    let temperature;
    opciones.forEach((opcion, index) => {
      if(substance === opcion.nombre){
        temperature = opcion.masa;
      }
    });
    return temperature;
  }

  function updateImgSubstance(substance){
    opciones.forEach((opcion) => {
      if(substance.value === opcion.nombre){
        subtanceImg = opcion.img;
        imgSubstance.setAttribute("src", `${opcion.img}`);
        document.getElementById('mass-value').textContent = `Masa: ${opcion.masa} Kg`;
      }
    });
    showMassInput(substance);
  }

  function showMassInput(substance){
    var item = document.getElementById("massValue");
    if(!item.classList.contains('nonDisplay') && substance.value === "water"){
      document.querySelector('.massValue').classList.toggle('nonDisplay');
    } else {
      document.querySelector('.massValue').classList.toggle('nonDisplay');
      if(item.classList.contains('nonDisplay')){
        document.querySelector('.massValue').classList.toggle('nonDisplay');
      }
    }
  }
