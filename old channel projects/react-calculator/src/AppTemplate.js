import react, { useState } from "react";
import "./App.css";

function App() {
  const [result, setResult] = useState("");
  const handleClick = e => {
    setResult("");
    setResult(result.concat(e.target.nam));
  };

  //clear
  const clear = () => {
    setResult("");
  };

  //backSpace
  const backSpace = () => {
    setResult(result.slice(0, -1));
  };

  //calculate
  const calc = () => {
    try {
      setResult(Number(eval(result).toString()).toFixed(1));
    } catch (error) {
      setResult("invalid format");
    }
  };

  return (
    <>
      <div class="container">
        <h1 class="title">React Calculator</h1>
        <div class="calculator">
          <input type="text" class="calc-numbers" value="30" />
          <div class="calculator-buttons">
            <button class="btn clear span-2">C</button>
            <button class="btn orange ">&larr;</button>
            <button class="btn orange ">&divide;</button>
            <button class="btn">7</button>
            <button class="btn">8</button>
            <button class="btn">9</button>
            <button class="btn orange">x</button>
            <button class="btn">4</button>
            <button class="btn">5</button>
            <button class="btn">6</button>
            <button class="btn">-</button>
            <button class="btn">1</button>
            <button class="btn">2</button>
            <button class="btn">3</button>
            <button class="btn orange">+</button>
            <button class="btn span-3">0</button>
            <button class="btn orange  equal">=</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
