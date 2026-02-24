const state = {
  mode: "normal",
  precision: 14,
  angle: "deg"
};

function setMode(newMode) {
  state.mode = newMode;
}

function toggleAngle() {
  state.angle = state.angle === "deg" ? "rad" : "deg";
  math.config({ angle: state.angle });
}

function increasePrecision() {
  state.precision++;
}

function decreasePrecision() {
  if (state.precision > 1) state.precision--;
}
