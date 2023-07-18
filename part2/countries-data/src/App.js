import { useEffect, useState } from "react";
import axios from "axios";

const FindCountry = ({ searchTerm, handleSearch }) => {
  return (
    <div>
      find countries
      <input value={searchTerm} onChange={handleSearch}></input>
    </div>
  );
};

const CountryDetails = ({ singleCountry }) => {
  const [weather, setWeather] = useState({});
  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const getWeather = () => {
      axios
        .get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${singleCountry.capital[0]}&limit=5&appid=${api_key}`
        )
        .then((response) => {
          const lat = response.data[0].lat;
          const lon = response.data[0].lon;

          axios
            .get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`
            )
            .then((response) => {
              const weatherData = response.data;
              const iconSRC = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
              setWeather({
                temp: weatherData.main.temp,
                icon: iconSRC,
                wind: weatherData.wind.speed,
              });
            });
        });
    };

    getWeather();
  }, [singleCountry, api_key]);

  console.log(weather);

  return (
    <div>
      <h1>{singleCountry.name.common}</h1>
      <p>capital: {singleCountry.capital[0]}</p>
      <p>area: {singleCountry.area}</p>

      <h3>languages</h3>
      <ul>
        {Object.values(singleCountry.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={singleCountry.flags.png} alt="State flag"></img>
      <h1>Weather in {singleCountry.capital[0]}</h1>
      <p>temperature {weather.temp} Celcius</p>
      <img src={weather.icon} alt="Icon of current weather"></img>
      <p>wind {weather.wind} m/s</p>
    </div>
  );
};

const MultipleCountries = ({ singleCountry }) => {
  const [ifShow, setIfShow] = useState(false);

  const handleShow = () => {
    setIfShow(!ifShow);
  };

  return (
    <div>
      {singleCountry.name.common}
      <button onClick={handleShow}>{ifShow ? "Hide" : "Show"}</button>
      {ifShow ? (
        <CountryDetails singleCountry={singleCountry}></CountryDetails>
      ) : null}
    </div>
  );
};

const ShowData = ({ matchedCountries }) => {
  const matchedNumber = matchedCountries.length;

  if (matchedNumber > 10) {
    return <p>Too man matches, specify another filter</p>;
  } else if ((matchedNumber > 1) & (matchedNumber < 10)) {
    return matchedCountries.map((country) => (
      <MultipleCountries
        key={country.name.common}
        singleCountry={country}
      ></MultipleCountries>
    ));
  } else if (matchedNumber === 1) {
    const singleCountry = matchedCountries[0];

    return <CountryDetails singleCountry={singleCountry}></CountryDetails>;
  }
};

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [matchedCountries, setMatchedCountries] = useState([]);

  const countriesURL = "https://studies.cs.helsinki.fi/restcountries/api/";

  const handleSearch = (event) => {
    const loweredInput = event.target.value.toLowerCase();
    setSearchTerm(loweredInput);

    axios.get(`${countriesURL}all`).then((response) => {
      const allCountries = response.data;
      const matchedCountries = allCountries.filter((country) =>
        country.name.common.toLowerCase().includes(loweredInput)
      );

      setMatchedCountries(matchedCountries);
    });
  };

  return (
    <div>
      <FindCountry
        searchTerm={searchTerm}
        handleSearch={handleSearch}
      ></FindCountry>

      <br></br>

      <ShowData matchedCountries={matchedCountries}></ShowData>
    </div>
  );
}

export default App;
