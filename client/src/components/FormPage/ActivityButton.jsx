import React from 'react';
import axios from 'axios';
import './Activity.css';

const ActivityButton = () => {
  const handleSubmit = () => {
    const name = document.getElementById("name").value;
    const difficulty = document.getElementById("difficulty").value;
    const duration = document.getElementById("duration").value;
    const season = document.getElementById("season").value;
    const countries = document.getElementById("countries").value;
    const activity = {
      name,
      difficulty,
      duration,
      season,
      countries,
    };
    axios
      .post("http://localhost:5000/activities", activity)
      .then((response) => {
        alert("La actividad se creó correctamente");
      })
      .catch((error) => {
        alert("Ocurrió un error al crear la actividad");
      });
  };

  return (
    <div className="activity-button">
      <button onClick={handleSubmit}>Crear actividad</button>
    </div>
  );
};

export default ActivityButton;