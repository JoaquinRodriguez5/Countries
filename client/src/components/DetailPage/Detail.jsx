import React from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Detail.css';

const Detail = () => {
  const dispatch = useDispatch();
  const countries = useSelector(state => state.countries);
  const { id } = useParams();
  

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await axios.get(`http://localhost:5000/countries/`);
      dispatch({ type: 'SET_COUNTRIES', payload: response.data });
    };

    fetchCountries();
  }, [dispatch]);
  const country = countries.find(c => c.cca3 === id);
      return (
        <div className="detail">
          <Link to="/home"><button className="home-button">Home</button></Link>
            <div key={country.cca3}>
            <h2>ID: {country.cca3}</h2>
            <h2>Name: {country.name?.common}</h2>
            <img src={country.flags?.png} alt={country.name?.common}/>
            <h4>Continente: {country.region}</h4>
            <h4>Capitail: {country.capital}</h4>
            <h4>subregion: {country.subregion}</h4>
            <h4>Area: {country.area} Km <sup>2</sup></h4>
            <h4>Poblacion: {country.population}</h4>
        </div>
        </div>
      );
};

export default Detail;