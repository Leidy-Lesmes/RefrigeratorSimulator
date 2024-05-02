
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