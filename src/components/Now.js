import React from 'react';

const Now = props => {
  return (
    <div className="now">
      <div className="now-main">
        <div className="now-temp">{Math.round(props.currentTemp)}</div>

        <div className="icon-wrap">
          <img
            className="icon now-icon"
            src={require(`../icons/weather-icons/${
              props.isNight(new Date().getHours()) ? 'nt_' : ''
            }${props.currentIcon}.png`)}
            alt="Icon depicting current weather"
          />

          {/* windy overlay if 'gust' speed for current observation is high */}
          {props.currentWindSpeed > props.windThreshhold ? (
            <img
              className="icon now-icon icon-overlay"
              src={require(`../icons/weather-icons/windy.png`)}
              alt="Weather at the hour"
            />
          ) : (
            ''
          )}
        </div>
      </div>
      <div>{props.currentDescription}</div>
    </div>
  );
};

export default Now;
