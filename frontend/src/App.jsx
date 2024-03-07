import './App.css'
import Menu from './pages/Menu';
import LogIn from "./pages/LogIn.jsx";
import Kiosk from "./pages/Kiosk.jsx";

import { BrowserRouter ,  Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/" element={<Kiosk />} />
            <Route path="/" element={<LogIn />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
