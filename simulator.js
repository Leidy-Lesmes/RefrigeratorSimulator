const cop = 5.00;
const power = 500;
document.getElementById('cop-value').textContent = `COP: ${cop}`;
document.getElementById('power-value').textContent = `COP: ${power}`;
const videoButton = document.getElementById('video-button');
const videoContainer = document.getElementById('video-container');
const opciones = [
  { nombre: "water", capacidadCalorifica: 4186, masa:0.5, temperature: 0, img: "./images/water.png" },
  { nombre: "apple", capacidadCalorifica: 3350, masa: 0.18, temperature: -1.5, img: "./images/apple.png"  },
  { nombre: "banana", capacidadCalorifica: 3350, masa: 0.18, temperature: -1.5, img: "./images/bananas.jpg"  },
  { nombre: "orange", capacidadCalorifica: 3790, masa: 0.25, temperature: -1.8, img: "./images/orange.jpg"  },
  { nombre: "grape", capacidadCalorifica: 3600, masa: 0.7, temperature: -1.8, img: "./images/grapes.jpg"  },
  { nombre: "strawberry", capacidadCalorifica: 3780, masa: 0.02, temperature: -0.78, img: "./images/strawberry.jpg" }
];
var imgSubstance = document.getElementById('imgSubstance');

function calculate() {
    const initialTemp = parseFloat(document.getElementById('initial-temp').value);
    const substance = document.getElementById('substance');
    var substanceName = substance.options[substance.selectedIndex].value;
    const mass = selectMass(substanceName);
    if (substanceName === "null"){
      document.getElementById('messageAdvertence').textContent = "Es necesario que seleccione una sustancia";
      $('#deleteLastMessage').modal('show');
    } else if(Number.isNaN(initialTemp)){
      document.getElementById('messageAdvertence').textContent = "Es necesario que suministre la temperatura inicial";
      $('#deleteLastMessage').modal('show');
    } else if(Number.isNaN(mass)){
      document.getElementById('messageAdvertence').textContent = "Es necesario que suministre la masa de la sustancia";
      $('#deleteLastMessage').modal('show');
    } else{
      operations(substanceName, initialTemp, mass);
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

  function updateImgSubstance(substance){
    opciones.forEach((opcion) => {
      if(substance.value === opcion.nombre){
        imgSubstance.setAttribute("src", `${opcion.img}`);
        document.getElementById('mass-value').textContent = `Masa: ${opcion.masa} Kg`;
      }
    });
    showMassInput(substance);
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

  function selectTemperature(substance){
    let temperature;
    opciones.forEach((opcion, index) => {
      if(substance === opcion.nombre){
        temperature = opcion.masa;
      }
    });
    return temperature;
  }

  videoButton.addEventListener('click', () => {
    if (videoContainer.style.display === 'none' || videoContainer.style.display === 'block') {
      videoContainer.style.top = '50%';
      videoContainer.style.left = '50%';
      videoContainer.style.transform = 'translate(-50%, -50%)';
      videoContainer.style.display = 'block';
      videoButton.style.display = 'none';
    }
  });
  
  document.body.addEventListener('click', (event) => {
    if (event.target!== videoButton && event.target!== videoContainer.firstChild) {
      videoContainer.style.display = 'none';
      videoButton.style.display = 'block';
    }
  });