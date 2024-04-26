function calculate() {
    // Constants
    const specificHeatWater = 4.186; // J/g°C
    const waterMass = 1000; // g por 1 litro de agua
    
    // Get values from input fields
    const initialTemp = parseFloat(document.getElementById('initial-temp').value);
    const fridgeTemp = parseFloat(document.getElementById('fridge-temp').value);
    const cop = parseFloat(document.getElementById('cop').value);
    
    // Calculate the heat to be removed (Q)
    const heatRemoved = waterMass * specificHeatWater * (initialTemp - fridgeTemp);
    
    // Calculate Power using COP (P = Q / COP)
    const power = heatRemoved / cop;
    
    // Calculate the time to cool (t = Q / P)
    const time = heatRemoved / power;
    
    // Calculate the work done (W = P * t)
    const work = power * time;
    
    // Update the DOM with the calculated values
    document.getElementById('time').textContent = `Time to reach fridge temperature (s): ${time.toFixed(2)}`;
    document.getElementById('power').textContent = `Power required (W): ${power.toFixed(2)}`;
    document.getElementById('work').textContent = `Work done (J): ${work.toFixed(2)}`;
  }