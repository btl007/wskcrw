import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound'; //404대응

import DagymGuide from './pages/dagymguide';
import Works from './pages/Works';

import Welcome from './pages/welcome';

function App() {
  return (
    <Router>
      
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dagymguide" element={<DagymGuide />} />
          <Route path="/works" element={<Works />} />
          <Route path="/welcome" element={<Welcome />} />
          
          

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;