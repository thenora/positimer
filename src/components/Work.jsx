import React from "react";
import moment from "moment";

const Work = ({
  workTime,
  lowerWorkTimeByOneMinute,
  raiseWorkTimeByOneMinute,
}) => {
  const workTimeInMinutes = moment.duration(workTime, "s").asMinutes();

  return (
    <section className="section">
      <div className="container content is-medium">
        <p className="work-label">How long should your work timer be?</p>
        <p className="work-time">{workTimeInMinutes}</p>
        <button
          className="button is-secondary is-medium work-lower"
          onClick={lowerWorkTimeByOneMinute}
        >
          -
        </button>
        <button
          className="button is-secondary is-medium work-raise"
          onClick={raiseWorkTimeByOneMinute}
        >
          +
        </button>
      </div>
    </section>
  );
};

export default Work;
