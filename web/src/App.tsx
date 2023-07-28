import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';

function App() {

  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <LoginPage/>
          }
        />
        <Route
          path='/main'
          element={
            <MainPage/>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
