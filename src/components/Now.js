import React from 'react';

class Now extends React.Component {
  render() {
    return (
      <div className="now">
        <div className="now-main">
          <div className="now-temp">{Math.round(this.props.currentTemp)}</div>

          {/* windy override */}
          {this.props.currentWindSpeed > this.props.windThreshhold ? (
            <img
              className="icon now-icon"
              src={require(`../icons/weather-icons/windy.png`)}
              alt="Icon depicting current weather"
            />
          ) : (
            <img
              className="icon now-icon"
              src={require(`../icons/weather-icons/${this.props.nightPrefix(
                new Date().getHours()
              )}${this.props.currentIcon}.png`)}
              alt="Icon depicting current weather"
            />
          )}
        </div>
        <div>{this.props.currentDescription}</div>
      </div>
    );
  }
}

export default Now;
