function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}

export const calculateColorDifference = (color1, color2) => {
  const c1 = hexToRgb(color1);
  const c2 = hexToRgb(color2);

  const diff = Math.sqrt(
    Math.pow(c1.r - c2.r, 2) +
      Math.pow(c1.g - c2.g, 2) +
      Math.pow(c1.b - c2.b, 2)
  );

  return diff;
};

export const findClosestColor = (targetColor, colorArray, usedColors) => {
  const availableColors = colorArray.filter(
    (color) => !usedColors.has(color) && color !== targetColor
  );

  if (availableColors.length === 0) {
    return targetColor;
  }

  const closestColor = availableColors.reduce(
    (closest, current) => {
      const difference = calculateColorDifference(targetColor, current);

      if (difference < closest.difference) {
        return { color: current, difference };
      }

      return closest;
    },
    { color: availableColors[0], difference: Infinity }
  );

  return closestColor.color;
};

export const getResultColors = (workspaceColors, multiColors) => {
  const usedColors = new Set();

  return multiColors.map((color) => {
    const closestColor = findClosestColor(color, workspaceColors, usedColors);
    usedColors.add(closestColor);
    return closestColor;
  });
};
