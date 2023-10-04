const elem = document.querySelector("input");

elem.addEventListener("input", () => {
  let isPal = false;
  if (elem.value > 0) {
    const NumtoStr = elem.value.toString();
    isPal = NumtoStr === NumtoStr.split("").reverse().join("");
  }

  const result = document.querySelector("div:last-child div");

  if (isPal) {
    result.textContent = "Yes. This is a palindrome!";
    result.style.color = "green";
  } else {
    result.textContent = "No. This is NOT a palindrome.";
    result.style.color = "red";
  }
});
