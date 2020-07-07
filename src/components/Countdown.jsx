import React, { useState } from "react";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import { useEffect } from "react";

momentDurationFormatSetup(moment);

const Countdown = ({ workTime }) => {
  const [intervalId, setIntervalId] = useState(null);
  const [countdown, setCountdown] = useState(workTime);

  // Change countdown when workTime changes
  useEffect(() => {
    setCountdown(workTime);
  }, [workTime]);

  const isStarted = intervalId != null;
  const handleStartStopClick = () => {
    if (isStarted) {
      // if timer is started
      // we want to stop and clear
      clearInterval(intervalId);
      setCountdown(workTime);
      setIntervalId(null);
      // TODO - set so stopping the timer resets it instead of pauses
    } else {
      // if timer is stopped:
      // lower countdown for each second
      // 1000 ms is 1 second
      const newIntervalId = setInterval(() => {
        setCountdown((prevCountdown) => {
          const newCountdown = prevCountdown - 1;
          if (newCountdown >= 0) {
            return prevCountdown - 1;
          }
          return prevCountdown;
        });
      }, 1000);
      setIntervalId(newIntervalId);
    }
  };

  const formattedCountdown = moment
    .duration(countdown, "s")
    .format("mm:ss", { trim: false });
  return (
    <div>
      <p>{formattedCountdown}</p>
      <button onClick={handleStartStopClick}>
        {isStarted ? "Stop" : "Start"}
      </button>
    </div>
  );
};

export default Countdown;
