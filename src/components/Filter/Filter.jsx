import React from 'react';

const Filter = ({ filter, onFilterChange }) => {
  return (
    <div>
      <h3>Find contacts by name</h3>
      <input
        type="text"
        name="filter"
        placeholder="To find"
        value={filter}
        onChange={onFilterChange}
      />
    </div>
  );
};

export default Filter;
