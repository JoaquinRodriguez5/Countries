import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

const Card = ({ country }) => {
  return (
    <div className="country-card">
      <img src={country.flags.png} alt={`Bandera de ${country.name.common}`} />
      <h2>{country.name.common}</h2>
      <p>{country.region}</p>
      <Link to={`/countries/${country.cca3}`}>Ver detalles</Link>
    </div>
  );
};

export default Card;