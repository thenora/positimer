import React, { useState, useEffect } from "react";
import Work from './components/Work'
import Break from './components/Break'
import Countdown from './components/Countdown'
import './App.css';

function App() {
  const [currentTimerType, setCurrentTimerType] = useState("Work");
  const [intervalId, setIntervalId] = useState(null);
  const [workTime, setWorkTime] = useState(60 * 25); // time in seconds
  const [breakTime, setBreakTime] = useState(300);
  const [countdown, setCountdown] = useState(workTime);

  // Change countdown when workTime changes
  useEffect(() => {
    setCountdown(workTime);
  }, [workTime]);

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

  const isStarted = intervalId != null;

  // if countdown is zero, change work to break or break to work
  useEffect(() => {
    if (countdown === 0) {
      if (currentTimerType === "Work") {
        setCurrentTimerType("Break");
        setCountdown(breakTime);
      } else if (currentTimerType === "Break") {
        setCurrentTimerType("Work");
        setCountdown(workTime);
      }
    }
  }, [breakTime, currentTimerType, workTime, countdown]);

  const handleStartStopClick = () => {
    if (isStarted) {
      // if timer is started
      // we want to stop and clear
      clearInterval(intervalId);
      setCountdown(workTime);
      setCurrentTimerType("Work");
      setIntervalId(null);
    } else {
      // if timer is stopped:
      // lower countdown for each second
      // 1000 ms is 1 second
      const newIntervalId = setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1);
        //   const newCountdown = prevCountdown - 1;
        //   if (newCountdown >= 0) {
        //     return prevCountdown - 1;
        //   }

        //   // if work, switch to break
        //   if (currentTimerType === "Work") {
        //     setCurrentTimerType("Break");
        //     // set countdown to breakTime
        //     setCountdown(breakTime);
        //   }

        //   // if break, switch to work
        //   else if (currentTimerType === "Break") {
        //     setCurrentTimerType("Work");
        //     // set countdown to breakTime
        //     setCountdown(workTime);
        //   }
        //   // set countdown to workTime
        //   return prevCountdown;
        // });
      }, 100); // TODO reset to 1000
      setIntervalId(newIntervalId);
    }
  };

  const handleResetButtonClick = () => {
    // clear the countdown interval

    // set the intervalId null

    // set the timertype to "Work"

    // reset the workTime to 25 minutes

    // reset the breakTime to 5

    // reset the timer to 25 minutes (initial workTime)
  }

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
        breakTime={breakTime}
        timerLabel={currentTimerType}
        handleStartStopClick={handleStartStopClick}
        startStopButtonLabel={isStarted ? "Stop" : "Start"}
        countdown={countdown}
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
