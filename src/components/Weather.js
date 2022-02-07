import React, { useState, useEffect } from 'react';
import '../styles/weather.css';

const Weather = () => {
  const [locationName, setLocationName] = useState('');
  const [local, setLocal] = useState('');
  const [weather, getWeather] = useState({});
  const [cordinates, getCoordinates] = useState('');
  const [icon, setIcon] = useState('');
  const [latUser, setLatUser] = useState('');
  const [lonUser, setLonUser] = useState('');
  const [userInput, setUserInput] = useState(local || null);
  const [dayOneTemp, setDayOneTemp] = useState('');
  const [dayTwoTemp, setDayTwoTemp] = useState('');
  const [dayThreeTemp, setDayThreeTemp] = useState('');
  const [dayOneWeather, setDayOneWeather] = useState('');
  const [dayTwoWeather, setDayTwoWeather] = useState('');
  const [dayThreeWeather, setDayThreeWeather] = useState('');

  navigator.geolocation.getCurrentPosition(function (position) {
    setLatUser(position.coords.latitude);
    setLonUser(position.coords.longitude);
  });

  useEffect(() => {
    //? Get Weather base on Coordinates

    const getLocationName = async (lat, lon) => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=901da5ef428d43a8b4abb585d4aa1406`
        );

        if (!res.ok) {
          throw new Error(console.error(res.status));
        }
        const data = await res.json();
        setLocationName(data);
        setLocal(data.name);
      } catch (err) {
        console.error(err);
      }
    };
    getLocationName(latUser, lonUser);
    return;
  }, [latUser, lonUser]);

  useEffect(() => {
    const getCoord = async (Input) => {
      try {
        //! GET Coordinates
        const res = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${Input},&limit=5&appid=901da5ef428d43a8b4abb585d4aa1406`
        );

        if (!res.ok) {
          throw new Error(console.error(res.status));
        }
        const data = await res.json();
        getCoordinates(data);
      } catch (err) {
        console.error(`Wrong Location Inserted - ${err}`);
      }
    };
    getCoord(userInput);
  }, [userInput]);

  const latZone = cordinates[0]?.lat;
  const lonZone = cordinates[0]?.lon;

  useEffect(() => {
    const getWeather = async (lat, lon) => {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&lang=pt&exclude=current,minutely,hourly,alerts&units=metric&appid=901da5ef428d43a8b4abb585d4aa1406`
      );

      const data = await res.json();
      setDayOneTemp(data.daily[0].temp);
      setDayTwoTemp(data.daily[1].temp);
      setDayThreeTemp(data.daily[2].temp);
      setDayOneWeather(data.daily[0].weather[0]);
      setDayTwoWeather(data.daily[0].weather[0]);
      setDayThreeWeather(data.daily[0].weather[0]);
    };
    getWeather(latZone, lonZone);
  }, [latZone, lonZone]);

  useEffect(() => {
    //? Get Weather base on Coordinates

    const checkWeather = async (lat, lon) => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=901da5ef428d43a8b4abb585d4aa1406`
        );

        if (!res.ok) {
          throw new Error(console.error(res.status));
        }
        const data = await res.json();
        setIcon(data?.weather[0]?.icon);
        getWeather(data);
      } catch (err) {
        console.error(err);
      }
    };
    checkWeather(latZone, lonZone);
    return;
  }, [latZone, lonZone]);

  const today = new Date();
  let today2 = new Date(today);
  today2.setDate(today2.getDate() + 1);
  let today3 = new Date(today2);
  today3.setDate(today3.getDate() + 1);
  let today4 = new Date(today3);
  today4.setDate(today4.getDate() + 1);

  return (
    <main className="weather-main">
      <h1>Meteorologia</h1>

      <div className="section-center">
        <article className="today-weather-section">
          <p></p>
          <img
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt=""
          />
          <h3>
            {new Date()
              .toISOString()
              .split('T')[0]
              .split('-')
              .reverse()
              .join('-')}
          </h3>
          <p>{!userInput ? locationName.name : weather.name}</p>
          <p>Temperatura: {weather.main?.temp} Cº</p>
          <p>T. Máxima: {weather.main?.temp_max} Cº</p>
          <p>T. Mínima: {weather.main?.temp_min} Cº</p>
          <p>Húmidade: {weather.main?.humidity} Cº</p>

          <div className="input-section">
            <h3>Pesquisar</h3>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
          </div>
        </article>
        <article className="next-days-section">
          <section>
            <div>
              <h3>
                {new Date(today2)
                  .toISOString()
                  .split('T')[0]
                  .split('-')
                  .reverse()
                  .join('-')}
              </h3>
              <img
                src={`https://openweathermap.org/img/wn/${dayOneWeather.icon}@2x.png`}
                alt=""
              />
              <p className="next-days-desc">{dayOneWeather.description}</p>
              <p>T. Máxima: {dayOneTemp.max} Cº</p>
              <p>T. Mínima:{dayOneTemp.min} Cº</p>
            </div>
          </section>
          <section>
            <div>
              <h3>
                {new Date(today3)
                  .toISOString()
                  .split('T')[0]
                  .split('-')
                  .reverse()
                  .join('-')}
              </h3>
              <img
                src={`https://openweathermap.org/img/wn/${dayTwoWeather.icon}@2x.png`}
                alt=""
              />
              <p className="next-days-desc">{dayTwoWeather.description}</p>
              <p>T. Máxima: {dayTwoTemp.max} Cº</p>
              <p>T. Mínima:{dayTwoTemp.min} Cº</p>
            </div>
          </section>
          <section>
            <div>
              <h3>
                {new Date(today4)
                  .toISOString()
                  .split('T')[0]
                  .split('-')
                  .reverse()
                  .join('-')}
              </h3>
              <img
                src={`https://openweathermap.org/img/wn/${dayThreeWeather.icon}@2x.png`}
                alt=""
              />
              <p className="next-days-desc">{dayThreeWeather.description}</p>
              <p>T. Máxima: {dayThreeTemp.max} Cº</p>
              <p>T. Mínima:{dayThreeTemp.min} Cº</p>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
};

export default Weather;
