import React, { useState, useEffect }  from 'react';
import './App.css';
import axios from 'axios';
import CountryItemList from '../components/CountryItemList/CountryItemList';
import InfoAboutCountry from '../components/InfoAboutCountry/InfoAboutCountry';

const App = () =>{
  const allCountriesNameAndCodesUrl = 'https://restcountries.eu/rest/v2/all?fields=name%3Balpha3Code';

  const countryInfoByCodeUrl = 'https://restcountries.eu/rest/v2/alpha/';

  const [countriesInfo, setCountriesInfo] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      const countriesResponse = await axios.get(allCountriesNameAndCodesUrl);
      const promises = countriesResponse.data.map(async country => {
        const countryUrl = countryInfoByCodeUrl + country.alpha3Code;
        const countryResponse = await axios.get(countryUrl);
        return {
          ...countriesInfo,
          name: countryResponse.data.name,
          alpha3Code: countryResponse.data.alpha3Code,
          flag: countryResponse.data.flag,
          
        }
      });
      const newCountries = await Promise.all(promises);
      setCountriesInfo(newCountries);
      console.log(newCountries);
    }
    fetchData();
  }, []);
  return (
    <div className="App">
     <div className="container">
        <div className="boxes country-list">
          {countriesInfo.map(country => (
            <CountryItemList
              key={country.alpha3Code}
              name={country.name}
              flag={country.flag}
              clicked={() => setSelectedCountry(country.alpha3Code)}
            />
          ))}
        </div>
        <div className="boxes country-info">
          <InfoAboutCountry alpha3Code={selectedCountry} />
        </div>
      </div>
    </div>
  );
}

export default App;
