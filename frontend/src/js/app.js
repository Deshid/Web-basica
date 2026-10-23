const healthButton = document.querySelector('#health-button');
const healthResult = document.querySelector('#health-result');

healthButton.addEventListener('click', async () => {
  healthResult.textContent = 'Comprobando...';

  try {
    const response = await fetch('/api/health');
    if (!response.ok) {
      throw new Error('La respuesta del backend no fue correcta.');
    }

    const data = await response.json();
    healthResult.textContent = `Backend: ${data.status}`;
  } catch (error) {
    healthResult.textContent = `Error: ${error.message}`;
  }
});
