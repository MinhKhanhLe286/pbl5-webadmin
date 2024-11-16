document.addEventListener("DOMContentLoaded", () => {
  const toggleModeBtn = document.getElementById("toggle-mode-btn");
  const toggleAutoBtn = document.getElementById("toggle-auto-btn");
  const currentMode = document.getElementById("current-mode");
  const manualControls = document.getElementById("manual-controls");

  const fanControlBtn = document.getElementById("fan-control-btn");
  const pumpControlBtn = document.getElementById("pump-control-btn");
  const roofControlBtn = document.getElementById("roof-control-btn");

  toggleModeBtn.addEventListener("click", () => {
    currentMode.innerHTML = "Current Mode: <strong>Manual Mode</strong>";
    manualControls.style.display = "block";
    toggleModeBtn.style.display = "none";
  });

  toggleAutoBtn.addEventListener("click", () => {
    currentMode.innerHTML = "Current Mode: <strong>Auto Mode</strong>";
    manualControls.style.display = "none";
    toggleModeBtn.style.display = "inline-block";
  });

  fanControlBtn.addEventListener("click", () => {
    fanControlBtn.textContent =
      fanControlBtn.textContent === "Turn Off Fan"
        ? "Turn On Fan"
        : "Turn Off Fan";
  });

  pumpControlBtn.addEventListener("click", () => {
    pumpControlBtn.textContent =
      pumpControlBtn.textContent === "Turn Off Pump"
        ? "Turn On Pump"
        : "Turn Off Pump";
  });

  roofControlBtn.addEventListener("click", () => {
    roofControlBtn.textContent =
      roofControlBtn.textContent === "Close Roof" ? "Open Roof" : "Close Roof";
  });
});
