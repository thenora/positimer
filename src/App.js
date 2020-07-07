import React, { useState } from "react";
import Work from './components/Work'
import Break from './components/Break'
import './App.css';

function App() {
  const [workTime, setWorkTime] = useState(60 * 25); // time in seconds

  const lowerWorkTimeByOneMinute = () => {
    const newWorkTime = workTime - 60;

    if (newWorkTime < 0) {
      setWorkTime(0);
    } else {
      setWorkTime(newWorkTime);
    }
  };

  const raiseWorkTimeByOneMinute = () => {
    setWorkTime(workTime + 60);
  };

  return (
    <div className="App">
      <Work
        workTime={workTime}
        lowerWorkTimeByOneMinute={lowerWorkTimeByOneMinute}
        raiseWorkTimeByOneMinute={raiseWorkTimeByOneMinute}
      />
      <Break />
    </div>
  );
}

export default App;
