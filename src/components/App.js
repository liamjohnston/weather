import React, { Component } from 'react';

import Now from './Now';
import Hour from './Hour';
import FutureDay from './FutureDay';

const API_KEY = 'b3594d788adca712';
const ROOT_URL = 'http://api.wunderground.com/api/';
//const tempSymbol = '°';
const windThreshhold = 35; //if >, show windy icon

class App extends Component {
  constructor() {
    super();
    this.nightPrefix = this.nightPrefix.bind(this);
    this.dayOrNightMode = this.dayOrNightMode.bind(this);
  }

  componentWillMount() {
    this.fetchWeather();
  }

  state = {
    hourly: [],
    forecast: [],
    isLoading: true
  };

  nightPrefix(hour) {
    if (hour < this.state.sunRise || hour > this.state.sunSet) {
      return 'nt_';
    } else {
      return '';
    }
  }

  dayOrNightMode(hour) {
    if (hour < this.state.sunRise || hour > this.state.sunSet) {
      return 'nightMode';
    } else {
      return 'dayMode';
    }
  }

  fetchWeather = async () => {
    try {
      const res = await fetch(
        `${ROOT_URL}${
          API_KEY
        }/geolookup/conditions/forecast10day/hourly/astronomy/q/NZ/Wellington.json`
      );

      const weather = await res.json();

      this.setState({
        currentTemp: weather.current_observation.temp_c,
        currentDescription:
          weather.forecast.txt_forecast.forecastday[0].fcttext_metric,
        currentIcon: weather.current_observation.icon,
        currentWindSpeed: weather.current_observation.wind_kph,
        sunRise: parseInt(weather.moon_phase.sunrise.hour, 10),
        sunSet: parseInt(weather.moon_phase.sunset.hour, 10),
        hourly: weather.hourly_forecast.slice(0, 24),
        //don't need all 10 days worth, or today
        forecast: weather.forecast.simpleforecast.forecastday.slice(1, 5)
      });
    } catch (e) {
      this.setState({ err: e.message });
    }
  };

  render() {
    if (!this.state.hourly.length) {
      return <div className="loader" />;
    } else {
      return (
        <div className={`wrap ${this.dayOrNightMode(new Date().getHours())}`}>
          <Now
            nightPrefix={this.nightPrefix}
            windThreshhold={windThreshhold}
            {...this.state}
          />

          <div className="hourly">
            <div className="hours-wrap">
              {this.state.hourly.map(hour => (
                <Hour
                  key={hour.FCTTIME.epoch}
                  nightPrefix={this.nightPrefix}
                  windThreshhold={windThreshhold}
                  {...hour}
                />
              ))}
            </div>
          </div>
          <div className="future">
            {this.state.forecast.map(day => (
              <FutureDay key={day.date.day} {...day} />
            ))}
          </div>
        </div>
      );
    }
  }
}

export default App;
