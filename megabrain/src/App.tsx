import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Sobre } from './pages/Sobre';
import { CriarQuiz } from './pages/CriarQuiz';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/criar" element={<CriarQuiz />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;