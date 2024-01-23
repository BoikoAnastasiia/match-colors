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

export const findClosestColor = (
  targetColor,
  colorArray,
  usedColors,
  excludeIndex
) => {
  const availableColors = colorArray.filter(
    (color, index) => !usedColors.has(color) && index !== excludeIndex
  );

  if (availableColors.length === 0) {
    return targetColor;
  }

  const closestColor = availableColors.reduce(
    (closest, current, index) => {
      const difference = calculateColorDifference(targetColor, current);

      if (difference < closest.difference) {
        return { color: current, difference, index };
      }

      return closest;
    },
    { color: availableColors[0], difference: Infinity, index: 0 }
  );

  return closestColor.color;
};

export const getResultColors = (workspaceColors, multiColors) => {
  const result = [];

  multiColors.forEach((multiColor) => {
    // Exclude colors close to black and white based on the condition
    const isExcluded =
      calculateColorDifference(multiColor, "#000000") < 100 ||
      calculateColorDifference(multiColor, "#FFFFFF") < 10;

    const closestColor = isExcluded
      ? multiColor
      : findClosestColor(multiColor, workspaceColors, new Set(result));

    // Add the closest color to the result array
    result.push(closestColor);
  });

  return result;
};
