import React, { useState, useEffect, useRef, Fragment } from "react";
import Work from "/Users/thenora/Developer/capstone/positimer/src/components/Work";
import Break from "/Users/thenora/Developer/capstone/positimer/src/components/Break.jsx";
import Stats from "/Users/thenora/Developer/capstone/positimer/src/components/Stats";
import Countdown from "/Users/thenora/Developer/capstone/positimer/src/components/Countdown";
import ShowQuote from "/Users/thenora/Developer/capstone/positimer/src/components/ShowQuote";
import * as workerInterval from "worker-interval";

export default function Home() {
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
  }, [workTime, breakTime, currentTimerType]);

  useEffect(() => {
    if (workCounter === 4) {
      setBreakTime(1500);
    }
  }, [workCounter]);

  const lowerWorkTimeByOneMinute = () => {
    const newWorkTime = workTime - 60;

    if (newWorkTime < 0) {
      setWorkTime(0);
    } else if (newWorkTime === 0) {
      return;
    } else {
      setWorkTime(newWorkTime);
    }
  };

  const raiseWorkTimeByOneMinute = () => {
    const newWorkTime = workTime + 60;
    if (newWorkTime <= 60 * 60) {
      setWorkTime(newWorkTime);
    }
  };

  // if countdown is zero, change work to break or break to work
  useEffect(() => {
    if (countdown === 0) {
      audioElement.current.play();
      if (currentTimerType === "Work") {
        setWorkCounter(workCounter + 1);
        setCurrentTimerType("Break");
        setCountdown(breakTime);
        workerInterval.clearInterval(intervalId);
        setIntervalId(null);
      } else if (currentTimerType === "Break") {
        setBreakCounter(breakCounter + 1);
        setCurrentTimerType("Work");
        setCountdown(workTime);
        workerInterval.clearInterval(intervalId);
        setIntervalId(null);
      }
    }
  }, [
    breakTime,
    currentTimerType,
    workTime,
    countdown,
    intervalId,
    workCounter,
    breakCounter,
  ]);

  const handleStartStopClick = () => {
    if (isStarted) {
      // if timer is started
      // we want to stop and clear
      workerInterval.clearInterval(intervalId);
      setCountdown(workTime);
      setCurrentTimerType("Work");
      setIntervalId(null);
    } else {
      // if timer is stopped:
      // lower countdown for each second
      // 1000 ms is 1 second
      const newIntervalId = workerInterval.setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 100); // TODO reset to 1000
      setIntervalId(newIntervalId);
    }
  };

  const handleResetButtonClick = () => {
    // reset audio
    audioElement.current.load();
    // clear the countdown interval
    workerInterval.clearInterval(intervalId);
    setIntervalId(null);
    setCurrentTimerType("Work");
    // reset the workTime to 25 minutes
    setWorkTime(25 * 60);
    // reset the breakTime to 5
    setBreakTime(60 * 5);
    // reset the timer to 25 minutes (initial workTime)
    setCountdown(25 * 60);
  };

  const lowerBreakTimeByOneMinute = () => {
    const newBreakTime = breakTime - 60;
    if (newBreakTime < 0) {
      setBreakTime(0);
    } else if (newBreakTime === 0) {
      return;
    } else {
      setBreakTime(newBreakTime);
    }
  };

  const raiseBreakTimeByOneMinute = () => {
    const newBreakTime = breakTime + 60;
    if (newBreakTime <= 60 * 60) {
      setBreakTime(newBreakTime);
    }
  };

  const skipBreak = () => {
    workerInterval.clearInterval(intervalId);
    setCountdown(workTime);
    setCurrentTimerType("Work");
    setIntervalId(null);
  };

  return (
    <Fragment>
      <div className="columns">
        <div className="column timer-set">
          {console.log(process.env.REACT_APP_CLIENT_ID)}
          {!isStarted && currentTimerType === "Work" && (
            <Work
              workTime={workTime}
              lowerWorkTimeByOneMinute={lowerWorkTimeByOneMinute}
              raiseWorkTimeByOneMinute={raiseWorkTimeByOneMinute}
            />
          )}
          {!isStarted && currentTimerType === "Break" && (
            <Break
              breakTime={breakTime}
              breakCounter={breakCounter}
              lowerBreakTimeByOneMinute={lowerBreakTimeByOneMinute}
              raiseBreakTimeByOneMinute={raiseBreakTimeByOneMinute}
            />
          )}
        </div>
        <div className="column main card">
          <Countdown
            workTime={workTime}
            breakTime={breakTime}
            timerLabel={currentTimerType}
            handleStartStopClick={handleStartStopClick}
            startStopButtonLabel={isStarted ? "Stop" : "Start"}
            countdown={countdown}
            breakCounter={breakCounter}
          />
          {/* ? Do I change skip button to link? */}
          {!isStarted && currentTimerType === "Break" && (
            <p>
              <button
                className="button is-secondary is-medium skip-break"
                onClick={skipBreak}
              >
                Skip Break
              </button>
            </p>
          )}
          <p>
            <button
              className="button is-secondary is-medium reset"
              onClick={handleResetButtonClick}
            >
              Reset
            </button>
          </p>
        </div>
        <div className="column timer-info">
          {/* {isStarted && currentTimerType === "Work" && <ShowQuote />} */}

          {isStarted && currentTimerType === "Work" && (
            <ShowQuote />
          )}

          <Stats
            workCounter={workCounter}
            isStarted={isStarted}
            breakCounter={breakCounter}
          />
        </div>
      </div>
      <audio id="alarm" ref={audioElement}>
        <source src="https://www.soundjay.com/misc/sounds/magic-chime-01.mp3" />
      </audio>
    </Fragment>
  );
}
