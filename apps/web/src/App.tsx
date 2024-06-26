import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import Navbar from './components/common/Navbar/Index';
import useGetCategories from './hooks/useGetCategories';
import { routes } from './routes';
import HomePage from './pages/Home';
import { useGetStoriesQuery } from './store/apiSlice/storiesApi';
import { storiesQuerySelector } from './store/slices/storiesQuery';
import useGetUserProfile from './hooks/useGetUserProfile';
import useAuthenticatedQueries from './hooks/useAuthenticatedQueries';
import BookmarkPage from './pages/Bookmark';
import useDeviceWidth from './hooks/useDeviceWidth';
import YourStoriesPage from './pages/YourStories';
import useLoader from './hooks/useLoader';
import { useEffect } from 'react';


function App() {

  const { isDesktop } = useDeviceWidth();

  const { queryString } = useSelector(storiesQuerySelector);

  useGetCategories();


  const { isFetching: getStoriesQueryLoading, isError } = useGetStoriesQuery(queryString, { refetchOnMountOrArgChange: true });
  useEffect(() => {
    if (isError) toast("Failed to get stories. Please try again later")
  }, [isError])


  // fetch profile info when user is authenticated
  useGetUserProfile();


  useAuthenticatedQueries();


  useLoader([getStoriesQueryLoading])


  return (
    <>
      <Navbar />

      <Routes>
        <Route path={routes.home} element={<HomePage />} />

        <Route path={routes.bookmark} element={<BookmarkPage />} />

        {
          isDesktop === false ?
            <Route path={routes.yourStories} element={<YourStoriesPage />} />
            :
            null
        }

      </Routes>


      <Toaster />
    </>
  )
}

export default App
