import React from 'react';

const Filter = ({ filterBy, options }) => {
  return (
    <div className="filter">
      <select
        onChange={(e) => {
          filterBy(e.target.value);
        }}
      >
        <option value="">Selecciona un continente</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;