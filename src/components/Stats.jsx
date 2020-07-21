import React from "react";

const Stats = ({
  workCounter,
  isStarted,
  breakCounter,
}) => {

  return (
    <section className="section">
      <div className="container">
        {workCounter > 0 && !isStarted && (
          <p>
            Yay! You've completed {workCounter} work timer
            {workCounter > 1 ? "s." : "."}
          </p>
        )}
        {breakCounter > 0 && !isStarted && (
          <p>
            And you know when to take a break! You took {breakCounter} break{breakCounter > 1 ? "s." : "."}
          </p>
        )}
      </div>
    </section>
  );
};

export default Stats;
