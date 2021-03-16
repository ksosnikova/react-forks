import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectForks, selectLoader, selectLastPage } from '../../store/forks/selectors';
import { fetchRepForks } from '../../store/forks/operations';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { GrNext, GrPrevious } from 'react-icons/gr';
import database from '../../firebase';

const Results = () => {

  const [fav, setFav] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  
  const dataForks = useSelector(selectForks);
  const loading = useSelector(selectLoader);
  const lastPage = useSelector(selectLastPage);

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  let page = +params.get('page');
  const owner = params.get('owner');
  const repository = params.get('repository');

  useEffect(() => {
    if (page && repository && owner) {
      dispatch(fetchRepForks(owner, repository, page));
    }
  }, [ dispatch, owner, repository, page]);

  useEffect(() => {
    const db = database.ref('favorites');
    db.on('value', async (snapshot) => {
      const dbFavorites = await snapshot.val();
      setFav([...Object.values(dbFavorites)]);
    })
  }, [])

  const handlePage = (inc) => {
    history.push(`/results/?page=${page=page+inc}&owner=${owner}&repository=${repository}`);
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
                { !(page === 1) && <span className='pagination pagination__arrows' onClick={() => handlePage(-1)}><GrPrevious /></span>}
                <span className='pagination__page'>page {page} </span>
                {!lastPage && <span className='pagination pagination__arrows' onClick={() => handlePage(1)}><GrNext /></span>}
              </div>
            </>
          }
        </>
      )}
    </div>
  )
};

export default Results;