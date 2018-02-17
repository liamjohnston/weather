import React from 'react';

const TodayNight = props => {
  return (
    <div className="today today-night">
      <p>
        <strong>Tonight</strong>
        <br />
        {props.currentDescription}
      </p>
    </div>
  );
};

export default TodayNight;
