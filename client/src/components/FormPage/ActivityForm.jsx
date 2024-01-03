import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Activity.css';

const ActivityForm = () => {

  const [name, setName] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [duration, setDuration] = useState('');
  const [season, setSeason] = useState('');
  const [countries, setCountries] = useState([]);
  const [allCountries, setAllCountries] = useState([]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  const handleSeasonChange = (event) => {
    setSeason(event.target.value);
  };

  const handleCountriesChange = (event) => {
    const selectedOptions = event.target.selectedOptions;
    const selectedCountries = [];
    for (let option of selectedOptions) {
      selectedCountries.push(option.value);
    }
    setCountries(selectedCountries);
  };

  const fetchCountries = async () => {
    const response = await axios.get("http://localhost:5000/countries");
    setAllCountries(response.data.map(country => country.name));
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const seasons = ["Primavera", "Verano", "Otoño", "Invierno"];

  return (
    <div className="activity-form">
      <label htmlFor="name">Nombre:</label>
      <input type="text" id="name" name="name" value={name} onChange={handleNameChange} />
      <label htmlFor="difficulty">Dificultad:</label>
      <select id="difficulty" name="difficulty" value={difficulty} onChange={handleDifficultyChange}>
        <option value="">Selecciona una dificultad</option>
        <option value="Fácil">Fácil</option>
        <option value="Media">Media</option>
        <option value="Difícil">Difícil</option>
      </select>
      <label htmlFor="duration">Duración:</label>
      <select id="duration" name="duration" value={duration} onChange={handleDurationChange}>
        {[...Array(24).keys()].map(number => (
        <option key={number} value={number + 1}>{number + 1}</option>
        ))}
        </select>
        <label htmlFor="season">Temporada:</label>
        <select id="season" name="season" value={season} onChange={handleSeasonChange}>
            {seasons.map(season => (
            <option key={season} value={season}>{season}</option>
            ))}
            </select>
      <label htmlFor="countries">Países:</label>
      <select id="countries" name="countries" value={[...countries]} onChange={handleCountriesChange} multiple={true}>
      {allCountries.map((country, index) => (
      <option key={index} value={country.common}>{country.common}</option>
      ))}
      </select>
    </div>
  );
};

export default ActivityForm;