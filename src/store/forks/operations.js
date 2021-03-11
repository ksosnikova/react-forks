import { fetchForks, setLoader } from './actions';
import axios from 'axios';

export const fetchRepForks = (linkToGitRep) => async dispatch => {
  try {
    dispatch(setLoader());
    const { status, data } = await axios.get(`https://api.github.com/repos/${linkToGitRep}/forks`);
    if (status === 200) {
      dispatch(fetchForks(data));
    }
  } catch (error) {

  }
}