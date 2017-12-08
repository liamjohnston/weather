import React from 'react';

const Hour = props => {
  return (
    <div className="hourly-hour" key={props.FCTTIME.epoch}>
      <div>
        {/* helper label to know when a new day starts */}
        {props.FCTTIME.hour === '0' ? (
          <div className="nowrap">{props.FCTTIME.weekday_name_abbrev} →</div>
        ) : (
          <div>&nbsp;</div>
        )}
        {/* changes to 12hr time format, and replaces '0' with 12 at midnight */}
        {parseInt(props.FCTTIME.hour, 10) > 12
          ? parseInt(props.FCTTIME.hour, 10) - 12
          : parseInt(props.FCTTIME.hour, 10) === 0 ? 12 : props.FCTTIME.hour}
        {props.FCTTIME.ampm}
      </div>

      {/* windy override */}
      {props.wspd.metric > props.windThreshhold ? (
        <img
          className="icon today-icon"
          src={require(`../icons/weather-icons/windy.png`)}
          alt="Weather at the hour"
        />
      ) : (
        <img
          className="icon today-icon"
          src={require(`../icons/weather-icons/${props.nightPrefix(
            props.FCTTIME.hour
          )}${props.icon}.png`)}
          alt="Weather at the hour"
        />
      )}
      <div>{props.feelslike.metric}</div>
    </div>
  );
};

export default Hour;
