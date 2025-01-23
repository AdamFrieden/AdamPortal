// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PortalLayout from './components/PortalLayout';
import AlternativeLayout from './components/AlternativeLayout';
import MainContent from './components/MainContent';
import About from './pages/About';
import Contact from './pages/Contact';
import { ThemeProvider } from './context/ThemeProvider';

const App = () => {

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Main layout routes */}
          <Route element={<PortalLayout />}>
            <Route path="/" element={<MainContent />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* Alternative layout routes */}
          <Route element={<AlternativeLayout />}>
            <Route path="/special" element={<Contact />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
