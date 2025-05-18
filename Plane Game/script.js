const plane = document.getElementById("plane");
const startBtn = document.getElementById("start-engine");
const stopBtn = document.getElementById("stop-engine");
const upBtn = document.getElementById("up");
const downBtn = document.getElementById("down");
const landBtn = document.getElementById("land");
const road = document.getElementById("road");
const sky = document.getElementById("sky");

let engineOn = false;
let isLanding = false;
let planePosition = 50; // horizontal (%)
let planeAltitude = 40; // vertical (%)

function updatePlanePosition() {
  plane.style.left = `${planePosition}%`;
  plane.style.top = `${planeAltitude}%`;
}

function movePlaneToRoad() {
  planeAltitude = 85;
  updatePlanePosition();
  plane.style.transition = "top 2s ease";
}

startBtn.addEventListener("click", () => {
  engineOn = true;
  isLanding = false;
  plane.classList.add("engine-on");
  planeAltitude = 40;
  plane.style.transition = "top 1s ease";
  updatePlanePosition();
  road.classList.add("hidden");
  sky.classList.remove("paused");
});

stopBtn.addEventListener("click", () => {
  engineOn = false;
  plane.classList.remove("engine-on");
  sky.classList.add("paused");
});

upBtn.addEventListener("click", () => {
  if (engineOn && planeAltitude > 5) {
    planeAltitude -= 5; // Move up by 5%
    updatePlanePosition();
  }
});

downBtn.addEventListener("click", () => {
  if (engineOn && planeAltitude < 85) {
    planeAltitude += 5; // Move down by 5%
    updatePlanePosition();
  }
});

landBtn.addEventListener("click", () => {
  if (engineOn) {
    isLanding = true;
    engineOn = false;
    plane.classList.remove("engine-on");
    sky.classList.add("paused");
    road.classList.remove("hidden");

    // Tilt the plane to 45 degrees
    plane.style.transition = "top 2.5s ease, left 2.5s ease, transform 2.5s ease";
    plane.style.transform = "translate(-50%, -50%) rotate(45deg)";
    
    // Move diagonally down and forward (right)
    planeAltitude = 85; // Adjust to lower altitude
    planePosition += 10; // Move slightly forward/right
    if (planePosition > 90) planePosition = 90;

    updatePlanePosition();

    // Optional: reset rotation after landing
    setTimeout(() => {
      plane.style.transform = "translate(-50%, -50%) rotate(0deg)";
    }, 2600);
  }
});

