import React from "react";

const Stats = ({ workCounter, isStarted, breakCounter }) => {
  return (
    <section className="section">
      {workCounter > 0 && !isStarted && (
        <div className="tile is-child box notification is-info">
          <div className="content is-medium">
            <p>
              Yay! You finished {workCounter} work timer
              {workCounter > 1 ? "s." : "."}
            </p>
            {breakCounter > 0 && !isStarted && (
              <p>
                And you let your brain rest with {breakCounter} break
                {breakCounter > 1 ? "s." : "."}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Stats;
