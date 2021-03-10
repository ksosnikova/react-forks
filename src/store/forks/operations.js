import { fetchForks } from './actions';
import axios from 'axios';

export const fetchRepForks = (linkToGitRep) => async dispatch => {
  try {
    const { status, data } = await axios.get(`https://api.github.com/repos/${linkToGitRep}/forks`);
    if (status === 200) {
      console.log(data)
  
      dispatch(fetchForks(data));
    }
  } catch (error) {

  }
}