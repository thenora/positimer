import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Work from './components/Work';
import Break from './components/Break';
import Countdown from './components/Countdown';
import Quotes from './components/Quotes';
import QuoteAdmin from './components/QuoteAdmin';
import './App.css';

function App() {
  const audioElement = useRef(null);
  const [currentTimerType, setCurrentTimerType] = useState("Work");
  const [intervalId, setIntervalId] = useState(null);
  const [workTime, setWorkTime] = useState(60 * 25); // time in seconds
  const [breakTime, setBreakTime] = useState(300);
  const [countdown, setCountdown] = useState(workTime);
  const isStarted = intervalId != null;
  const [workCounter, setWorkCounter] = useState(0);
  const [breakCounter, setBreakCounter] = useState(0);

  // Change countdown when workTime or breakTime changes
  useEffect(() => {
    if (currentTimerType === "Work") {
      setCountdown(workTime);
    } else if (currentTimerType === "Break") {
      setCountdown(breakTime);
    }
  }, [workTime, breakTime]);

  const lowerWorkTimeByOneMinute = () => {
    const newWorkTime = workTime - 60;

    if (newWorkTime < 0) {
      setWorkTime(0);
    } else if (newWorkTime === 0) {
      return
    } else {
      setWorkTime(newWorkTime);
    }
  };

  const raiseWorkTimeByOneMinute = () => {
    const newWorkTime = workTime + 60
    if (newWorkTime <= 60 * 60) {
      setWorkTime(newWorkTime)
    }
  };


  // TODO where should I increase my work counter?

  // if countdown is zero, change work to break or break to work
  useEffect(() => {
    if (countdown === 0) {
      audioElement.current.play()
      if (currentTimerType === "Work") {
        setWorkCounter(workCounter + 1);
        setCurrentTimerType("Break");
        setCountdown(breakTime);
        clearInterval(intervalId);
        setIntervalId(null);
      } else if (currentTimerType === "Break") {
        setBreakCounter(breakCounter + 1);
        setCurrentTimerType("Work");
        setCountdown(workTime);
        clearInterval(intervalId);
        setIntervalId(null);
      }
    }
  }, [breakTime, currentTimerType, workTime, countdown, intervalId, workCounter, breakCounter]);

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
      }, 100); // TODO reset to 1000
      setIntervalId(newIntervalId);
    }
  };

  const handleResetButtonClick = () => {
    // reset audio
    audioElement.current.load();
    // clear the countdown interval
    clearInterval(intervalId);
    setIntervalId(null);
    setCurrentTimerType("Work");
    // reset the workTime to 25 minutes
    setWorkTime(25 * 60);
    // reset the breakTime to 5
    setBreakTime(60 * 5);
    // reset the timer to 25 minutes (initial workTime)
    setCountdown(25 * 60);
  }

  const lowerBreakTimeByOneMinute = () => {
    const newBreakTime = breakTime - 60;
    if (newBreakTime < 0) {
      setBreakTime(0);
    } else if (newBreakTime === 0) {
      return
    } else {
      setBreakTime(newBreakTime);
    }
  };

  const raiseBreakTimeByOneMinute = () => {
    const newBreakTime = breakTime + 60
    if (newBreakTime <= 60 * 60) {
      setBreakTime(newBreakTime);
    }
  };

  const skipBreak = () => {
    clearInterval(intervalId);
    setCountdown(workTime);
    setCurrentTimerType("Work");
    setIntervalId(null);
  }

  return (
    <div className="App">
      <div>
        {!isStarted && currentTimerType === "Work" &&
          <Work
            workTime={workTime}
            lowerWorkTimeByOneMinute={lowerWorkTimeByOneMinute}
            raiseWorkTimeByOneMinute={raiseWorkTimeByOneMinute}
          />
        }
        {!isStarted && currentTimerType === "Break" &&
          <Break
            breakTime={breakTime}
            lowerBreakTimeByOneMinute={lowerBreakTimeByOneMinute}
            raiseBreakTimeByOneMinute={raiseBreakTimeByOneMinute}
          />
        }
      </div>
      <div>
        <Countdown
          workTime={workTime}
          breakTime={breakTime}
          timerLabel={currentTimerType}
          handleStartStopClick={handleStartStopClick}
          startStopButtonLabel={isStarted ? "Stop" : "Start"}
          countdown={countdown}
        />
        {/* TODO change skip button to link */}
        {!isStarted && currentTimerType === "Break" &&
          <p>
            <button id="skip-break" onClick={skipBreak}>
              Skip Break
            </button>
          </p>
        }
        <p>
          <button id="reset" onClick={handleResetButtonClick}>Reset</button>
        </p>

      </div>
      <div>
        {workCounter > 0 && !isStarted &&
          <p>Yay! You've completed {workCounter} work timer{workCounter > 1 ? "s." : "."}</p>
        }
        {breakCounter > 0 && !isStarted &&
          <p>And you're not "all-work-and-no-play" with {breakCounter} completed break{breakCounter > 1 ? "s." : "."}</p>
        }
      </div>
      <Router>
        <Switch>
          {/* <Route exact path="/" component={Home} /> */}
          <Route exact path="/quotes" component={Quotes} />
          <Route exact path="/admin" component={QuoteAdmin} />
        </Switch>
      </Router>
      <audio id="alarm" ref={audioElement}>
        <source src="https://www.soundjay.com/misc/sounds/magic-chime-01.mp3" />
      </audio>
    </div>
  );
}

export default App;
