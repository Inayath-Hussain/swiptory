import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import Navbar from './components/common/Navbar/Index';
import useGetCategories from './hooks/useGetCategories';
import { routes } from './routes';
import HomePage from './pages/Home';
import { useGetStoriesQuery } from './store/apiSlice/storiesApi';
import { storiesQuerySelector } from './store/slices/storiesQuery';
import { authTokenContext } from './context/authTokens';
import useGetUserProfile from './hooks/useGetUserProfile';
import useAuthenticatedQueries from './hooks/useAuthenticatedQueries';
import BookmarkPage from './pages/Bookmark';


function App() {

  const { isLoggedIn } = useContext(authTokenContext);
  const { queryString } = useSelector(storiesQuerySelector);

  useGetCategories();
  useGetStoriesQuery(queryString, { refetchOnMountOrArgChange: true });


  // fetch profile info when user is authenticated
  useGetUserProfile();


  useAuthenticatedQueries();



  return (
    <>
      <Navbar />

      <Routes>
        <Route path={routes.home} element={<HomePage />}>

        </Route>

        <Route path={routes.bookmark} element={<BookmarkPage />} />

      </Routes>
    </>
  )
}

export default App
