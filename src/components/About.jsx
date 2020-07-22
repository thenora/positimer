import React, { Fragment } from "react";

export default function About() {
  return (
    <Fragment>
      <div className="section">
        <div className="container content">
          <div className="box cta">
            <h1>About Positimer</h1>
            <p className="has-text-centered text">
              Positimer is a pomodoro-style timer with a focus on positivity.
              This is a pet project created as part of Ada Developer's Academy
              because I couldn't find the encouraging work/break timer I wanted
              to help with motivation and focus.
            </p>
            <p className="has-text-centered text">
              I currently have no plans to monetize this, and any information
              you provide will not be sold. Your feedback and any information
              gathered from your use will be only to help Positimer improve.
            </p>
            <p className="has-text-centered text">
              Please contact me at positimer @ gmail . com with any questions or
              suggestions.
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
