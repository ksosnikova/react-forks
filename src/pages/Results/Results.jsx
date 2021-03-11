import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectForks, selectLoader } from '../../store/forks/selectors';
import { CircularProgress, Box } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { fetchRepForks } from '../../store/forks/operations';
import { setFavorites } from '../../store/favorites/actions';
import { selectFavorites } from '../../store/favorites/selectors';

const Results = () => {

  const [page, setPage] = useState(0);

  const dispatch = useDispatch();
  const dataForks = useSelector(selectForks);
  const loading = useSelector(selectLoader);
  const favorites = useSelector(selectFavorites);

  const { search } = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(search);
    const page = params.get('page');
    const repository = params.get('repository');
    if (page && repository && !dataForks.length) {
      setPage(+page);
      dispatch(fetchRepForks(repository));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'repoName', headerName: 'Repo Name', width: 170 },
    { field: 'owner', headerName: 'Owner', width: 130 },
    { field: 'starCount', headerName: 'Star Count', width: 50, },
    { field: 'clone', headerName: 'RepLink', width: 350 },
  ];

  const rows = dataForks.reduce(
    (data, { id, full_name, stargazers_count, clone_url, owner: { login } }, index) =>
      [...data, {
        id: index + 1,
        repoName: full_name,
        owner: login,
        starCount: stargazers_count,
        clone: clone_url,
      }], []);

  const indexToID = (arrayIndex) => {
    return dataForks.length ? arrayIndex.map(index => dataForks[index - 1]?.id) : [];
  };

  const idToIndex = (arrayIds) => {
    return arrayIds.map(id => dataForks.findIndex(fork => fork.id === id) + 1);
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      height='100vh'>
      {loading ? <CircularProgress /> :
        <div style={{ height: '95%', width: '100%' }}>
          <DataGrid
            checkboxSelection
            page={page}
            onPageChange={(params) => { setPage(params.page) }}
            pageSize={10}
            pagination
            rows={rows}
            columns={columns}
            onSelectionModelChange={(newFavorite) => {
              const favIds = indexToID(newFavorite.selectionModel);
              const filtered = favIds.filter(Boolean);
              if (filtered.length) dispatch(setFavorites(filtered));
            }
            }
            selectionModel={idToIndex(favorites)}
          />
        </div>}
    </Box>
  )
};

export default Results;