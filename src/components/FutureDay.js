import React from 'react';

class FutureDay extends React.Component {
  directionStyle(degs) {
    return {
      transform: `rotate(${degs - 180}deg)`
    };
  }

  render() {
    return (
      <div className="future-day" key={this.props.date.day}>
        <div className="future-day-name">{this.props.date.weekday_short}</div>
        <div className="future-day-icon">
          <img
            className="icon future-icon"
            src={require(`../icons/weather-icons/${this.props.icon}.png`)}
            alt="Icon depicting future weather"
          />
        </div>
        <div className="future-day-part">
          <div className="future-high">{this.props.high.celsius}</div>
          <div className="future-low">{this.props.low.celsius}</div>
        </div>
        <div className="future-day-part">
          <span className="units">{this.props.maxwind.dir}</span>
          <div
            className="future-direction"
            style={this.directionStyle(this.props.maxwind.degrees)}
          >
            &#8679;
          </div>
          <div>
            {this.props.maxwind.kph}
            <span className="units"> kph</span>
          </div>
        </div>
      </div>
    );
  }
}

export default FutureDay;
