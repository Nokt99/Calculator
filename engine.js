const scope = {};
let historyLog = [];

function evaluateExpression(expr) {
  if (expr.includes("=") && !expr.includes("==")) {
    let parts = expr.split("=");
    let variable = parts[0].trim();
    let value = math.evaluate(parts[1], scope);
    scope[variable] = value;
    return variable + " = " + value;
  }
  return math.evaluate(expr, scope);
}

function solveExpression(expr) {
  return Algebrite.run("solve(" + expr + ")");
}

function simplifyExpression(expr) {
  return Algebrite.run("simplify(" + expr + ")");
}

function expandExpression(expr) {
  return Algebrite.run("expand(" + expr + ")");
}

function factorExpression(expr) {
  return Algebrite.run("factor(" + expr + ")");
}

function derivativeExpression(expr) {
  return Algebrite.run("d(" + expr + ")");
}

function integralExpression(expr) {
  return Algebrite.run("integral(" + expr + ")");
}

function limitExpression(expr) {
  return Algebrite.run("limit(" + expr + ")");
}

function determinant(expr) {
  return math.det(math.evaluate(expr, scope));
}

function inverseMatrix(expr) {
  return math.inv(math.evaluate(expr, scope));
}

function toMixedFraction(value) {
  let frac = math.fraction(value);
  let whole = Math.floor(frac.n / frac.d);
  let remainder = frac.n % frac.d;
  if (remainder === 0) return whole.toString();
  if (whole === 0) return remainder + "/" + frac.d;
  return whole + " " + Math.abs(remainder) + "/" + frac.d;
}

function formatResult(result, mode, precision) {
  try {
    if (mode === "decimal")
      return math.format(math.number(result), { precision });

    if (mode === "fraction")
      return math.fraction(result).toString();

    if (mode === "mixed")
      return toMixedFraction(result);

    if (mode === "scientific")
      return math.format(result, { notation: "exponential", precision });

    if (mode === "engineering")
      return math.format(result, { notation: "engineering", precision });

    if (mode === "remainder") {
      let frac = math.fraction(result);
      let whole = Math.floor(frac.n / frac.d);
      let remainder = frac.n % frac.d;
      return remainder === 0 ? whole : whole + " R " + remainder;
    }

    return result.toString();
  } catch {
    return result;
  }
}
