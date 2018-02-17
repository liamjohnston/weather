import React from 'react';

const TodayDay = props => {
  return (
    <div className="today today-day">
      <p>
        <strong>Today</strong>
        <br />
        {props.currentDescription}
      </p>
      <div className="today-temp temp-high">{props.todayHigh}°</div>
      <div className="today-temp temp-low">{props.todayLow}°</div>
    </div>
  );
};

export default TodayDay;
