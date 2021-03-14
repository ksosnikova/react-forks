import { fetchForks, setLoader } from './actions';
import axios from 'axios';

export const fetchRepForks = (linkToGitRep, page) => async dispatch => {
  try {
    dispatch(setLoader(true));
    const gitUser = linkToGitRep.split('/')[0];
    const gitRepo = linkToGitRep.split('/')[1];
    const dataForks = await axios.get(`https://api.github.com/search/repositories?q=user%3A${gitUser}+repo%3A${gitRepo}+${gitRepo}`);
    const forksCount = dataForks.data.items[0].forks_count;
    const { status, data } = await axios.get(`https://api.github.com/repos/${linkToGitRep}/forks?per_page=10&page=${page}`);
    const pagesTotal = Math.ceil(forksCount / 10);
    if (status === 200) {
      dispatch(fetchForks({ data, linkToGitRep, pagesTotal }));
    }
  } catch (error) {
    dispatch(setLoader(false));
    console.log(error);
  }
}