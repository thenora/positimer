import React from "react";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

momentDurationFormatSetup(moment);

const Countdown = ({
  handleStartStopClick,
  timerLabel,
  countdown,
  startStopButtonLabel,
  isStarted,
  skipBreak,
  handleResetButtonClick,
}) => {
  const formattedCountdown = moment
    .duration(countdown, "s")
    .format("mm:ss", { trim: false });

  return (
    <div className="">
      <p className="timer-label">
        {timerLabel === "Work"
          ? "Let's get to work!"
          : "You earned this break!"}
      </p>
      <p className="clock">{formattedCountdown}</p>

      <button
        className="button is-primary is-large"
        onClick={handleStartStopClick}
      >
        {startStopButtonLabel}
      </button>
      {/* ? Do I change skip button to link? */}
      {!isStarted && timerLabel === "Break" && (
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
  );
};

export default Countdown;
