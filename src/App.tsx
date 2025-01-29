// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PortalLayout from './components/PortalLayout';
import AlternativeLayout from './components/AlternativeLayout';
import MainContent from './components/MainContent';
import { ThemeProvider } from './context/ThemeProvider';
import NinjaParty from './pages/NinjaParty';
import Travel from './pages/Travel';

const App = () => {

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Main layout routes */}
          <Route element={<PortalLayout />}>
            <Route path="/" element={<MainContent />} />
            <Route path="/travel" element={<Travel />} />
            <Route path="/ninjaparty" element={<NinjaParty />} />
          </Route>

          {/* Alternative layout routes */}
          <Route element={<AlternativeLayout />}>
            <Route path="/special" element={<Travel />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
