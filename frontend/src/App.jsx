import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.jsx';
import AuthPage from './pages/AuthPage/AuthPage.jsx';
// import Account from './pages/Account/Account.jsx';
import Footer from './pages/Footer/Footer.jsx';
// import Signup from './pages/SignUp.jsx';
import Login from './pages/Login.jsx';
import Profile from './pages/Account/Profile.jsx';
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        {/* <Route path='/SignUp' element={<Signup />} /> */}
        <Route path='/Login' element={<Login />} />
        <Route path='/auth' element={<AuthPage />} />
        {/* <Route path='/account' element={<Account />} /> */}
        <Route path='/profile' element={<Profile />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

