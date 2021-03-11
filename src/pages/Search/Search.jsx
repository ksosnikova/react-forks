import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchRepForks } from '../../store/forks/operations';
import { Button, Input, Typography, Box } from '@material-ui/core';

const Search = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  const [value, setValue] = useState('');
  const handleChange = e => setValue(e.target.value);

  const handleSearch = () => {
    dispatch(fetchRepForks(value));
    history.push('/results')
  }

  return (
    <Box display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      height={600}>
      <Typography variant='h3'>Let's check GitHub forks repos</Typography>
      <Box m="auto">
        <Input value={value} onChange={handleChange}></Input>
        <Button onClick={handleSearch} variant="contained" color="primary"> Search</Button>
      </Box>
    </Box>
  )
};

export default Search;