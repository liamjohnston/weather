import React from 'react';
import TodayDay from './TodayDay';
import TodayNight from './TodayNight';

const Now = props => {
  let windDesc = '';
  if (props.currentWindSpeed > props.windVStrong) {
    windDesc = 'gale force wind';
  } else if (props.currentWindSpeed > props.windStrong) {
    windDesc = 'strong wind';
  } else if (props.currentWindSpeed > props.windMedium) {
    windDesc = 'moderate wind';
  } else {
    windDesc = 'very little wind';
  }
  return (
    <div className="now">
      {/* <h2>
        {props.where.city}, {props.where.country}
      </h2> */}
      <div className="now-main">
        {!props.isNight(new Date().getHours()) ? (
          <TodayDay {...props} />
        ) : (
          <TodayNight {...props} />
        )}
        <hr />
        <div className="right-now">
          <div>
            Right now it's <strong>{Math.round(props.currentTemp)}°</strong> and{' '}
            <span className="text-lowercase">{props.currentSummary}</span>,{' '}
            {windDesc}.
          </div>
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
      </div>
    </div>
  );
};

export default Now;
