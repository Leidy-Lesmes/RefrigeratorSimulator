const input = document.querySelector('input[type="number"]');

input.addEventListener('input', function() {
  const minValue = parseFloat(input.getAttribute('min'));
  const maxValue = parseFloat(input.getAttribute('max'));
  const currentValue = parseFloat(input.value);

  if (currentValue < minValue) {
    input.value = minValue;
  } else if (currentValue > maxValue) {
    input.value = maxValue;
  }
});