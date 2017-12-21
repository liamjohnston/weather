import React, { Component } from 'react';

import Now from './Now';
import Hour from './Hour';
import FutureDay from './FutureDay';

const API_KEY = 'b3594d788adca712';
const ROOT_URL = 'http://api.wunderground.com/api/';
//const tempSymbol = '°';
const windThreshhold = 35; //if >, overlay a windy icon

class App extends Component {
  constructor() {
    super();
    this.isNight = this.isNight.bind(this);
  }

  componentWillMount() {
    this.fetchWeather();
  }

  state = {
    hourly: [],
    forecast: [],
    isLoading: true
  };

  isNight = hour => {
    if (hour < this.state.sunRise || hour > this.state.sunSet) {
      return true;
    } else {
      return false;
    }
  };

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
        currentWindSpeed: weather.current_observation.wind_gust_kph,
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
        <div>
          <div
            className={`wrap ${
              this.isNight(new Date().getHours()) ? 'nightMode' : 'dayMode'
            }`}
          >
            <Now
              isNight={this.isNight}
              windThreshhold={windThreshhold}
              {...this.state}
            />

            <div className="hourly">
              <div className="hours-wrap">
                {this.state.hourly.map(hour => (
                  <Hour
                    key={hour.FCTTIME.epoch}
                    isNight={this.isNight}
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
            <footer>
              Made with{' '}
              <span role="img" aria-label="heart emoji">
                ❤️
              </span>{' '}
              by <a href="http://liam.nz">Liam</a>
            </footer>
          </div>
        </div>
      );
    }
  }
}

export default App;
