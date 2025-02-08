// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PortalLayout from './components/PortalLayout';
import { ThemeProvider } from './context/ThemeProvider';
import NinjaParty from './pages/NinjaParty';
import Travel from './pages/Travel';
import VerseCommander from './pages/VerseCommander';
import VerseCommanderDemo from './components/VerseCommanderDemo';
import StarClanLayout from './components/StarClanLayout';
import StarClans from './pages/StarClans';
import HomeContent from './components/HomeContent';
import ConflictMockup from './components/StarClansLanding';

const App = () => {

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Main layout routes */}
          <Route element={<PortalLayout />}>
            <Route path="/" element={<HomeContent />} />
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
            <Route path="/starclandemo" element={<ConflictMockup />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
