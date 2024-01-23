import { useState, useEffect, useRef } from "react";
import { getResultColors } from "./helper";
import "./styles.css";
import { worskpaceColorsDefault } from "./defaultValues.js";
import { multiColorsDefault } from "./defaultValues.js";

export default function App() {
  const [workspaceColors, setWorkspaceColors] = useState(
    worskpaceColorsDefault
  );
  const [multiColors, setMultiColors] = useState(multiColorsDefault);
  const [resultColors, setResultColors] = useState([]);
  const [toastVisible, setToastVisible] = useState(false);

  const handleWorkspaceColorChange = (index, newColor) => {
    const updatedWorkspaceColors = [...workspaceColors];
    updatedWorkspaceColors[index] = newColor;
    setWorkspaceColors(updatedWorkspaceColors);
  };

  const handleMultiColorChange = (index, newColor) => {
    const updatedMultiColors = [...multiColors];
    updatedMultiColors[index] = newColor;
    setMultiColors(updatedMultiColors);
  };

  useEffect(() => {
    const newResultColors = getResultColors(workspaceColors, multiColors);
    setResultColors(newResultColors);
  }, [workspaceColors, multiColors]);

  const handleDeleteWorkspaceColor = (index) => {
    const updatedWorkspaceColors = [
      ...workspaceColors.slice(0, index),
      ...workspaceColors.slice(index + 1),
    ];
    setWorkspaceColors(updatedWorkspaceColors);
  };

  const handleDeleteMultiColor = (index) => {
    const updatedMultiColors = [
      ...multiColors.slice(0, index),
      ...multiColors.slice(index + 1),
    ];
    setMultiColors(updatedMultiColors);
  };

  const addWorkspaceColor = () => {
    const updatedWorkspaceColors = [...workspaceColors, "#FFFFFF"];
    setWorkspaceColors(updatedWorkspaceColors);
  };

  const addMultiColor = () => {
    const updatedMultiColors = [...multiColors, "#FFFFFF"];
    setMultiColors(updatedMultiColors);
  };

  const copyToClipboard = (color) => {
    navigator.clipboard.writeText(color);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 2000);
  };

  return (
    <div className="App">
      <h2>Workspace colors</h2>
      <ul className="color_list">
        {workspaceColors.map((color, index) => (
          <li className="color_rect" key={index}>
            <button
              type="button"
              onClick={() => handleDeleteWorkspaceColor(index)}
            >
              &#x2715;
            </button>
            <input
              type="color"
              className="color_rect"
              value={color}
              onChange={(e) =>
                handleWorkspaceColorChange(index, e.target.value)
              }
            />
          </li>
        ))}
        <li className="color_rect">
          <button className="add_button" onClick={() => addWorkspaceColor()}>
            +
          </button>
        </li>
      </ul>
      <hr />
      <h2>Multi Colors</h2>
      <ul className="color_list">
        {multiColors.map((color, index) => (
          <li className="color_rect" key={index}>
            <button type="button" onClick={() => handleDeleteMultiColor(index)}>
              &#x2715;
            </button>
            <input
              type="color"
              className="color_rect"
              value={color}
              onChange={(e) => handleMultiColorChange(index, e.target.value)}
            />
          </li>
        ))}
        <li className="color_rect">
          <button className="add_button" onClick={() => addMultiColor()}>
            +
          </button>
        </li>
      </ul>
      <hr />
      <h2>Result Colors</h2>
      <ul className="color_list">
        {resultColors.map((color, index) => (
          <li
            className="color_rect result_color"
            key={index}
            style={{ backgroundColor: color }}
          >
            <div className="backdrop"></div>
            <button
              type="button"
              className="copy_button"
              onClick={() => copyToClipboard(color)}
            >
              <i class="fa fa-copy"></i>
              {color.replace("#", "")}
            </button>
          </li>
        ))}
      </ul>
      <div style={{ display: `${toastVisible ? "block" : "none"}` }}>
        Copied!
      </div>
    </div>
  );
}
