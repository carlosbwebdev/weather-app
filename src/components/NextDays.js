import React, { useState, useEffect } from 'react';

const NextDays = () => {
  const [weather, setWeather] = useState('');
  const [dayOneTemp, setDayOneTemp] = useState('');
  const [dayTwoTemp, setDayTwoTemp] = useState('');
  const [dayThreeTemp, setDayThreeTemp] = useState('');
  const [dayOneWeather, setDayOneWeather] = useState('');
  const [dayTwoWeather, setDayTwoWeather] = useState('');
  const [dayThreeWeather, setDayThreeWeather] = useState('');

  useEffect(() => {
    const getWeather = async (lat, lon) => {
      //   const res = await fetch(
      //     `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&lang=pt&exclude=current,minutely,hourly,alerts&units=metric&appid=901da5ef428d43a8b4abb585d4aa1406`
      //   );
      const res = await fetch(
        'https://api.openweathermap.org/data/2.5/onecall?lat=38.9954378&lon=-9.1411938&lang=pt&exclude=current,minutely,hourly,alerts&units=metric&appid=901da5ef428d43a8b4abb585d4aa1406'
      );

      const data = await res.json();
      setWeather(data);
      console.log(data);
      //console.log(data.daily[0].weather[0]);
      //console.log(data.daily[0].temp);
      setDayOneTemp(data.daily[0].temp);
      setDayTwoTemp(data.daily[1].temp);
      setDayThreeTemp(data.daily[2].temp);
      setDayOneWeather(data.daily[0].weather[0]);
      setDayTwoWeather(data.daily[0].weather[0]);
      setDayThreeWeather(data.daily[0].weather[0]);
    };
    getWeather();
  }, []);

  const today = new Date();
  let today2 = new Date(today);
  today2.setDate(today2.getDate() + 1);
  let today3 = new Date(today2);
  today3.setDate(today3.getDate() + 1);
  let today4 = new Date(today3);
  today4.setDate(today4.getDate() + 1);

  const tomorrow = today2.toString;

  //   console.log(today2);
  //   console.log(today3);
  //   console.log(today4);
  return (
    <div>
      <h2>Proximos dias</h2>

      <section>
        <div>
          <h3>{new Date(today2).toISOString().split('T')[0]}</h3>
          <img
            src={`https://openweathermap.org/img/wn/${dayOneWeather.icon}@2x.png`}
            alt=""
          />
          <p>{dayOneWeather.description}</p>
          <p>T. Máxima: {dayOneTemp.max} Cº</p>
          <p>T. Mínima:{dayOneTemp.min} Cº</p>
        </div>
      </section>
    </div>
  );
};

export default NextDays;
