import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchRepForks } from '../../store/forks/operations';

const Search = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  const [value, setValue] = useState('');
  const handleChange = e => setValue(e.target.value);

  const handleSearch = () => {
    dispatch(fetchRepForks(value));
    history.push(`/results/?page=1&repository=${value}`)
  }

  return (
    <div className='search-container'>
      <div className="search-container-inner">
        <h3 className='search-title'>Search for Repo</h3>
        <div className='search-box'>
          <input value={value} onChange={handleChange} className="form-control" />
          <button className='btn btn-primary' onClick={handleSearch}>Search</button>
        </div>
      </div>
    </div>
  )
};

export default Search;