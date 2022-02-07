import React, { useState, useEffect } from 'react';

const Weather = () => {
  const [locationName, setLocationName] = useState('');
  const [local, setLocal] = useState('');
  const [weather, getWeather] = useState({});
  const [cordinates, getCoordinates] = useState('');
  const [icon, setIcon] = useState('');
  const [latUser, setLatUser] = useState('');
  const [lonUser, setLonUser] = useState('');
  const [userInput, setUserInput] = useState(local || null);

  navigator.geolocation.getCurrentPosition(function (position) {
    setLatUser(position.coords.latitude);
    setLonUser(position.coords.longitude);
  });

  useEffect(() => {
    //? Get Weather base on Coordinates

    const getLocationName = async (lat, lon) => {
      try {
        const res = await fetch(
          `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=901da5ef428d43a8b4abb585d4aa1406`
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
          `http://api.openweathermap.org/geo/1.0/direct?q=${Input},&limit=5&appid=901da5ef428d43a8b4abb585d4aa1406`
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
    //? Get Weather base on Coordinates

    const checkWeather = async (lat, lon) => {
      try {
        const res = await fetch(
          `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=901da5ef428d43a8b4abb585d4aa1406`
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

  return (
    <div>
      <h1>Meteorologia</h1>
      <p></p>
      <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
      <p>A sua Localização: {locationName.name}</p>
      {/* <p>Localização Procurada: {weather.name}</p> */}
      <p>Temperatura: {weather.main?.temp} Cº</p>
      <p>T. Máxima: {weather.main?.temp_max} Cº</p>
      <p>T. Minima: {weather.main?.temp_min} Cº</p>
      <p>Humidade: {weather.main?.humidity} Cº</p>

      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
    </div>
  );
};

export default Weather;
