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
      <div className="container">
        <h3 className="work-label">How long should your work timer be?</h3>
        <p className="work-time">{workTimeInMinutes}</p>
        <button className="button is-secondary is-small work-lower" onClick={lowerWorkTimeByOneMinute}>
          -
        </button>
        <button className="button is-secondary is-small work-raise" onClick={raiseWorkTimeByOneMinute}>
          +
        </button>
      </div>
    </section>
  );
};

export default Work;
