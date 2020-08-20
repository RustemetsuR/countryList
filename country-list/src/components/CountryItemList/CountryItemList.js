import React from 'react';
import './CountryItemList.css';

const CountryItemList = props => {
    
    return (
        <div className="country-item-list" onClick={props.clicked}>
            <img alt="flag" className='country-flag-item-list' src={props.flag}/>
            <h3 className="country-name-item-list">{props.name}</h3>
        </div>
    );
};


export default CountryItemList;