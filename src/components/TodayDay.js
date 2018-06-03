import React from 'react';

const TodayDay = props => {
  return (
    <div className="today today-day">
      <h3>{props.todayName}</h3>
      <p>{props.currentDescription}</p>
      <div className="today-temp temp-high">{props.todayHigh}°</div>
      <div className="today-temp temp-low">{props.todayLow}°</div>
    </div>
  );
};

export default TodayDay;
