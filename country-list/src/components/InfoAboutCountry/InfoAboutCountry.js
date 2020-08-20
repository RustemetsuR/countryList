import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import './InfoAboutCountry.css';

const countryInfoByCodeUrl = 'https://restcountries.eu/rest/v2/alpha/';

const InfoAboutCountry = props => {
    const [country, setCountry] = useState(null);
    let bordersCodes = []
    const [bordersNames, setBordersNames] = useState([]);

    const fetchData = useCallback(async () => {
        if (props.alpha3Code !== null) {
            const countryResponse = await axios.get(countryInfoByCodeUrl + props.alpha3Code);
            setCountry(countryResponse.data);
            bordersCodes = [];
            for (let i = 0; i < countryResponse.data.borders.length; i++) {
                bordersCodes.push(countryResponse.data.borders[i]);
            }
            const bordersNames = [];
            for (let i = 0; i < bordersCodes.length; i++) {
                const countryBorderName = await axios.get(countryInfoByCodeUrl + bordersCodes[i]);
                bordersNames.push(countryBorderName.data.name);
            }
            setBordersNames(bordersNames);
        }
    }, [props.alpha3Code]);

    useEffect(() => {
        fetchData().catch(console.error);
    }, [props.alpha3Code]);

    return (
        <>
            {country ?
                <div className="info-block">
                    <h2 className="country-name info-text">{country.name}</h2>
                    <p className="capital info-text">Capital : {country.capital}</p>
                    <p className="population info-text">Population : {country.population} people</p>
                    <p className="area info-text">Area : {country.area} km²</p>
                    <p className="language info-text">Language : {country.languages[0].name}</p>
                    <img className="flag info-text" alt="flag" src={country.flag} />

                    <p className="borders info-text">Borders with :</p>
                    <ul>
                        {bordersNames.map(border => {
                            return <li key={border}>{border}</li>
                        })}
                    </ul>
                </div> :
                <div>
                    <h1 className="choose-text">Choose the country</h1>
                </div>}
        </>
    )

};


export default InfoAboutCountry;