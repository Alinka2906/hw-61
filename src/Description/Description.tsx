import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Types} from "../../types";
import './Description.css';

interface Props {
  country: Types[];
}

const COUNTRY_URL = 'https://restcountries.eu/rest/v2/alpha/';

const Description:React.FC<Props> = ({country}) => {
  const [borders, setBorders] = useState<Types[]>([]);

  useEffect(() => {
    if(country !== null) {
      const getCountryBorders = async () => {
        const promises = country.borders.map(async border => {
          const borderResponse = await axios.get(COUNTRY_URL + border);
          if (borderResponse.data !== null) {
            return borderResponse.data.name;
          }
        });
        const newBorders = await Promise.all(promises)
        setBorders(newBorders)
      }
      getCountryBorders().catch(console.error);
    }
  }, [country])
  return country && (
    <>
      <div className="full-info">
        <div className="flag-img">
          <img src={country.img} alt="flag"/>
        </div>
        <h3>{country.name}</h3>
        <p>
          <span>Borders: </span>
          {borders.length !== 0 ? borders.join(', ') : 'Does not border with other countries'}
        </p>
        <p>
          <span>Country: </span>
          {country.capital}
        </p>
        <p>
          <span>Population: </span>
          {country.population}
        </p>
      </div>
    </>
  );
};

export default Description;