import React, { useState } from "react";
import "./App.css";

function App() {
  const [dots, setDots] = useState([]);
  const [redo, setRedo] = useState([]);

  const Colors = [
    "#2c3e50",
    "#34495e",
    "#c0392b",
    "#e74c3c",
    "#27ae60",
    "#3498db",
    "#f39c12",
    "#f1c40f",
  ];

  function getRandomColor() {
    return Colors[Math.floor(Math.random() * Colors.length)];
  }

  const handleClick = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const x = clientX - currentTarget.offsetLeft;
    const y = clientY - currentTarget.offsetTop;
  
    setDots([...dots, { x, y, color: getRandomColor() }]);
    setRedoStack([]);
  };
  
  function handleUndo() {
    if (dots.length === 0) return;
    const copy = [...dots];
    const lastDot = copy.pop();
    setDots(copy);
    setRedo([...redo, lastDot]);
  }

  function handleRedo() {
    if (redo.length === 0) return;
    const copy = [...redo];
    const lastDot = copy.pop();
    setRedo(copy);
    setDots([...dots, lastDot]);
  }

  function Reset() {
    setDots([]);
    setRedo([]);
  }

  return (
    <>
      <div className="controls">
        <button onClick={Reset} disabled={dots.length === 0}>
          RESET
        </button>
        <button onClick={handleUndo} disabled={dots.length === 0}>
          UNDO
        </button>
        <button onClick={handleRedo} disabled={redo.length === 0}>
          REDO
        </button>
      </div>
      <div className="click" onClick={handleClick}>
        {dots.map((dot, index) => (
          <div
            key={index}
            className="dot"
            style={{
              left: dot.x - 5,
              top: dot.y - 5,
              backgroundColor: dot.color,
              position: "absolute",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
            }}
          ></div>
        ))}
      </div>
    </>
  );
}

export default App;
