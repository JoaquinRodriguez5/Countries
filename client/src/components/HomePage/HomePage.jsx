import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Card from '../Card/Card';
import Filter from './Filter';
import Sorter from './Sorter';
import Paginator, { calculatePages } from './Paginator';
import { Link } from 'react-router-dom';
import './Home.css';

const HomePage = () => {
    const dispatch = useDispatch();
    const countries = useSelector(state => state.countries);
    const [filter, setFilter,] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortCriteria, setSortCriteria] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const limit = 10;
    const handlePageChange = ({ selected }) => {
      setCurrentPage(selected);
    };
    const handleSort = (value) => {
      setSortCriteria(value);
    };
    const sortCountries = (countries, criteria) => {
      const sortedCountries = [...countries];
      sortedCountries.sort((a, b) => {
        switch (criteria) {
          case 'Nombre ascendente':
            return a.name.common.localeCompare(b.name.common);
          case 'Nombre descendente':
            return b.name.common.localeCompare(a.name.common);
          case 'Población ascendente':
            return a.population - b.population;
          case 'Población descendente':
            return b.population - a.population;
          default:
            return 0;
        }
      });
      return sortedCountries;
    };
  
    useEffect(() => {
      const fetchCountries = async () => {
        const response = await axios.get('http://localhost:5000/countries');
        if (filter === '') {
          dispatch({ type: 'SET_COUNTRIES', payload: response.data });
        } else {
          const filteredCountries = response.data.filter(country => country.region === filter);
          dispatch({ type: 'SET_COUNTRIES', payload: filteredCountries });
        }
      };
      fetchCountries(filter);
    }, [dispatch, filter]);
    const filteredCountries = countries.filter(country =>
      country.name.common.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    const totalPages = calculatePages(filter);
  
    return (
      <div className="home-page">
        <input type="text" placeholder="Buscar países por nombre" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        <Filter filterBy={setFilter} options={['Africa', 'Asia', 'Europe', 'Americas', 'Oceania']} />
        <Sorter sortBy={handleSort} options={['Nombre ascendente', 'Nombre descendente', 'Población ascendente', 'Población descendente']} />
        <div className='activity-button'><Link to="/activity"><button>Activity</button></Link></div>
        <div className="countries-list">
        {sortCountries(filteredCountries, sortCriteria).slice(currentPage * limit, (currentPage + 1) * limit).map((country) => (
            <Card key={country.cca3} country={country} />
          ))}
        </div>
        <Paginator countries={filteredCountries} limit={limit} currentPage={currentPage} onPageChange={handlePageChange} totalPages={totalPages} filter={filter} />
      </div>
    );
  };
  
  export default HomePage;