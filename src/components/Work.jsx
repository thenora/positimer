import React from "react";
import moment from "moment";

const Work = ({
  workTime,
  lowerWorkTimeByOneMinute,
  raiseWorkTimeByOneMinute,
}) => {
  const workTimeInMinutes = moment.duration(workTime, "s").asMinutes();

  return (
    <div>
      <p id="work-label">How long should your work timer be?</p>
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
