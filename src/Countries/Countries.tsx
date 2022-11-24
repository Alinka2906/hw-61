import React, {useCallback, useEffect, useState} from 'react';
import axios from "axios";
import './Countries.css';
import Country from "../Country/Country";
import {Types} from "../../types";
import Description from "../Description/Description";

const URL = 'https://restcountries.com/v2/all?fields=alpha3Code,name';
const COUNTRY_URL = 'https://restcountries.com/v2/alpha/';

const Countries = () => {
  const [countries, setCountries] = useState<Types[]>([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const countriesResponse = await axios.get<Types[]>(URL);

      const promises = countriesResponse.data.map(async country => {
        const countryInfo = COUNTRY_URL + country.alpha3Code;
        const countryResponse = await axios.get<Types>(countryInfo);
        console.log(countryResponse)
        return {...country,
          capital : countryResponse.data.capital,
          borders: countryResponse.data.borders,
          img: countryResponse.data.flag,
          population: countryResponse.data.population
        };
      });
      const newCountry = await Promise.all(promises);
      setCountries(newCountry);
    };
    fetchData().catch(e => console.error(e));
  }, []);

  return (
    <>
      <div className="restCountries">
        <div className="countries">
          {countries.map(country => (
            <Country key={country.name} name={country.name} clicked={() => setSelectedCountry(country)}/>
          ))}
        </div>
        <section className="countriesInfo">
          <Description country={selectedCountry}/>
        </section>
      </div>
    </>
  );
};

export default Countries;