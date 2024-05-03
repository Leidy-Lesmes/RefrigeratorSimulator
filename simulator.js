const cop = 5.00;
const power = 500;
document.getElementById('cop-value').textContent = `COP: ${cop}`;
document.getElementById('power-value').textContent = `COP: ${power}`;
const opciones = [
  { nombre: "water", capacidadCalorifica: 4186, masa:0.5, img: "./images/water.png" },
  { nombre: "apple", capacidadCalorifica: 2680, masa: 0.18, img: "./images/apple.png"  },
  { nombre: "banana", capacidadCalorifica: 3.36, masa: 0.15, img: "./images/bananas.jpg"  },
  { nombre: "orange", capacidadCalorifica: 3.43, masa: 0.25, img: "./images/orange.jpg"  },
  { nombre: "grape", capacidadCalorifica: 3.90, masa: 0.7, img: "./images/grapes.jpg"  },
  { nombre: "strawberry", capacidadCalorifica: 3.29, masa: 0.02, img: "./images/strawberry.jpg" }
];
var imgSubstance = document.getElementById('imgSubstance');

function calculate() {

    const initialTemp = parseFloat(document.getElementById('initial-temp').value);
    console.log(initialTemp);
    const substance = document.getElementById('substance');
    var substanceName = substance.options[substance.selectedIndex].value;
    if (substanceName === "null"){
      document.getElementById('messageAdvertence').textContent = "Es necesario que seleccione una sustancia";
      $('#deleteLastMessage').modal('show');
    } else if(Number.isNaN(initialTemp)){
      document.getElementById('messageAdvertence').textContent = "Es necesario que suministre la temperatura inicial";
      $('#deleteLastMessage').modal('show');
    } else{
      operations(substanceName, initialTemp);
    }
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

  function selectMass(substance){
    let mass;
    opciones.forEach((opcion, index) => {
      if(substance === opcion.nombre){
       mass = opcion.masa;
      }
    });
    return mass;
  }

  function updateImgSubstance(substance){
    opciones.forEach((opcion) => {
      if(substance.value === opcion.nombre){
        imgSubstance.setAttribute("src", `${opcion.img}`);
        document.getElementById('mass-value').textContent = `Masa: ${opcion.masa} Kg`;
      }
    });
  }

  function operations(substanceName, initialTemp){
    var heatCapacity = selectHeatCapacity(substanceName);
      var mass = selectMass(substanceName);
      updateImgSubstance(substanceName);

      var result = ((mass)*((heatCapacity*-initialTemp)-(3.33*Math.pow(10, 5)))) / (power*cop);
      if(result<0){
        result = result*-1;
      }
      document.getElementById('time-result').textContent = `${result.toFixed(2)} s`;
  }