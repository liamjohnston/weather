import React, { Component } from 'react';

import Now from './Now';
import Hour from './Hour';
import FutureDay from './FutureDay';

const API_KEY = 'b3594d788adca712';
const ROOT_URL = 'http://api.wunderground.com/api/';

//wind threshholds
const wind_vstrong = 45;
const wind_strong = 35; //if >, overlay a windy icon
const wind_medium = 20;
//const wind_light = 10;

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

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

  getDayName(dateEpoch) {
    const d = new Date(parseFloat(dateEpoch * 1000));
    return days[d.getDay()];
  }

  fetchWeather = async () => {
    this.setState({ isLoading: true });
    try {
      const res = await fetch(
        `${ROOT_URL}${API_KEY}/geolookup/conditions/forecast10day/hourly/astronomy/q/NZ/Wellington.json`
      );

      const weather = await res.json();

      //shortener helpers
      const current = weather.current_observation;
      const forecast = weather.forecast;

      this.setState({
        currentTemp: current.feelslike_c, //temp_c,
        currentSummary: current.weather,
        currentDescription: forecast.txt_forecast.forecastday[0].fcttext_metric,
        todayHigh: forecast.simpleforecast.forecastday[0].high.celsius,
        todayLow: forecast.simpleforecast.forecastday[0].low.celsius,
        todayName: this.getDayName(current.observation_epoch),
        currentIcon: current.icon,
        currentWindSpeed: current.wind_gust_kph,
        sunRise: parseInt(weather.moon_phase.sunrise.hour, 10),
        sunSet: parseInt(weather.moon_phase.sunset.hour, 10),
        hourly: weather.hourly_forecast.slice(0, 30),
        //don't need all 10 days worth, or today
        forecast: forecast.simpleforecast.forecastday.slice(1, 6),
        time: current.local_time_rfc822
      });
    } catch (e) {
      this.setState({ err: e.message });
    }
    this.setState({ isLoading: false });
  };

  render() {
    if (this.state.isLoading) {
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
              windThreshhold={wind_strong}
              windVStrong={wind_vstrong}
              windStrong={wind_strong}
              windMedium={wind_medium}
              fetchWeather={this.fetchWeather}
              {...this.state}
            />
            <div className="hourly">
              <div className="hours-wrap">
                {this.state.hourly.map(hour => (
                  <Hour
                    key={hour.FCTTIME.epoch}
                    isNight={this.isNight}
                    windThreshhold={wind_strong}
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
              &amp;{' '}
              <span role="img" aria-label="atom emoji">
                ⚛️
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
