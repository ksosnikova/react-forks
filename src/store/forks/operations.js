import { fetchForks, setLoader } from './actions';
import axios from 'axios';

export const fetchRepForks = (owner, repository, page) => async dispatch => {
  try {
    dispatch(setLoader(true));
    const { status, data } = await axios.get(`https://api.github.com/repos/${owner}/${repository}/forks?per_page=10&page=${page}`);
    const dataForLastPage = await axios.get(`https://api.github.com/repos/${owner}/${repository}/forks?per_page=10&page=${++page}`);
    const lastPage = dataForLastPage.data.length > 0;
    if (status === 200) {
      dispatch(fetchForks({ data, owner, repository, lastPage }));
    }
  } catch (error) {
    dispatch(setLoader(false));
    console.log(error);
  }
}