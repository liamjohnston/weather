import React from 'react';

const TodayNight = props => {
  return (
    <div className="today">
      <h3>{props.todayName} night</h3>
      <p>{props.currentDescription}</p>
    </div>
  );
};

export default TodayNight;
