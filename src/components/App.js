import React, { Component } from 'react';

import Hour from './Hour';
import FutureDay from './FutureDay';

const API_KEY = 'b3594d788adca712';
const ROOT_URL = 'http://api.wunderground.com/api/';
const tempSymbol = '°';
//const iconPath = '../icons/weather-icons/';

class App extends Component {
  state = {
    todayHourly: [],
    forecast: [],
    isLoading: true
  };

  componentWillMount() {
    this.fetchWeather();
  }

  fetchWeather = async () => {
    try {
      const res = await fetch(
        `${ROOT_URL}${
          API_KEY
        }/geolookup/conditions/forecast10day/hourly/q/NZ/Wellington.json`
      );

      const weather = await res.json();

      this.setState({
        currentTemp: weather.current_observation.temp_c,
        feelsLike: weather.current_observation.feelslike_c,
        currentDescription:
          weather.forecast.txt_forecast.forecastday[0].fcttext_metric,
        currentIcon: weather.current_observation.icon,
        currentWindDeg: weather.current_observation.wind_degrees,
        currentWindKph: weather.current_observation.wind_kph,
        currentWindDir: weather.current_observation.wind_dir,
        todayHigh: weather.forecast.simpleforecast.forecastday[0].high.celsius,
        todayHourly: weather.hourly_forecast,
        //don't need all 10 days worth, or today
        forecast: weather.forecast.simpleforecast.forecastday.slice(1, 5)
      });
    } catch (e) {
      this.setState({ err: e.message });
    }
  };

  render() {
    if (!this.state.todayHourly.length) {
      return <div className="loader" />;
    } else {
      return (
        <div className="wrap">
          <div className="now">
            <div className="now-temp" data-tempsymbol={tempSymbol}>
              {Math.round(this.state.currentTemp)}
            </div>

            <img
              className="icon now-icon"
              src={require(`../icons/weather-icons/${
                this.state.currentIcon
              }.png`)}
              alt="Icon depicting current weather"
            />

            <div>{this.state.currentDescription}</div>
          </div>

          <div className="hourly">
            <div className="hours-wrap">
              {this.state.todayHourly.map(hour => (
                <Hour
                  key={hour.FCTTIME.epoch}
                  tempsymbol={tempSymbol}
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
