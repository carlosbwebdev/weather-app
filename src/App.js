import './App.css';
import Weather from './components/Weather';

function App() {
  return (
    <div>
      <div>
        <Weather />
      </div>
    </div>
  );
}

/*


https://api.openweathermap.org/data/2.5/onecall?lat=38.9954378&lon=-9.1411938&exclude=current&minutely&appid=901da5ef428d43a8b4abb585d4aa1406

*/

export default App;
