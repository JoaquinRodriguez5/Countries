import React from 'react';
import { Link } from 'react-router-dom';
import ActivityForm from './ActivityForm';
import ActivityButton from './ActivityButton';
import './Activity.css';

const ActivityPage = () => {
  return (
    <div className="activity-page">
      <h1>Crear una actividad turística</h1>
      <ActivityForm />
      <ActivityButton />
      <Link to="/home">
        <button className='home-button'>Home</button>
      </Link>
    </div>
  );
};

export default ActivityPage;