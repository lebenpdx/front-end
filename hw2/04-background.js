window.addEventListener('load', function () {
  const body = document.querySelector('body');
  const backgroundIntervalInput = document.getElementById(
    'backgroundIntervalInput'
  );
  const startStopButton = document.getElementById('startStopButton');
  let changeColorInterval;

  let isChanging = false;

  function changeBackgroundColor() {
    const randomColor = getRandomColor();
    body.style.backgroundColor = randomColor;
  }

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const initialInterval = 3000;
  backgroundIntervalInput.value = (initialInterval / 1000).toString();

  startStopButton.addEventListener('click', function () {
    if (!isChanging) {
      const interval = parseInt(backgroundIntervalInput.value) * 1000;
      if (interval > 0) {
        changeBackgroundColor();
        changeColorInterval = setInterval(changeBackgroundColor, interval);
        startStopButton.textContent = 'Stop';
        startStopButton.style.backgroundColor = 'red';
        isChanging = true;
      }
    } else {
      clearInterval(changeColorInterval);
      startStopButton.textContent = 'Start';
      startStopButton.style.backgroundColor = '#0d6efd';
      isChanging = false;
    }
  });

  startStopButton.click();
});
