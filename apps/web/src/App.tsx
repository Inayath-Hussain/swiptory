import { Route, Routes } from 'react-router-dom'
import Navbar from './components/common/Navbar/Index'
// import { useGetCategoriesQuery } from './store/slices/categoryApi'
import useGetCategories from './hooks/useGetCategories'
import { routes } from './routes';
import HomePage from './pages/Home';


function App() {

  useGetCategories();

  return (
    <>
      <Navbar />

      <Routes>
        <Route path={routes.home} element={<HomePage />}>

        </Route>
      </Routes>

      <h1>Welcome</h1>
      <h1>To</h1>
      <h1>SwipTory</h1>
    </>
  )
}

export default App
