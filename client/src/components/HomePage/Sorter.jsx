import React from 'react';

const Sorter = ({ sortBy, options }) => {
  return (
    <div className="sorter">
      <select
        onChange={(e) => {
          sortBy(e.target.value);
        }}
      >
        <option value="">Selecciona un criterio de ordenamiento</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Sorter;