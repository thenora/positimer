import React from "react";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

momentDurationFormatSetup(moment);

const Countdown = ({
  handleStartStopClick,
  timerLabel,
  countdown,
  startStopButtonLabel,
}) => {
  const formattedCountdown = moment
    .duration(countdown, "s")
    .format("mm:ss", { trim: false });
  return (
    <div>
      <p id="timer-label">{timerLabel}</p>
      <p>{formattedCountdown}</p>

      <button onClick={handleStartStopClick}>{startStopButtonLabel}</button>
    </div>
  );
};

export default Countdown;
