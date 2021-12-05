import { useState } from "react";
import "./CountDown.css";
function App() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  // Get days left function

  const getDaysLeft = (endDate) => {
    const total = Date.parse(endDate) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    setDays(days);
    setHours(hours);
    setMinutes(minutes);
    setSeconds(seconds);
  };

  setInterval(() => {
    getDaysLeft("2021-12-17");
  }, 1000);

  console.log(minutes, seconds, days, hours);
  return (
    <div id="home">
      {/* Days */}
      <div className="wrapper">
        <p className="value">{days}</p>
        <div className="title">Days</div>
      </div>
      {/* Hours */}
      <div className="wrapper">
        <p className="value">{hours}</p>
        <div className="title">Hours</div>
      </div>
      {/* minutes */}
      <div className="wrapper">
        <p className="value">{minutes}</p>
        <div className="title">Minutes</div>
      </div>
      {/* Seconds */}
      <div className="wrapper">
        <p className="value">{seconds}</p>
        <div className="title">Seconds</div>
      </div>
    </div>
  );
}

export default App;
