import { useEffect, useState } from "react";
import "./App.css";
import { VscDebugRestart, VscDebugStart, VscDebugPause } from "react-icons/vsc";
function App() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [start, setStart] = useState(false);
  const [options, setOptions] = useState(false);

  const OnStart = () => {
    setStart(true);
    setOptions(true);
  };

  const Pause = () => {
    setStart(false);
  };

  const Restart = () => {
    setSeconds(0);
    setMinutes(0);
    setHours(0);
    setStart(false);
  };

  useEffect(() => {
    let interval = null;
    if (start) {
      interval = setInterval(() => {
        if (seconds <= 59) {
          setSeconds((second) => second + 1);
        }
        if (seconds > 59) {
          setMinutes((minute) => minute + 1);
          setSeconds(0);
        }
        if (minutes > 59) {
          setHours((hour) => hour + 1);
          setMinutes(0);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [start, seconds, minutes, hours]);

  return (
    <div className="App">
      <div className="Container">
        <div className="Clock" title="Stop Watch">
          <div className="hours">
            {hours < 10 && <span>0</span>}
            {hours}
          </div>
          <div className="minutes">
            :{minutes < 10 && <span>0</span>}
            {minutes}
          </div>
          <div className="seconds">
            :{seconds < 10 && <span>0</span>}
            {seconds}
          </div>
        </div>
        <div className="btns">
          {options ? (
            <button
              title="Restart"
              onClick={Restart}
              className={start && "rotate"}
            >
              <VscDebugRestart />
            </button>
          ) : undefined}
          <button title="Start" onClick={OnStart}>
            <VscDebugStart />
          </button>
          {options ? (
            <button
              title="Pause"
              onClick={Pause}
              className={start && "pause-begining "}
            >
              <VscDebugPause />
            </button>
          ) : undefined}
        </div>
      </div>
    </div>
  );
}

export default App;
