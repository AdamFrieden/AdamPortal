// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PortalLayout from './components/PortalLayout';
import { ThemeProvider } from './context/ThemeProvider';
import NinjaParty from './pages/NinjaParty';
import Travel from './pages/Travel';
import VerseCommander from './pages/VerseCommander';
import VerseCommanderDemo from './components/VerseCommanderDemo';
import StarClans from './pages/StarClans';
import HomeContent from './pages/HomeContent';
import StarClanLayout from './starclans/components/StarClanLayout';

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

          <Route path="/starclandemo" element={<StarClanLayout />} />
          <Route path="/starclansdemo" element={<StarClanLayout />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
