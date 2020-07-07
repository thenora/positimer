import React, { useState } from "react";
import Work from './components/Work'
import Break from './components/Break'
import Countdown from './components/Countdown'
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

  const [breakTime, setBreakTime] = useState(300); // time in seconds

  const lowerBreakTimeByOneMinute = () => {
    const newBreakTime = breakTime - 60;

    if (newBreakTime < 0) {
      setBreakTime(0);
    } else {
      setBreakTime(newBreakTime);
    }
  };

  const raiseBreakTimeByOneMinute = () => {
    setBreakTime(breakTime + 60);
  };


  return (
    <div className="App">

      <Work
        workTime={workTime}
        lowerWorkTimeByOneMinute={lowerWorkTimeByOneMinute}
        raiseWorkTimeByOneMinute={raiseWorkTimeByOneMinute}
      />
      <Countdown
        workTime={workTime}
      />
      <Break
        breakTime={breakTime}
        lowerBreakTimeByOneMinute={lowerBreakTimeByOneMinute}
        raiseBreakTimeByOneMinute={raiseBreakTimeByOneMinute}
      />
    </div>
  );
}

export default App;
