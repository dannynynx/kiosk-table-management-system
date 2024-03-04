import './App.css'
import Menu from './pages/Menu';
import { BrowserRouter ,  Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Menu />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
