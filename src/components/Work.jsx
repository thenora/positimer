import React from "react";
import moment from "moment";

const Work = ({
  workTime,
  lowerWorkTimeByOneMinute,
  raiseWorkTimeByOneMinute,
}) => {
  const workTimeInMinutes = moment.duration(workTime, "s").minutes();

  return (
    <div>
      <p id="work-label">Work</p>
      <p id="work-time">{workTimeInMinutes}</p>
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
