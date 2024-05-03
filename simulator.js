
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
=======

function calcularTiempoCongelamiento(masa, temperaturaInicial, capacidadCalorifica) {
  // Constantes
  const COP = 5.00; // Coeficiente de Desempeño del refrigerador
  const potencia = 500; // Potencia de entrada del refrigerador en vatios
  const Lf = 3.33e5; // Calor latente de fusión del agua en J/kg

  // Calcular la cantidad total de calor absorbido por el agua o la fruta
  const deltaT = 0 - temperaturaInicial; // Cambio de temperatura
  let c;
  if (capacidadCalorifica === "agua") {
    c = 4186; // Capacidad calorífica específica del agua en J/kg°C
  } else {
    // Utilizamos la capacidad calorífica específica de la fruta seleccionada
    c = capacidadCalorifica;
  }
  const Qc = masa * (c * deltaT - Lf); // Calor absorbido en J

  // Calcular la cantidad de trabajo realizado por el refrigerador
  const W = Math.abs(Qc) / COP; // Trabajo realizado en J

  // Calcular el tiempo necesario para realizar el trabajo
  const tiempo = W / potencia; // Tiempo en segundos

  return tiempo;
}

// Ejemplo de uso
const opciones = [
  { nombre: "Agua", capacidadCalorifica: "agua" },
  { nombre: "Manzana", capacidadCalorifica: 3.33 }, // Capacidad calorífica en J/kg°C
  { nombre: "Plátano", capacidadCalorifica: 3.36 },
  { nombre: "Naranja", capacidadCalorifica: 3.43 },
  { nombre: "Uva", capacidadCalorifica: 3.90 },
  { nombre: "Fresa", capacidadCalorifica: 3.29 }
];

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("Seleccione la fruta o agua para calcular el tiempo de congelamiento:");
opciones.forEach((opcion, index) => {
  console.log(`${index + 1}. ${opcion.nombre}`);
});
readline.question("Ingrese el número correspondiente: ", (index) => {
  index = parseInt(index);
  if (index >= 1 && index <= opciones.length) {
    const seleccion = opciones[index - 1];
    const masa = 0.5; // kg
    const temperaturaInicial = 20.0; // °C

    const tiempoCongelamiento = calcularTiempoCongelamiento(masa, temperaturaInicial, seleccion.capacidadCalorifica);
    console.log(`Tiempo de congelamiento de ${seleccion.nombre}: ${tiempoCongelamiento.toFixed(2)} segundos`);
  } else {
    console.log("Selección no válida. Por favor, ingrese un número válido.");
  }
  readline.close();
});

