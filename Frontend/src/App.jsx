import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import Home from './pages/Home';
import Events from './pages/Events';
import MyEvents from './pages/MyEvents';
import Account from './pages/Account';
import Footer from './components/Footer';

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/events' element={<Events />} />
          <Route path='/my-events' element={<MyEvents />} />
          <Route path='/account' element={<Account />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App;
