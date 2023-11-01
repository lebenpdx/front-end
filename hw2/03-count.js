document.addEventListener('DOMContentLoaded', function () {
  const input = document.querySelector('input');
  const text = document.getElementById('textContent');
  const originalText = text.innerHTML; //Store original
  let currentInput = '';

  input.addEventListener('keydown', function (event) {
    if (event.key === 'Backspace') {
      currentInput = currentInput.slice(0, -1);
    } else if (event.key.length === 1) {
      //Check for character length change
      currentInput += event.key.toLowerCase();
    }

    if (currentInput === '') {
    } else {
      const words = originalText.split(/\s+/);
      const highlightedWords = words.map((word) => {
        if (new RegExp(`\\b${currentInput}\\b`, 'i').test(word)) {
          return `<span class='highlight'>${word}</span>`;
        }
        return word;
      });

      text.innerHTML = highlightedWords.join(' ');
    }
  });
});
