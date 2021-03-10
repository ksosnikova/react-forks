import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import {
  ResultsContainer,
  ResultsTable,
  ResultTableHeader,
  ResultTableCellHeader,
  ResultTableRow
} from './StyledResults';

const Results = ({ location }) => {

  const [curPage, setCurPage] = useState('');

  const { search } = queryString.parse(location);

  useEffect(() => {
    const params = new URLSearchParams(search);
    console.log('pam', params)
  }, [])

  const ResultTableTitle = ['Repo Name', 'Owner', 'Star Count', 'RepLink', 'Favorites']

  return (
    <ResultsContainer>
      <ResultsTable>
        <ResultTableHeader>
          <ResultTableRow>
            {ResultTableTitle.map((title) =>
              (<ResultTableCellHeader>{title}</ResultTableCellHeader>))
            }
          </ResultTableRow>
        </ResultTableHeader>
      </ResultsTable>
    </ResultsContainer>
  )
};

export default Results;