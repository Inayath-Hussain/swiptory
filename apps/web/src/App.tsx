import { Route, Routes } from 'react-router-dom'
import Navbar from './components/common/Navbar/Index'
// import { useGetCategoriesQuery } from './store/slices/categoryApi'
import useGetCategories from './hooks/useGetCategories'
import { routes } from './routes';
import HomePage from './pages/Home';
import { useGetStoriesQuery } from './store/slices/storiesApi';
import { useSelector } from 'react-redux';
import { storiesQuerySelector } from './store/slices/storiesQuery';


function App() {

  const { queryString } = useSelector(storiesQuerySelector);

  useGetCategories();
  useGetStoriesQuery(queryString, { refetchOnMountOrArgChange: true });

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
