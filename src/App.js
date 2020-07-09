import React, { useState, useEffect, useRef } from "react";
import Work from './components/Work'
import Break from './components/Break'
import Countdown from './components/Countdown'
import './App.css';

function App() {
  const audioElement = useRef(null);
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
    if (newWorkTime > 0) {
      setWorkTime(newWorkTime)
    }

    // if (newWorkTime < 0) {
    //   setWorkTime(0);
    // } else {
    //   setWorkTime(newWorkTime);
    // }
  };

  const raiseWorkTimeByOneMinute = () => {
    const newWorkTime = workTime + 60
    if (newWorkTime <= 60 * 60) {
      setWorkTime(newWorkTime)
    }
  };

  const isStarted = intervalId != null;

  // if countdown is zero, change work to break or break to work
  useEffect(() => {
    if (countdown === 0) {
      audioElement.current.play()
      if (currentTimerType === "Work") {
        setCurrentTimerType("Break");
        return breakTime;
      } else if (currentTimerType === "Break") {
        setCurrentTimerType("Work");
        return workTime;
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
        //     return newCountdown;
        //   }

        //   // if work, switch to break
        //   if (currentTimerType === "Work") {
        //     setCurrentTimerType("Break");
        //     // set countdown to breakTime
        //     return breakTime;
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
    // reset audio
    audioElement.current.load()
    // clear the countdown interval
    clearInterval(intervalId)
    // set the intervalId null
    setIntervalId(null)
    // set the timertype to "Work"
    setCurrentTimerType('Work')
    // reset the workTime to 25 minutes
    setWorkTime(25 * 60)
    // reset the breakTime to 5
    setBreakTime(60 * 5)
    // reset the timer to 25 minutes (initial workTime)
    setCountdown(25 * 60)
  }

  const lowerBreakTimeByOneMinute = () => {
    const newBreakTime = breakTime - 60;
    if (newBreakTime > 0) {
      setBreakTime(newBreakTime)
    }

    // if (newBreakTime < 0) {
    //   setBreakTime(0);
    // } else {
    //   setBreakTime(newBreakTime);
    // }
  };

  const raiseBreakTimeByOneMinute = () => {
    const newBreakTime = breakTime + 60
    if (newBreakTime <= 60 * 60) {
      setBreakTime(newBreakTime)
    }
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
      <p>
        <button id="reset" onClick={handleResetButtonClick}>Reset</button>
      </p>
      <audio id="alarm" ref={audioElement}>
        <source src="https://www.soundjay.com/misc/sounds/magic-chime-01.mp3" />
      </audio>
    </div>
  );
}

export default App;
