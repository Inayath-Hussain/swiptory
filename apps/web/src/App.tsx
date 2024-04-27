import { Route, Routes } from 'react-router-dom'
import Navbar from './components/common/Navbar/Index'
// import { useGetCategoriesQuery } from './store/slices/categoryApi'
import useGetCategories from './hooks/useGetCategories'
import { routes } from './routes';
import HomePage from './pages/Home';
import { useGetStoriesQuery } from './store/slices/storiesApi';
import { useDispatch, useSelector } from 'react-redux';
import { storiesQuerySelector } from './store/slices/storiesQuery';
import { useContext, useEffect } from 'react';
import { getUserProfileService } from './services/user/profile';
import { ApiError, CanceledError, UnauthorizedError } from './services/errors';
import { authTokenContext } from './context/authTokens';
import { updateUserProfile } from './store/slices/userProfile';


function App() {

  const { logout, isLoggedIn } = useContext(authTokenContext);
  const dispatch = useDispatch();

  const { queryString } = useSelector(storiesQuerySelector);

  useGetCategories();
  useGetStoriesQuery(queryString, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    const call = async () => {
      const result = await getUserProfileService()

      switch (true) {
        case (result instanceof CanceledError):
          return

        case (result instanceof UnauthorizedError):
          logout();
          // please login again toast here
          return

        case (result instanceof ApiError):
          // failed to get your profile. Please try again
          return

        default:
          dispatch(updateUserProfile(result))
      }
    }



    if (isLoggedIn) call();

  }, [isLoggedIn])

  return (
    <>
      <Navbar />

      <Routes>
        <Route path={routes.home} element={<HomePage />}>

        </Route>
      </Routes>
    </>
  )
}

export default App
