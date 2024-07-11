
import React, {useState, useEffect,useRef} from "react";
import './../styles/App.css';

const App = () => {
  const [time,setTime]=useState(0);
  const [laps,setLaps]=useState([]);
  const [isRunning,setIsRunning]=useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 10); 
    }
  };

  const handleStop = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  };

  const handleLap = () => {
    setLaps([...laps, time]);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const formatTime = (centiseconds) => {
    const minutes = Math.floor(centiseconds / 6000);
    const seconds = Math.floor((centiseconds % 6000) / 100);
    const centis = centiseconds % 100;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(centis).padStart(2, '0')}`;
  };

  return (
    
        <div className="App">
      
      <div className="timer">{formatTime(time)}</div>
      <div className="controls">
        <button onClick={handleStart} disabled={isRunning}>Start</button>
        <button onClick={handleStop} disabled={!isRunning}>Stop</button>
        <button onClick={handleLap} disabled={!isRunning}>Lap</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div className="laps">
        <ul>
        {laps.map((lap, index) => (
          <li>
          <div key={index} className="lap">
            {`${formatTime(lap)}`}
          </div>
          </li>
        ))}
        </ul>
        
      </div>
    </div>
  );
}

export default App
