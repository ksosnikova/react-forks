import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchRepForks } from '../../store/forks/operations';
import { Container, Heading, SearchContainer, Input, SearchBtn } from './StyledSearch';

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
    <>
      <Container>
        <Heading>Let's check GitHub forks repos</Heading>
        <SearchContainer>
            <Input value={value} onChange={handleChange}></Input>
            <SearchBtn onClick={handleSearch}>Search</SearchBtn>
        </SearchContainer>
      </Container>
    </>
  )
};

export default Search;