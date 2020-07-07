import React, { useState } from "react";

const Work = () => {
  const [workTime, setWorkTime] = useState(300); // time in seconds

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
    <div>
      <p id="work-label">Work</p>
      <p id="work-time">{workTime}</p>
      <button id="work-lower" onClick={lowerWorkTimeByOneMinute}>
        -
      </button>
      <button id="work-raise" onClick={raiseWorkTimeByOneMinute}>
        +
      </button>
    </div>
  );
};

export default Work;
