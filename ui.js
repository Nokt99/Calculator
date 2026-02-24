const input = document.getElementById("expression");
const resultDiv = document.getElementById("result");
const historyDiv = document.getElementById("history");

input.addEventListener("input", calculate);

document.querySelectorAll("[data-mode]").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll("[data-mode]").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    setMode(btn.dataset.mode);
    calculate();
  };
});

document.querySelectorAll("[data-action]").forEach(btn => {
  btn.onclick = () => runAction(btn.dataset.action);
});

document.getElementById("precisionUp").onclick = increasePrecision;
document.getElementById("precisionDown").onclick = decreasePrecision;
document.getElementById("angleToggle").onclick = toggleAngle;
document.getElementById("clear").onclick = () => {
  input.value = "";
  resultDiv.innerText = "";
};

function addToHistory(expr, result) {
  historyLog.unshift(expr + " = " + result);
  historyDiv.innerHTML = historyLog.slice(0, 10).join("<br>");
}

function calculate() {
  const expr = input.value;
  if (!expr) return;

  try {
    let result = evaluateExpression(expr);

    if (typeof result === "string" && result.includes("=")) {
      resultDiv.innerText = result;
      addToHistory(expr, result);
      return;
    }

    let formatted = formatResult(result, state.mode, state.precision);
    resultDiv.innerText = formatted;
    addToHistory(expr, formatted);

  } catch {
    resultDiv.innerText = "Invalid Expression";
  }
}

function runAction(action) {
  const expr = input.value;
  if (!expr) return;

  try {
    let result;

    if (action === "solve") result = solveExpression(expr);
    if (action === "simplify") result = simplifyExpression(expr);
    if (action === "expand") result = expandExpression(expr);
    if (action === "factor") result = factorExpression(expr);
    if (action === "derivative") result = derivativeExpression(expr);
    if (action === "integral") result = integralExpression(expr);
    if (action === "limit") result = limitExpression(expr);
    if (action === "matrixdet") result = determinant(expr);
    if (action === "matrixinv") result = inverseMatrix(expr);

    if (action === "graph") {
      Plotly.newPlot("graph", [{
        x: math.range(-10, 10, 0.1).toArray(),
        y: math.range(-10, 10, 0.1).toArray().map(x => math.evaluate(expr, { x }))
      }]);
      return;
    }

    resultDiv.innerText = result;
    addToHistory(expr, result);

  } catch {
    resultDiv.innerText = "Operation Failed";
  }
}
