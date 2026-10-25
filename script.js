// sliders
const slider = document.getElementById("antal-toej");
const antalOutput = document.getElementById("antal-output");
const ubrugt = document.getElementById("ubrugt");
const co2 = document.getElementById("co2");

function opdater() {
  const antal = Number(slider.value);
  const ubrugteTing = Math.round((antal * 25) / 80);

  antalOutput.textContent = antal;
  ubrugt.textContent = ubrugteTing;
  co2.textContent = Math.round((ubrugteTing * 55) / 25);
}

slider.addEventListener("input", opdater);
opdater();
