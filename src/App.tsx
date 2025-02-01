// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PortalLayout from './components/PortalLayout';
import MainContent from './components/MainContent';
import { ThemeProvider } from './context/ThemeProvider';
import NinjaParty from './pages/NinjaParty';
import Travel from './pages/Travel';
import VerseCommander from './pages/VerseCommander';
import VerseCommanderDemo from './components/VerseCommanderDemo';
import StarClanLayout from './components/StarClanLayout';
import StarClans from './pages/StarClans';
import StarClansLanding from './components/StarClansLanding';
import 'leaflet/dist/leaflet.css';

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
            <Route path="/versecommander" element={<VerseCommander />} />
            <Route path="/starclans" element={<StarClans />} />
          </Route>

          {/* Alternative layout routes */}
          <Route element={<VerseCommanderDemo />}>
            <Route path="/versecommanderdemo" element={<div />} />
          </Route>

          <Route element={<StarClanLayout />}>
            <Route path="/starclandemo" element={<StarClansLanding />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
