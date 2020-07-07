import React, { useState } from "react";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import { useEffect } from "react";

momentDurationFormatSetup(moment);

const Countdown = ({ breakTime, workTime }) => {
  const [currentTimerType, setCurrentTimerType] = useState("Work");
  const [intervalId, setIntervalId] = useState(null);
  const [countdown, setCountdown] = useState(workTime);

  // Change countdown when workTime changes
  useEffect(() => {
    setCountdown(workTime);
  }, [workTime]);

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

  const formattedCountdown = moment
    .duration(countdown, "s")
    .format("mm:ss", { trim: false });
  return (
    <div>
      <p id="timer-label">{currentTimerType}</p>
      <p>{formattedCountdown}</p>

      <button onClick={handleStartStopClick}>
        {isStarted ? "Stop" : "Start"}
      </button>
    </div>
  );
};

export default Countdown;
