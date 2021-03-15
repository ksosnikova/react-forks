import { fetchForks, setLoader } from './actions';
import axios from 'axios';

export const fetchRepForks = (owner, repository, page) => async dispatch => {
  try {
    dispatch(setLoader(true));
    const dataForks = await axios.get(`https://api.github.com/repos/${owner}/${repository}`);
    const forksCount = dataForks.data.forks_count;
    const { status, data } = await axios.get(`https://api.github.com/repos/${owner}/${repository}/forks?per_page=10&page=${page}`);
    const pagesTotal = Math.ceil(forksCount / 10);
    if (status === 200) {
      dispatch(fetchForks({ data, owner, repository, pagesTotal }));
    }
  } catch (error) {
    dispatch(setLoader(false));
    console.log(error);
  }
}