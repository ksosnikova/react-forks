import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectForks, selectLoader, selectTotalPages } from '../../store/forks/selectors';
import { fetchRepForks } from '../../store/forks/operations';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { GrNext, GrPrevious } from 'react-icons/gr';
import database from '../../firebase';

const Results = () => {

  const [fav, setFav] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();

  const totalPages = useSelector(selectTotalPages);
  const dataForks = useSelector(selectForks);
  const loading = useSelector(selectLoader);
  
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  let page = +params.get('page');
  const owner = params.get('owner');
  const repository = params.get('repository');

  useEffect(() => {
    if (page && repository) {
      dispatch(fetchRepForks(owner, repository, page));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const db = database.ref('favorites');
    db.on('value', async (snapshot) => {
      const dbFavorites = await snapshot.val();
      setFav([...Object.values(dbFavorites)]);
    })
  }, [])

  const handlePage = (inc) => {
    (inc === 1 ? page-- : page++);
    history.push(`/results/?page=${page}&owner=${owner}&repository=${repository}`);
    dispatch(fetchRepForks(owner, repository, page));
  }

  return (
    <div className='results'>
      { loading ? <div className='spinner-border'></div> : (
        <>
          { !dataForks.length > 0 ? 'No data for this search' :
            <>
              <h3 className='results__title'>search results</h3>
              <div className='results__container'>
                <table className='results__table table table-striped'>
                  <thead>
                    <tr>
                      <th>Repository</th>
                      <th>Owner</th>
                      <th>Star Count</th>
                      <th>Repository link</th>
                      <th>Favorite</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataForks.map(repository => (
                      <tr key={repository.id}>
                        <td>{repository.full_name}</td>
                        <td>{repository.owner.login}</td>
                        <td>{repository.stargazers_count}</td>
                        <td><a href={repository.clone_url}>{repository.clone_url}</a></td>
                        <td>{
                          fav?.find(favItemId => favItemId === repository.id) ?
                            <span className='favorite-icon' onClick={() => database.ref('favorites/' + repository.id).remove()}><FaStar /></span>
                            :
                            <span className='favorite-icon' onClick={() => database.ref('favorites/' + repository.id).set(repository.id)}><FaRegStar /></span>
                        }</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className='resultPagination'>
                <span className='pagination pagination__arrows' onClick={() => handlePage(1)}>{page === 1 ? null : <GrPrevious />}</span>
                <span className='pagination__page'>page {page} of {totalPages}</span>
                <span className='pagination pagination__arrows' onClick={() => handlePage()}>{page === totalPages ? null : <GrNext />}</span>
              </div>
            </>
          }
        </>
      )}
    </div>
  )
};

export default Results;